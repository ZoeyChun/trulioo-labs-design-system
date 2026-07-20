#!/usr/bin/env node
/**
 * One-time migration: TDS-Component-Tracker.xlsx → data/component-tracker.yaml
 *
 * Run: node scripts/migrate-tracker-xlsx.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseTrackerYaml, stringifyTrackerYaml } from "./lib/tracker-yaml.mjs";
import {
  prefixesForComponent,
  toKebabId,
} from "./lib/component-prefixes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const XLSX = path.join(ROOT, "TDS-Component-Tracker.xlsx");
const YAML_OUT = path.join(ROOT, "data/component-tracker.yaml");
const COMPONENTS = path.join(ROOT, "Components");

const PY = path.join(__dirname, "read-tracker-xlsx.py");

function clean(value) {
  if (!value || value === "—" || value === "-") return "";
  return String(value).trim();
}

function normalizeCssFile(value) {
  const cleaned = clean(value);
  if (!cleaned) return "";
  return cleaned.replace(/^Components\//, "");
}

function uniqueId(baseId, used) {
  let id = baseId;
  let n = 2;
  while (used.has(id)) {
    id = `${baseId}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

function migrate() {
  if (!fs.existsSync(XLSX)) {
    console.error(`Missing ${XLSX}`);
    process.exit(1);
  }

  const raw = execSync(`python3 ${JSON.stringify(PY)} ${JSON.stringify(XLSX)}`, {
    encoding: "utf8",
  });
  const { built, planned } = JSON.parse(raw);
  const usedIds = new Set();

  const components = built.map((row) => {
    const name = row.Component;
    const cssFile = normalizeCssFile(row["CSS File"]);
    const baseId = cssFile
      ? cssFile
          .split("/")
          .filter((part) => part !== "_shared")
          .pop()
          ?.replace(/\.css$/, "") ?? toKebabId(name)
      : toKebabId(name);
    const id = uniqueId(baseId.replace(/\.css$/, ""), usedIds);

    return {
      id,
      name,
      category: clean(row.Category),
      figmaStatus: clean(row["Figma Status"]) || "Not Started",
      figmaVariants: clean(row["Figma Variants"]),
      cssFile,
      classPrefixes: prefixesForComponent(id, cssFile, COMPONENTS),
      subComponents: clean(row["Sub-components"]),
      figmaNodeId: clean(row["Figma Node ID"]),
      notes: clean(row.Notes),
    };
  });

  const plannedItems = planned.map((row) => ({
    name: clean(row.Component),
    category: clean(row.Category),
    priority: clean(row.Priority) || "Medium",
    description: clean(row.Description),
    dependsOn: clean(row["Depends On"]),
    notes: clean(row.Notes),
  }));

  const yaml = stringifyTrackerYaml({ components, planned: plannedItems });
  fs.mkdirSync(path.dirname(YAML_OUT), { recursive: true });
  fs.writeFileSync(YAML_OUT, yaml);

  const roundTrip = parseTrackerYaml(yaml);
  console.log(`Wrote ${YAML_OUT}`);
  console.log(`  ${roundTrip.components.length} components`);
  console.log(`  ${roundTrip.planned.length} planned items`);
}

migrate();
