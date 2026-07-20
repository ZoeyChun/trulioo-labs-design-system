/**
 * Minimal YAML read/write for component-tracker.yaml (no external deps).
 */

function escapeYamlString(value) {
  if (value == null || value === "") return '""';
  const s = String(value);
  if (/[:#\n"'&*]|^\s|\s$/.test(s)) return JSON.stringify(s);
  return s;
}

function serializeList(key, items, fields) {
  const lines = [`${key}:`];
  for (const item of items) {
    lines.push("  -");
    for (const field of fields) {
      const value = item[field];
      if (value == null || value === "") continue;
      if (Array.isArray(value)) {
        lines.push(`    ${field}:`);
        for (const entry of value) {
          lines.push(`      - ${escapeYamlString(entry)}`);
        }
      } else {
        lines.push(`    ${field}: ${escapeYamlString(value)}`);
      }
    }
  }
  return lines.join("\n");
}

export function stringifyTrackerYaml({ components, planned }) {
  const componentFields = [
    "id",
    "name",
    "category",
    "figmaStatus",
    "figmaVariants",
    "cssFile",
    "classPrefixes",
    "subComponents",
    "figmaNodeId",
    "notes",
  ];
  const plannedFields = [
    "name",
    "category",
    "priority",
    "description",
    "dependsOn",
    "notes",
  ];

  return [
    "# Trulioo Design System component tracker (repo source of truth)",
    "# Edit this file, then run: node scripts/build-component-tracker.mjs",
    "",
    serializeList("components", components, componentFields),
    "",
    serializeList("planned", planned, plannedFields),
    "",
  ].join("\n");
}

function parseScalar(raw) {
  const trimmed = raw.trim();
  if (trimmed === "null" || trimmed === "~") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function parseBlock(lines, startIndex, itemIndent) {
  const items = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i += 1;
      continue;
    }
    if (!line.startsWith(itemIndent + "-")) break;

    const item = {};
    i += 1;

    while (i < lines.length) {
      const inner = lines[i];
      if (!inner.trim() || inner.trim().startsWith("#")) {
        i += 1;
        continue;
      }
      if (inner.startsWith(itemIndent + "-")) break;
      if (!inner.startsWith(itemIndent + "  ")) break;

      const content = inner.slice(itemIndent.length + 2);
      const listMatch = content.match(/^([A-Za-z0-9_]+):\s*$/);
      if (listMatch) {
        const key = listMatch[1];
        const list = [];
        i += 1;
        while (i < lines.length) {
          const listLine = lines[i];
          if (!listLine.startsWith(itemIndent + "    - ")) break;
          list.push(parseScalar(listLine.slice(itemIndent.length + 6)));
          i += 1;
        }
        item[key] = list;
        continue;
      }

      const kvMatch = content.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (!kvMatch) break;
      item[kvMatch[1]] = parseScalar(kvMatch[2]);
      i += 1;
    }

    items.push(item);
  }

  return { items, nextIndex: i };
}

export function parseTrackerYaml(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const result = { components: [], planned: [] };
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("components:")) {
      const parsed = parseBlock(lines, i + 1, "  ");
      result.components = parsed.items;
      i = parsed.nextIndex;
      continue;
    }
    if (line.startsWith("planned:")) {
      const parsed = parseBlock(lines, i + 1, "  ");
      result.planned = parsed.items;
      i = parsed.nextIndex;
      continue;
    }
    i += 1;
  }

  return result;
}
