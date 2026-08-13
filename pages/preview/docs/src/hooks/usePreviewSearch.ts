import { useMemo } from "react";
import Fuse from "fuse.js";
import searchIndex from "../data/search-index.json";
import synonymData from "../data/search-synonyms.json";
import { CONTENT_SECTION_LOCKED } from "../data/navigation";

export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  section: string;
  sectionId: string;
  pageId: string;
  path: string;
  category: string;
  keywords: string;
};

export type SearchResult = {
  item: SearchEntry;
  score?: number;
  matchedTerm?: string;
};

type SynonymBundle = {
  termIndex: Record<string, string[]>;
};

const SYNONYMS = synonymData as SynonymBundle;

let fuseInstance: Fuse<SearchEntry> | null = null;

function getFuse(): Fuse<SearchEntry> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(searchIndex as SearchEntry[], {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "keywords", weight: 0.35 },
        { name: "description", weight: 0.15 },
        { name: "category", weight: 0.07 },
        { name: "section", weight: 0.03 },
      ],
      threshold: 0.36,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

function normalizeSearchTerm(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[_/]+/g, " ")
    .replace(/\s+/g, " ");
}

function expandSearchTerms(query: string): string[] {
  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return [];

  const expanded = new Set<string>([normalizedQuery, query.trim()]);
  const tokens = normalizedQuery.split(" ").filter(Boolean);

  for (const token of tokens) {
    expanded.add(token);
    const direct = SYNONYMS.termIndex[token];
    if (direct) direct.forEach((term) => expanded.add(term));
  }

  for (const [key, values] of Object.entries(SYNONYMS.termIndex)) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      expanded.add(key);
      values.forEach((term) => expanded.add(term));
    }
  }

  for (const token of tokens) {
    for (const [key, values] of Object.entries(SYNONYMS.termIndex)) {
      if (key.includes(token) || token.includes(key)) {
        expanded.add(key);
        values.forEach((term) => expanded.add(term));
      }
    }
  }

  return [...expanded].filter(Boolean);
}

export function searchPreview(query: string, limit = 12): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  const terms = expandSearchTerms(q);
  const fuse = getFuse();
  const merged = new Map<string, SearchResult>();

  for (const term of terms) {
    for (const result of fuse.search(term, { limit: limit * 2 })) {
      const existing = merged.get(result.item.id);
      const score = result.score ?? 1;
      const matchedTerm = term === normalizeSearchTerm(q) ? undefined : term;

      if (!existing || score < (existing.score ?? 1)) {
        merged.set(result.item.id, {
          item: result.item,
          score,
          matchedTerm,
        });
      }
    }
  }

  return [...merged.values()]
    .filter((result) => !(CONTENT_SECTION_LOCKED && result.item.sectionId === "content"))
    .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
    .slice(0, limit);
}

export function groupSearchResults(results: SearchResult[]) {
  const groups = new Map<string, SearchResult[]>();

  for (const result of results) {
    const key = result.item.section;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(result);
  }

  return Array.from(groups.entries()).map(([section, items]) => ({
    section,
    items,
  }));
}

export function useSearchIndex() {
  return useMemo(() => searchIndex as SearchEntry[], []);
}

/** Simpler highlight for case-insensitive substring match. */
export function highlightText(text: string, query: string) {
  const q = query.trim();
  if (!q) return [{ text, match: false }];

  const lower = text.toLowerCase();
  const qLower = q.toLowerCase();
  const idx = lower.indexOf(qLower);
  if (idx === -1) return [{ text, match: false }];

  const segments: Array<{ text: string; match: boolean }> = [];
  if (idx > 0) segments.push({ text: text.slice(0, idx), match: false });
  segments.push({ text: text.slice(idx, idx + q.length), match: true });
  if (idx + q.length < text.length) {
    segments.push({ text: text.slice(idx + q.length), match: false });
  }
  return segments;
}

export function describeSearchMatch(result: SearchResult, query: string) {
  if (!result.matchedTerm) return null;
  const normalizedQuery = normalizeSearchTerm(query);
  if (result.matchedTerm === normalizedQuery) return null;
  if (result.item.title.toLowerCase().includes(normalizedQuery)) return null;
  if (result.item.keywords.toLowerCase().includes(normalizedQuery)) return null;
  return `Matches “${result.matchedTerm}”`;
}
