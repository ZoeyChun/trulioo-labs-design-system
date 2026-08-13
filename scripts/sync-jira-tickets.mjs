#!/usr/bin/env node
/**
 * Fetches TDS component tickets from JIRA (sub-tasks of UT-134)
 * and writes them to Documentation/src/data/jira-tickets.json.
 *
 * Requires env vars:
 *   JIRA_EMAIL      - Atlassian account email
 *   JIRA_API_TOKEN  - API token from https://id.atlassian.com/manage-profile/security/api-tokens
 *
 * Skips gracefully when credentials are missing so builds never break.
 */

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../Documentation/src/data/jira-tickets.json");

const JIRA_SITE = "trulioo.atlassian.net";
const PARENT_TICKET = "UT-134";
const BASE_URL = `https://${JIRA_SITE}/browse`;
const API_BASE = `https://${JIRA_SITE}/rest/api/3`;

const email = process.env.JIRA_EMAIL;
const token = process.env.JIRA_API_TOKEN;

if (!email || !token) {
  if (existsSync(OUT_PATH)) {
    console.log("[sync-jira] No JIRA credentials -- using cached jira-tickets.json");
  } else {
    console.warn("[sync-jira] No JIRA credentials and no cached data -- skipping");
  }
  process.exit(0);
}

const auth = Buffer.from(`${email}:${token}`).toString("base64");

async function fetchTickets() {
  const jql = `parent = ${PARENT_TICKET} ORDER BY key ASC`;
  const url = `${API_BASE}/search/jql`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jql,
      fields: ["summary", "status", "priority", "assignee"],
      maxResults: 100,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`JIRA API ${res.status}: ${body.substring(0, 200)}`);
  }

  const data = await res.json();

  const tickets = data.issues.map((issue) => ({
    key: issue.key,
    name: (issue.fields.summary || "").replace(/^TDS Component:\s*/i, ""),
    status: issue.fields.status?.name || "Unknown",
    priority: issue.fields.priority?.name || "Medium",
    assignee: issue.fields.assignee?.displayName || null,
  }));

  return tickets;
}

try {
  console.log("[sync-jira] Fetching tickets from JIRA...");
  const tickets = await fetchTickets();

  const output = {
    parentTicket: PARENT_TICKET,
    baseUrl: BASE_URL,
    lastSyncedAt: new Date().toISOString(),
    tickets,
  };

  writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + "\n");
  console.log(`[sync-jira] Wrote ${tickets.length} tickets to jira-tickets.json`);
} catch (err) {
  console.error(`[sync-jira] Failed to sync: ${err.message}`);
  if (existsSync(OUT_PATH)) {
    console.log("[sync-jira] Keeping cached jira-tickets.json");
  }
  process.exit(0);
}
