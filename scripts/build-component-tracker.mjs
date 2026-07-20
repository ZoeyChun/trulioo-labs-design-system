#!/usr/bin/env node
/**
 * Build component tracker JSON from data/component-tracker.yaml + repo scans.
 *
 * Run: node scripts/build-component-tracker.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseTrackerYaml } from "./lib/tracker-yaml.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const YAML_IN = path.join(ROOT, "data/component-tracker.yaml");
const JSON_OUT = path.join(ROOT, "pages/preview/react/src/data/component-tracker.json");
const COMPONENTS = path.join(ROOT, "Components");

const NESTED_SKIP = new Set([
  "tabs/tab-item/tab-item.css",
  "side-nav/nav-item/nav-item.css",
  "side-nav/nav-list/nav-list.css",
  "data-table/sort-button/sort-button.css",
]);

const SECONDARY_ENTRIES = new Set(["select/combobox.css"]);

const SCAN_TARGETS = {
  preview: [
    path.join(ROOT, "pages/preview/index.html"),
    path.join(ROOT, "pages/preview/react/src/data/sections.ts"),
  ],
  bv: globFiles(path.join(ROOT, "pages/bank-verification"), [".html", ".js"]),
  dv: globFiles(path.join(ROOT, "pages/document-verification"), [".html", ".js", ".ts"]),
};

function globFiles(dir, extensions) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      files.push(...globFiles(full, extensions));
      continue;
    }
    if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

function discoverComponentFolders() {
  const folders = new Set();

  function walk(dir, rel = "") {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        if (relPath === "_shared") continue;
        walk(path.join(dir, entry.name), relPath);
        continue;
      }

      if (!entry.name.endsWith(".css")) continue;
      if (NESTED_SKIP.has(relPath)) continue;
      if (relPath.includes("/_shared/")) continue;

      const folder = path.dirname(relPath);
      const base = entry.name.replace(/\.css$/, "");
      const folderName = path.basename(folder === "." ? base : folder);
      const isPrimary = base === folderName || SECONDARY_ENTRIES.has(relPath);
      if (!isPrimary) continue;

      folders.add(folder === "." ? base : folder.split("/")[0]);
    }
  }

  walk(COMPONENTS);
  return [...folders].sort();
}

function cssFileExists(cssFile) {
  if (!cssFile) return false;
  return fs.existsSync(path.join(COMPONENTS, cssFile));
}

function computeCssStatus(component, listedIds) {
  const { cssFile, figmaStatus } = component;
  const hasFile = cssFileExists(cssFile);

  if (figmaStatus === "N/A" || component.name === "FontAwesome Icon") {
    return "N/A";
  }

  if (!cssFile) {
    if (figmaStatus === "Partial") return "Partial";
    if (figmaStatus === "Done") return "Not Started";
    return "Not Started";
  }

  if (hasFile) return "Done";
  if (figmaStatus === "Partial") return "Partial";
  return "Missing";
}

function collectUsageCorpus() {
  const corpus = { preview: "", bv: "", dv: "" };

  for (const file of SCAN_TARGETS.preview) {
    if (fs.existsSync(file)) corpus.preview += fs.readFileSync(file, "utf8") + "\n";
  }
  for (const file of SCAN_TARGETS.bv) {
    corpus.bv += fs.readFileSync(file, "utf8") + "\n";
  }
  for (const file of SCAN_TARGETS.dv) {
    corpus.dv += fs.readFileSync(file, "utf8") + "\n";
  }

  return corpus;
}

function isPrefixUsed(prefix, text) {
  if (!prefix) return false;
  if (prefix.startsWith("tds-") || prefix.startsWith("score-")) {
    const pattern = new RegExp(`\\b${escapeRegExp(prefix)}(?:--|__|[\\s"'\\])])`);
    return pattern.test(text);
  }
  return text.includes(prefix);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildSummary(components) {
  const cssDone = components.filter((c) => c.cssStatus === "Done").length;
  const cssPartial = components.filter((c) => c.cssStatus === "Partial").length;
  const cssNotStarted = components.filter(
    (c) => c.cssStatus === "Not Started" || c.cssStatus === "Missing"
  ).length;
  const figmaDone = components.filter((c) => c.figmaStatus === "Done").length;
  const figmaEligible = components.filter((c) => c.figmaStatus !== "N/A").length;

  const builtForAdoption = components.filter(
    (c) => c.cssStatus === "Done" && (c.classPrefixes?.length ?? 0) > 0
  );

  const previewUsed = builtForAdoption.filter((c) => c.usedInPreview).length;
  const bvUsed = builtForAdoption.filter((c) => c.usedInBV).length;
  const dvUsed = builtForAdoption.filter((c) => c.usedInDV).length;
  const adoptionBase = builtForAdoption.length || 1;

  return {
    totalComponents: components.length,
    cssDone,
    cssPartial,
    cssNotStarted,
    figmaDone,
    figmaEligible,
    figmaDonePercent: figmaEligible ? Math.round((figmaDone / figmaEligible) * 100) : 0,
    adoption: {
      preview: {
        used: previewUsed,
        total: builtForAdoption.length,
        percent: Math.round((previewUsed / adoptionBase) * 100),
      },
      bv: {
        used: bvUsed,
        total: builtForAdoption.length,
        percent: Math.round((bvUsed / adoptionBase) * 100),
      },
      dv: {
        used: dvUsed,
        total: builtForAdoption.length,
        percent: Math.round((dvUsed / adoptionBase) * 100),
      },
    },
  };
}

function main() {
  if (!fs.existsSync(YAML_IN)) {
    console.error(`Missing ${YAML_IN}. Run: node scripts/migrate-tracker-xlsx.mjs`);
    process.exit(1);
  }

  const manifest = parseTrackerYaml(fs.readFileSync(YAML_IN, "utf8"));
  const corpus = collectUsageCorpus();
  const listedIds = new Set(manifest.components.map((c) => c.id));
  const prefixOwners = new Map();
  const errors = [];
  const warnings = [];

  for (const component of manifest.components) {
    for (const prefix of component.classPrefixes ?? []) {
      if (!prefix) continue;
      if (prefixOwners.has(prefix)) {
        errors.push(
          `Duplicate class prefix "${prefix}" on ${component.id} and ${prefixOwners.get(prefix)}`
        );
      } else {
        prefixOwners.set(prefix, component.id);
      }
    }
  }

  const components = manifest.components.map((component) => {
    const cssStatus = computeCssStatus(component, listedIds);
    const prefixes = component.classPrefixes ?? [];

    return {
      ...component,
      classPrefixes: prefixes,
      cssStatus,
      usedInPreview: prefixes.some((prefix) => isPrefixUsed(prefix, corpus.preview)),
      usedInBV: prefixes.some((prefix) => isPrefixUsed(prefix, corpus.bv)),
      usedInDV: prefixes.some((prefix) => isPrefixUsed(prefix, corpus.dv)),
    };
  });

  for (const component of components) {
    if (component.cssFile && !cssFileExists(component.cssFile) && component.cssStatus !== "N/A") {
      warnings.push(`Missing CSS file for ${component.name}: ${component.cssFile}`);
    }
  }

  const discoveredFolders = discoverComponentFolders();
  for (const folder of discoveredFolders) {
    const listed = manifest.components.some(
      (component) =>
        component.cssFile?.startsWith(`${folder}/`) ||
        component.cssFile?.includes(`/${folder}/`) ||
        component.id === folder
    );
    if (!listed) {
      warnings.push(`Unlisted component folder in Components/: ${folder}`);
    }
  }

  if (errors.length) {
    console.error("Component tracker validation failed:");
    for (const error of errors) console.error(`  ERROR: ${error}`);
    process.exit(1);
  }

  const payload = {
    lastBuiltAt: new Date().toISOString(),
    summary: buildSummary(components),
    components,
    planned: manifest.planned ?? [],
    warnings,
  };

  fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  fs.writeFileSync(JSON_OUT, `${JSON.stringify(payload, null, 2)}\n`);

  console.log(`Wrote ${JSON_OUT}`);
  console.log(
    `  CSS Done: ${payload.summary.cssDone}/${payload.summary.totalComponents} · BV adoption: ${payload.summary.adoption.bv.percent}% · DV adoption: ${payload.summary.adoption.dv.percent}%`
  );

  if (warnings.length) {
    console.warn(`  ${warnings.length} warning(s):`);
    for (const warning of warnings) {
      console.warn(`    - ${warning}`);
    }
  }
}

main();
