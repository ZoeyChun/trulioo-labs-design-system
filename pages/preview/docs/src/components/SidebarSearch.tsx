import { useId } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { highlightText } from "../hooks/usePreviewSearch";
import {
  NAV_SECTIONS,
  type AppRoute,
  type NavPage,
  type NavSectionId,
} from "../data/navigation";

type SidebarSearchProps = {
  filter: string;
  onFilterChange: (value: string) => void;
};

export function SidebarSearch({ filter, onFilterChange }: SidebarSearchProps) {
  const inputId = useId();

  return (
    <div className="tds-preview__sidebar-search">
      <label htmlFor={inputId} className="tds-preview__sidebar-search-label">
        Filter navigation
      </label>
      <div className="tds-preview__sidebar-search-box">
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10.5 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          id={inputId}
          type="search"
          className="tds-preview__sidebar-search-input"
          placeholder="Filter…"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          autoComplete="off"
          aria-label="Filter sidebar navigation"
        />
        {filter && (
          <button
            type="button"
            className="tds-preview__sidebar-search-clear"
            onClick={() => onFilterChange("")}
            aria-label="Clear filter"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export function filterNavSections(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return NAV_SECTIONS;

  return NAV_SECTIONS.map((section) => ({
    ...section,
    pages: section.pages.filter(
      (page) =>
        page.label.toLowerCase().includes(q) ||
        page.id.toLowerCase().includes(q) ||
        page.description?.toLowerCase().includes(q)
    ),
  })).filter((section) => section.pages.length > 0);
}

export function HighlightedLabel({ text, query }: { text: string; query: string }) {
  const segments = highlightText(text, query);
  return (
    <>
      {segments.map((seg, i) =>
        seg.match ? (
          <mark key={i} className="tds-preview__nav-highlight">
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

export function isPageActive(route: AppRoute, page: NavPage): boolean {
  return route.type === "page" && route.pageId === page.id;
}

export function isSectionActive(route: AppRoute, sectionId: NavSectionId): boolean {
  return route.type === "page" && route.section === sectionId;
}
