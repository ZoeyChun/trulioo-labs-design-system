#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let passed = 0;
let failed = 0;

function assert(label, condition, detail) {
  if (condition) {
    console.log(`  PASS  ${label}`);
    passed++;
  } else {
    console.log(`  FAIL  ${label}${detail ? " — " + detail : ""}`);
    failed++;
  }
}

async function run() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["src/server.js"],
  });

  const client = new Client({ name: "tds-smoke-test", version: "1.0.0" });
  await client.connect(transport);

  // ── Resources ───────────────────────────────────────────
  console.log("\nResources:");

  const resources = await client.listResources();
  assert("list resources → 3", resources.resources.length === 3);

  const systemPrompt = await client.readResource({ uri: "tds://system-prompt" });
  const spText = systemPrompt.contents[0].text;
  assert("system-prompt has token rules", spText.includes("semantic"));
  assert("system-prompt has component patterns", spText.includes("tds-"));

  const catalog = await client.readResource({ uri: "tds://components/catalog" });
  const catText = catalog.contents[0].text;
  assert("catalog has components", catText.includes("Button"));
  assert("catalog is markdown", catText.startsWith("#"));

  const tokenRef = await client.readResource({ uri: "tds://tokens/reference" });
  const tokText = tokenRef.contents[0].text;
  assert("token reference has semantic tokens", tokText.includes("--text-default"));

  // ── Tools ───────────────────────────────────────────────
  console.log("\nTools:");

  const tools = await client.listTools();
  assert("list tools → 3", tools.tools.length === 3);

  // get_component — valid
  const btnResult = await client.callTool({
    name: "get_component",
    arguments: { component_id: "button" },
  });
  const btnData = JSON.parse(btnResult.content[0].text);
  assert("get_component button → has component", !!btnData.component);
  assert("get_component button → has examples", btnData.examples.length > 0);
  assert("get_component button → examples have html", !!btnData.examples[0].html);
  assert("get_component button → has guidelines", btnData.guidelines.length > 0);

  // get_component — text-input
  const tiResult = await client.callTool({
    name: "get_component",
    arguments: { component_id: "text-input" },
  });
  const tiData = JSON.parse(tiResult.content[0].text);
  assert("get_component text-input → found", !!tiData.component);

  // get_component — invalid
  const badResult = await client.callTool({
    name: "get_component",
    arguments: { component_id: "nonexistent-widget" },
  });
  const badData = JSON.parse(badResult.content[0].text);
  assert("get_component invalid → error", !!badData.error);
  assert("get_component invalid → lists available", badData.available.length > 0);

  // search — dropdown → Select
  const dropdownResult = await client.callTool({
    name: "search_components",
    arguments: { query: "dropdown" },
  });
  const dropdownData = JSON.parse(dropdownResult.content[0].text);
  assert(
    "search 'dropdown' → finds Select",
    dropdownData.results.some((r) => r.id === "select")
  );

  // search — toggle → Switch
  const toggleResult = await client.callTool({
    name: "search_components",
    arguments: { query: "toggle" },
  });
  const toggleData = JSON.parse(toggleResult.content[0].text);
  assert(
    "search 'toggle' → finds Switch",
    toggleData.results.some((r) => r.id === "switch")
  );

  // search — table → DataTable
  const tableResult = await client.callTool({
    name: "search_components",
    arguments: { query: "table" },
  });
  const tableData = JSON.parse(tableResult.content[0].text);
  assert(
    "search 'table' → finds DataTable",
    tableData.results.some((r) => r.id === "data-table")
  );

  // get_tokens — spacing
  const spacingResult = await client.callTool({
    name: "get_tokens",
    arguments: { category: "spacing" },
  });
  const spacingData = JSON.parse(spacingResult.content[0].text);
  assert("get_tokens spacing → has semantic tokens", spacingData.semanticCount > 0);
  assert("get_tokens spacing → has rule", !!spacingData.rule);

  // get_tokens — colors
  const colorsResult = await client.callTool({
    name: "get_tokens",
    arguments: { category: "colors" },
  });
  const colorsData = JSON.parse(colorsResult.content[0].text);
  assert("get_tokens colors → has tokens", colorsData.semanticCount > 0);

  // get_tokens — all
  const allResult = await client.callTool({
    name: "get_tokens",
    arguments: { category: "all" },
  });
  const allData = JSON.parse(allResult.content[0].text);
  assert(
    "get_tokens all → includes both tiers",
    allData.semanticCount > 0 && allData.coreCount > 0
  );

  // ── New v1.1 features ────────────────────────────────────
  console.log("\nv1.1 Fixes:");

  // system prompt has light theme rule
  assert(
    "system-prompt enforces light theme",
    spText.includes("NO dark") || spText.includes("Light theme only")
  );

  // system prompt has self-check
  assert(
    "system-prompt has self-check",
    spText.includes("Self-check") || spText.includes("verify ALL")
  );

  // system prompt has actual token values
  assert(
    "system-prompt includes token values",
    spText.includes("--text-default") && spText.includes("#172d2d")
  );

  // get_component returns CSS
  assert(
    "get_component button → has CSS",
    !!btnData.css && btnData.css.includes("tds-btn")
  );
  assert(
    "get_component button → has cssInstruction",
    !!btnData.cssInstruction && btnData.cssInstruction.includes("<style>")
  );

  // system prompt has card pattern
  assert(
    "system-prompt has card composition pattern",
    spText.includes("tds-custom-card") || spText.includes("Card composition")
  );

  // ── Prompts ─────────────────────────────────────────────
  console.log("\nPrompts:");
  const prompts = await client.listPrompts();
  assert("list prompts → 1", prompts.prompts.length === 1);
  assert("prompt is build_ui", prompts.prompts[0].name === "build_ui");

  // ── Summary ─────────────────────────────────────────────
  console.log(`\n${passed} passed, ${failed} failed out of ${passed + failed}\n`);

  await client.close();
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error("Test runner crashed:", err);
  process.exit(1);
});
