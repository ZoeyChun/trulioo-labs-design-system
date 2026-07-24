import { useMemo, useState } from "react";
import {
  NAV_SECTIONS,
  type AppRoute,
  type NavPage,
  type NavSectionId,
  type PageId,
} from "../data/navigation";
import { NavIcon } from "./IconSprite";
import {
  SidebarSearch,
  filterNavSections,
  HighlightedLabel,
  isPageActive,
} from "./SidebarSearch";
import { useDebounce } from "../hooks/useDebounce";

type SidebarProps = {
  route: AppRoute;
  isOpen: boolean;
  expandedSections: Record<NavSectionId, boolean>;
  onSelectPage: (section: NavSectionId, pageId: PageId) => void;
  onHome: () => void;
  onToggle: () => void;
  onToggleSection: (sectionId: NavSectionId) => void;
};

function LifecycleBadge({ badge }: { badge: NavPage["badge"] }) {
  if (!badge) return null;
  const cls =
    badge === "Beta"
      ? "tds-preview__nav-badge--beta"
      : badge === "New"
        ? "tds-preview__nav-badge--new"
        : "tds-preview__nav-badge--deprecated";
  return <span className={`tds-preview__nav-badge ${cls}`}>{badge}</span>;
}

export function Sidebar({
  route,
  isOpen,
  expandedSections,
  onSelectPage,
  onHome,
  onToggle,
  onToggleSection,
}: SidebarProps) {
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 150);
  const isHome = route.type === "home";
  const visibleSections = useMemo(
    () => filterNavSections(debouncedFilter),
    [debouncedFilter]
  );
  const isFiltering = debouncedFilter.trim().length > 0;

  return (
    <aside className="tds-preview__sidebar" aria-label="Documentation navigation" data-expanded={isOpen}>
      <div className="tds-preview__sidebar-inner">
        <button type="button" className="tds-preview__brand" onClick={onHome} aria-current={isHome ? "page" : undefined}>
          <span className="tds-preview__brand-mark">TDS</span>
          <span className="tds-preview__brand-text">
            <span className="tds-preview__brand-name">Trulioo DS</span>
            <span className="tds-preview__brand-tag">Docs preview</span>
          </span>
        </button>

        <SidebarSearch filter={filter} onFilterChange={setFilter} />

        <nav className="tds-preview__nav-tree" aria-label="Documentation sections">
          {visibleSections.map((section) => {
            const expanded = isFiltering || expandedSections[section.id];
            return (
              <div key={section.id} className="tds-preview__nav-section">
                <button
                  type="button"
                  className={`tds-preview__nav-section-toggle${expanded ? " is-expanded" : ""}`}
                  aria-expanded={expanded}
                  onClick={() => onToggleSection(section.id)}
                >
                  <svg className="tds-preview__nav-section-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M4 2.5 8 6l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <HighlightedLabel text={section.label} query={debouncedFilter} />
                  <span className="tds-preview__nav-section-count">{section.pages.length}</span>
                </button>
                {expanded && (
                  <ul className="tds-preview__nav-section-list" role="list">
                    {section.pages.map((page) => {
                      const active = isPageActive(route, page);
                      return (
                        <li key={page.id}>
                          <button
                            type="button"
                            className={`tds-preview__nav-link${active ? " is-active" : ""}`}
                            aria-current={active ? "page" : undefined}
                            onClick={() => onSelectPage(section.id, page.id)}
                            title={page.label}
                          >
                            {page.icon && (
                              <span className="tds-preview__nav-icon" aria-hidden="true">
                                <NavIcon name={page.icon} />
                              </span>
                            )}
                            <span className="tds-preview__nav-label-text">
                              <HighlightedLabel text={page.label} query={debouncedFilter} />
                            </span>
                            <LifecycleBadge badge={page.badge} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
          {visibleSections.length === 0 && (
            <p className="tds-preview__nav-empty">No matches for &ldquo;{debouncedFilter}&rdquo;</p>
          )}
        </nav>

        <div className="tds-preview__sidebar-footer">
          <p>
            Synced from{" "}
            <a href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026" target="_blank" rel="noopener noreferrer">
              Figma ADS 2026
            </a>
          </p>
          <p className="tds-preview__sidebar-note">Press <kbd>⌘K</kbd> to search</p>
        </div>
      </div>

      <button type="button" className="tds-preview__sidebar-toggle" onClick={onToggle} aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"} aria-expanded={isOpen}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M9 3L4 7l5 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </aside>
  );
}
