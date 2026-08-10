#!/usr/bin/env node
/**
 * Build component tracker JSON from data/component-tracker.yaml + repo scans.
 *
 * DS consumption: every demo under pages/ is scanned for tds-* class usage.
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
const JSON_OUT = path.join(ROOT, "Documentation/src/data/component-tracker.json");
const COMPONENTS = path.join(ROOT, "Components");
const PAGES_ROOT = path.join(ROOT, "pages");

const NESTED_SKIP = new Set([
  "tabs/tab-item/tab-item.css",
  "side-nav/nav-item/nav-item.css",
  "side-nav/nav-list/nav-list.css",
  "data-table/sort-button/sort-button.css",
]);

const SECONDARY_ENTRIES = new Set(["select/combobox.css"]);

const SKIP_PAGE_DIRS = new Set(["_shared", "shared", "node_modules", "dist"]);
const PREVIEW_SOURCE_SKIP = new Set(["react-dist", "docs-dist", "react", "docs", "node_modules"]);
const SCAN_EXTENSIONS = [".html", ".js", ".ts", ".tsx", ".jsx"];

function globFiles(dir, extensions, excludeDirs = SKIP_PAGE_DIRS) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (excludeDirs.has(entry.name)) continue;
      files.push(...globFiles(full, extensions, excludeDirs));
      continue;
    }
    if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatPageLabel(name) {
  if (/[A-Z]/.test(name) && /\s/.test(name)) return name;
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function collectCorpusFromRoots(scanRoots, excludeDirs = SKIP_PAGE_DIRS) {
  let corpus = "";
  for (const root of scanRoots) {
    if (!fs.existsSync(root)) continue;
    const stat = fs.statSync(root);
    if (stat.isFile()) {
      corpus += `${fs.readFileSync(root, "utf8")}\n`;
      continue;
    }
    for (const file of globFiles(root, SCAN_EXTENSIONS, excludeDirs)) {
      corpus += `${fs.readFileSync(file, "utf8")}\n`;
    }
  }
  return corpus;
}

function discoverPageDemos() {
  const demos = [];

  for (const entry of fs.readdirSync(PAGES_ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (SKIP_PAGE_DIRS.has(entry.name)) continue;

    if (entry.name === "preview") {
      demos.push({
        id: "preview",
        label: "Component preview",
        path: "pages/preview",
        scanRoots: [
          path.join(PAGES_ROOT, "preview/index.html"),
          path.join(PAGES_ROOT, "preview/react/src"),
        ],
        excludeDirs: PREVIEW_SOURCE_SKIP,
      });
      continue;
    }

    if (entry.name === "Experiments") {
      const experimentsDir = path.join(PAGES_ROOT, "Experiments");
      for (const sub of fs.readdirSync(experimentsDir, { withFileTypes: true })) {
        if (!sub.isDirectory()) continue;
        if (SKIP_PAGE_DIRS.has(sub.name)) continue;
        demos.push({
          id: slugify(`experiments-${sub.name}`),
          label: `Experiments · ${formatPageLabel(sub.name)}`,
          path: `pages/Experiments/${sub.name}`,
          scanRoots: [path.join(experimentsDir, sub.name)],
        });
      }
      continue;
    }

    demos.push({
      id: slugify(entry.name),
      label: formatPageLabel(entry.name),
      path: `pages/${entry.name}`,
      scanRoots: [path.join(PAGES_ROOT, entry.name)],
    });
  }

  return demos.sort((a, b) => a.label.localeCompare(b.label));
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

function computeCssStatus(component) {
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

function buildPageAdoption(pageDemos, components) {
  const builtForAdoption = components.filter(
    (component) => component.cssStatus === "Done" && (component.classPrefixes?.length ?? 0) > 0
  );
  const adoptionBase = builtForAdoption.length || 1;

  return pageDemos.map((page) => {
    const used = builtForAdoption.filter((component) => component.usedInPages[page.id]).length;
    return {
      id: page.id,
      label: page.label,
      path: page.path,
      used,
      total: builtForAdoption.length,
      percent: Math.round((used / adoptionBase) * 100),
    };
  });
}

function buildSummary(components, pages) {
  const cssDone = components.filter((component) => component.cssStatus === "Done").length;
  const cssPartial = components.filter((component) => component.cssStatus === "Partial").length;
  const cssNotStarted = components.filter(
    (component) => component.cssStatus === "Not Started" || component.cssStatus === "Missing"
  ).length;
  const figmaDone = components.filter((component) => component.figmaStatus === "Done").length;
  const figmaEligible = components.filter((component) => component.figmaStatus !== "N/A").length;

  const builtForAdoption = components.filter(
    (component) => component.cssStatus === "Done" && (component.classPrefixes?.length ?? 0) > 0
  );
  const avgAdoptionPercent = pages.length
    ? Math.round(pages.reduce((sum, page) => sum + page.percent, 0) / pages.length)
    : 0;

  return {
    totalComponents: components.length,
    cssDone,
    cssPartial,
    cssNotStarted,
    figmaDone,
    figmaEligible,
    figmaDonePercent: figmaEligible ? Math.round((figmaDone / figmaEligible) * 100) : 0,
    demoPageCount: pages.length,
    avgAdoptionPercent,
    builtForAdoption: builtForAdoption.length,
  };
}

function main() {
  if (!fs.existsSync(YAML_IN)) {
    console.error(`Missing ${YAML_IN}. Run: node scripts/migrate-tracker-xlsx.mjs`);
    process.exit(1);
  }

  const manifest = parseTrackerYaml(fs.readFileSync(YAML_IN, "utf8"));
  const pageDemos = discoverPageDemos();
  const pageCorpora = pageDemos.map((page) => ({
    ...page,
    corpus: collectCorpusFromRoots(page.scanRoots, page.excludeDirs ?? SKIP_PAGE_DIRS),
  }));
  const listedIds = new Set(manifest.components.map((component) => component.id));
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
    const cssStatus = computeCssStatus(component);
    const prefixes = component.classPrefixes ?? [];
    const usedInPages = Object.fromEntries(
      pageCorpora.map((page) => [
        page.id,
        prefixes.some((prefix) => isPrefixUsed(prefix, page.corpus)),
      ])
    );

    return {
      ...component,
      classPrefixes: prefixes,
      cssStatus,
      usedInPages,
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

  const pages = buildPageAdoption(pageCorpora, components);
  const payload = {
    lastBuiltAt: new Date().toISOString(),
    summary: buildSummary(components, pages),
    pages,
    components,
    planned: manifest.planned ?? [],
    warnings,
  };

  fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  fs.writeFileSync(JSON_OUT, `${JSON.stringify(payload, null, 2)}\n`);

  console.log(`Wrote ${JSON_OUT}`);
  console.log(
    `  CSS Done: ${payload.summary.cssDone}/${payload.summary.totalComponents} · Demo pages: ${payload.summary.demoPageCount} · Avg adoption: ${payload.summary.avgAdoptionPercent}%`
  );

  if (warnings.length) {
    console.warn(`  ${warnings.length} warning(s):`);
    for (const warning of warnings) {
      console.warn(`    - ${warning}`);
    }
  }
}

main();
