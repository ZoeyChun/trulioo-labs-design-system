import { useMemo } from "react";
import Fuse from "fuse.js";
import searchIndex from "../data/search-index.json";

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
};

let fuseInstance: Fuse<SearchEntry> | null = null;

function getFuse(): Fuse<SearchEntry> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(searchIndex as SearchEntry[], {
      keys: [
        { name: "title", weight: 0.45 },
        { name: "description", weight: 0.2 },
        { name: "keywords", weight: 0.2 },
        { name: "category", weight: 0.1 },
        { name: "section", weight: 0.05 },
      ],
      threshold: 0.38,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export function searchPreview(query: string, limit = 12): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  return getFuse()
    .search(q, { limit })
    .map((r) => ({ item: r.item, score: r.score }));
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
