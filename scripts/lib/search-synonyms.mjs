/**
 * Search synonym loading and query expansion for docs preview.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_YAML = path.resolve(__dirname, "../../data/search-synonyms.yaml");

function parseScalar(raw) {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseListBlock(lines, startIndex, baseIndent) {
  const items = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i += 1;
      continue;
    }
    if (!line.startsWith(`${baseIndent}-`)) break;

    const inline = line.slice(baseIndent.length + 2).trim();
    if (inline.startsWith("[") && inline.endsWith("]")) {
      const ring = inline
        .slice(1, -1)
        .split(",")
        .map((part) => parseScalar(part.trim()))
        .filter(Boolean);
      items.push(ring);
    } else {
      items.push(parseScalar(inline));
    }
    i += 1;
  }

  return { items, nextIndex: i };
}

function parseComponentAliases(lines, startIndex) {
  const components = {};
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i += 1;
      continue;
    }
    if (!line.startsWith("  ") || line.startsWith("    ")) break;

    const match = line.trim().match(/^([a-z0-9-]+):\s*$/);
    if (!match) break;

    const componentId = match[1];
    i += 1;
    const aliases = [];

    while (i < lines.length) {
      const aliasLine = lines[i];
      if (!aliasLine.startsWith("    - ")) break;
      aliases.push(parseScalar(aliasLine.slice(6)));
      i += 1;
    }

    components[componentId] = aliases;
  }

  return { components, nextIndex: i };
}

export function parseSearchSynonymsYaml(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const result = { components: {}, rings: [] };
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("components:")) {
      const parsed = parseComponentAliases(lines, i + 1);
      result.components = parsed.components;
      i = parsed.nextIndex;
      continue;
    }
    if (line.startsWith("rings:")) {
      const parsed = parseListBlock(lines, i + 1, "  ");
      result.rings = parsed.items;
      i = parsed.nextIndex;
      continue;
    }
    i += 1;
  }

  return result;
}

export function normalizeSearchTerm(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[_/]+/g, " ")
    .replace(/\s+/g, " ");
}

function addToIndex(index, term, expansions) {
  const key = normalizeSearchTerm(term);
  if (!key) return;

  if (!index.has(key)) index.set(key, new Set());
  for (const expansion of expansions) {
    const normalized = normalizeSearchTerm(expansion);
    if (normalized) index.get(key).add(normalized);
  }
}

export function buildTermIndex(manifest) {
  const index = new Map();

  for (const [componentId, aliases] of Object.entries(manifest.components ?? {})) {
    const humanName = componentId.replace(/-/g, " ");
    const allTerms = [componentId, humanName, ...aliases];
    for (const term of allTerms) {
      addToIndex(index, term, allTerms);
    }
  }

  for (const ring of manifest.rings ?? []) {
    const terms = ring.filter(Boolean);
    for (const term of terms) {
      addToIndex(index, term, terms);
    }
  }

  return Object.fromEntries(
    [...index.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, values]) => [key, [...values].sort()])
  );
}

export function aliasesForComponent(manifest, componentId) {
  const aliases = manifest.components?.[componentId] ?? [];
  const humanName = componentId.replace(/-/g, " ");
  return [...new Set([humanName, ...aliases].map(normalizeSearchTerm))].filter(Boolean);
}

export function expandSearchQuery(query, termIndex) {
  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return [];

  const expanded = new Set([normalizedQuery]);
  const tokens = normalizedQuery.split(" ").filter(Boolean);

  for (const token of tokens) {
    expanded.add(token);
    const direct = termIndex[token];
    if (direct) direct.forEach((term) => expanded.add(term));

    for (const [key, values] of Object.entries(termIndex)) {
      if (key.includes(token) || token.includes(key)) {
        expanded.add(key);
        values.forEach((term) => expanded.add(term));
      }
    }
  }

  const fullPhraseMatches = Object.entries(termIndex).filter(
    ([key]) => normalizedQuery.includes(key) || key.includes(normalizedQuery)
  );
  for (const [key, values] of fullPhraseMatches) {
    expanded.add(key);
    values.forEach((term) => expanded.add(term));
  }

  return [...expanded].filter(Boolean);
}

export function loadSearchSynonyms(yamlPath = DEFAULT_YAML) {
  if (!fs.existsSync(yamlPath)) {
    return { components: {}, rings: [], termIndex: {} };
  }

  const manifest = parseSearchSynonymsYaml(fs.readFileSync(yamlPath, "utf8"));
  return {
    ...manifest,
    termIndex: buildTermIndex(manifest),
  };
}

export function writeSearchSynonymsJson(outPath, yamlPath = DEFAULT_YAML) {
  const data = loadSearchSynonyms(yamlPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(
    outPath,
    `${JSON.stringify(
      {
        components: data.components,
        rings: data.rings,
        termIndex: data.termIndex,
      },
      null,
      2
    )}\n`
  );
  return data;
}
