import { useEffect, useMemo, useState } from "react";
import {
  activeSectionFromRoute,
  isNavPageLocked,
  NAV_SECTIONS,
  type AppRoute,
  type NavPage,
  type NavSection,
  type NavSectionId,
} from "../data/navigation";
import { buildComponentNavGroups, type ComponentNavGroup } from "../data/component-nav";
import { NavIcon } from "./IconSprite";
import {
  SidebarSearch,
  filterPagesInSection,
  HighlightedLabel,
  isPageActive,
} from "./SidebarSearch";
import { useDebounce } from "../hooks/useDebounce";
import { supportsSidebarHoverExpand } from "../utils/platform";

const SECTION_ICONS: Record<NavSectionId, string> = {
  "getting-started": "section-getting-started",
  foundations: "section-foundations",
  components: "section-components",
  content: "section-content",
};

type SidebarProps = {
  route: AppRoute;
  isOpen: boolean;
  isExpanded: boolean;
  onSelectPage: (section: NavSectionId, pageId: string) => void;
  onHome: () => void;
  onToggle: () => void;
  onExpand: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
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

function PageLink({
  page,
  sectionId,
  route,
  query,
  onSelectPage,
}: {
  page: NavPage;
  sectionId: NavSectionId;
  route: AppRoute;
  query: string;
  onSelectPage: (section: NavSectionId, pageId: string) => void;
}) {
  const active = isPageActive(route, page);
  const locked = isNavPageLocked(page);

  return (
    <li>
      <button
        type="button"
        className={`tds-preview__nav-link tds-preview__nav-link--child${active ? " is-active" : ""}${locked ? " tds-preview__nav-link--locked" : ""}`}
        aria-current={active ? "page" : undefined}
        aria-disabled={locked || undefined}
        disabled={locked}
        onClick={() => {
          if (locked) return;
          onSelectPage(sectionId, page.id);
        }}
        title={locked ? `${page.label} (locked)` : page.label}
      >
        <span className="tds-preview__nav-label-text">
          <HighlightedLabel text={page.label} query={query} />
        </span>
        {!locked ? <LifecycleBadge badge={page.badge} /> : null}
        {locked ? (
          <svg
            className="tds-preview__nav-lock"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect
              x="3.25"
              y="7"
              width="9.5"
              height="6.75"
              rx="1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        ) : null}
      </button>
    </li>
  );
}

function filterComponentGroups(groups: ComponentNavGroup[], query: string): ComponentNavGroup[] {
  const q = query.trim().toLowerCase();
  if (!q) return groups;

  return groups
    .map((group) => ({
      ...group,
      pages: group.pages.filter(
        (page) =>
          page.label.toLowerCase().includes(q) ||
          page.id.toLowerCase().includes(q) ||
          page.description?.toLowerCase().includes(q)
      ),
    }))
    .filter((group) => group.pages.length > 0);
}

type SectionNavModel = {
  section: NavSection;
  pages: NavPage[];
  groups: ComponentNavGroup[];
  itemCount: number;
};

function buildSectionNavModels(
  componentGroups: ComponentNavGroup[],
  query: string
): SectionNavModel[] {
  return NAV_SECTIONS.map((section) => {
    if (section.id === "components") {
      const groups = filterComponentGroups(componentGroups, query);
      const itemCount = groups.reduce((sum, group) => sum + group.pages.length, 0);
      return { section, pages: [], groups, itemCount };
    }

    const pages = filterPagesInSection(section.pages, query);
    return { section, pages, groups: [], itemCount: pages.length };
  });
}

export function Sidebar({
  route,
  isOpen,
  isExpanded,
  onSelectPage,
  onHome,
  onToggle,
  onExpand,
  onHoverStart,
  onHoverEnd,
}: SidebarProps) {
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 150);
  const isHome = route.type === "home";
  const activeSectionId = activeSectionFromRoute(route);
  const componentGroups = useMemo(() => buildComponentNavGroups(), []);
  const hasFilter = debouncedFilter.trim().length > 0;

  const [expandedSections, setExpandedSections] = useState<Set<NavSectionId>>(
    () => new Set([activeSectionId])
  );

  const sectionModels = useMemo(
    () => buildSectionNavModels(componentGroups, debouncedFilter),
    [componentGroups, debouncedFilter]
  );

  const visibleSections = useMemo(
    () => (hasFilter ? sectionModels.filter((model) => model.itemCount > 0) : sectionModels),
    [hasFilter, sectionModels]
  );

  useEffect(() => {
    setExpandedSections((prev) => new Set([...prev, activeSectionId]));
  }, [activeSectionId]);

  useEffect(() => {
    if (!hasFilter) return;
    setExpandedSections(new Set(visibleSections.map((model) => model.section.id)));
  }, [hasFilter, debouncedFilter, visibleSections]);

  useEffect(() => {
    if (isHome) return;
    requestAnimationFrame(() => {
      document
        .querySelector(".tds-preview__nav-link.is-active")
        ?.scrollIntoView({ block: "nearest" });
    });
  }, [route, isHome]);

  const toggleSection = (sectionId: NavSectionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleSectionToggle = (sectionId: NavSectionId) => {
    if (!isOpen) {
      onExpand();
      setExpandedSections((prev) => new Set([...prev, sectionId]));
      return;
    }
    toggleSection(sectionId);
  };

  const handleBrandClick = () => {
    if (!isOpen) {
      onExpand();
    }
    onHome();
  };

  const handleSidebarPointerEnter = () => {
    if (!isOpen && supportsSidebarHoverExpand()) {
      onHoverStart();
    }
  };

  const handleSidebarPointerLeave = () => {
    if (!isOpen && supportsSidebarHoverExpand()) {
      onHoverEnd();
    }
  };

  const renderFlatPages = (pages: NavPage[], sectionId: NavSectionId) => (
    <ul className="tds-preview__nav-section-list" role="list">
      {pages.map((page) => (
        <PageLink
          key={page.id}
          page={page}
          sectionId={sectionId}
          route={route}
          query={debouncedFilter}
          onSelectPage={onSelectPage}
        />
      ))}
    </ul>
  );

  const renderComponentGroups = (groups: ComponentNavGroup[]) => (
    <>
      {groups.map((group) => (
        <div key={group.id} className="tds-preview__nav-group">
          <p className="tds-preview__nav-group-label tds-preview__sidebar-chrome">{group.label}</p>
          <ul className="tds-preview__nav-section-list" role="list">
            {group.pages.map((page) => (
              <PageLink
                key={page.id}
                page={page}
                sectionId="components"
                route={route}
                query={debouncedFilter}
                onSelectPage={onSelectPage}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );

  return (
    <aside
      className="tds-preview__sidebar"
      aria-label="Documentation navigation"
      data-expanded={isExpanded}
      data-pinned={isOpen}
      onMouseEnter={handleSidebarPointerEnter}
      onMouseLeave={handleSidebarPointerLeave}
      onFocusCapture={handleSidebarPointerEnter}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          handleSidebarPointerLeave();
        }
      }}
    >
      <div className="tds-preview__sidebar-inner">
        <button
          type="button"
          className="tds-preview__brand"
          onClick={handleBrandClick}
          aria-current={isHome ? "page" : undefined}
          title={!isOpen ? "Trulioo Design System" : undefined}
        >
          <span className="tds-preview__brand-mark">TDS</span>
          <span className="tds-preview__brand-text">
            <span className="tds-preview__brand-name">Trulioo DS</span>
            <span className="tds-preview__brand-tag">Design System</span>
          </span>
        </button>

        <SidebarSearch filter={filter} onFilterChange={setFilter} />

        <nav className="tds-preview__nav-tree" aria-label="Documentation">
          {visibleSections.map(({ section, pages, groups, itemCount }) => {
            const expanded = hasFilter || expandedSections.has(section.id);
            const sectionActive = activeSectionId === section.id && route.type === "page";

            return (
              <div key={section.id} className="tds-preview__nav-section">
                <button
                  type="button"
                  className={`tds-preview__nav-section-toggle${expanded ? " is-expanded" : ""}${sectionActive ? " is-active" : ""}`}
                  aria-expanded={expanded}
                  title={!isOpen ? section.label : undefined}
                  onClick={() => handleSectionToggle(section.id)}
                >
                  <span className="tds-preview__nav-section-icon" aria-hidden="true">
                    <NavIcon name={SECTION_ICONS[section.id]} />
                  </span>
                  <span className="tds-preview__nav-section-body tds-preview__sidebar-chrome">
                    <svg
                      className="tds-preview__nav-section-chevron"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 2l4 3-4 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="tds-preview__nav-section-label">{section.label}</span>
                    <span className="tds-preview__nav-section-count">{itemCount}</span>
                  </span>
                </button>

                <div className={`tds-preview__nav-section-panel${expanded ? " is-expanded" : ""}`}>
                  <div className="tds-preview__nav-section-panel-inner">
                    {section.id === "components"
                      ? renderComponentGroups(groups)
                      : renderFlatPages(pages, section.id)}
                  </div>
                </div>
              </div>
            );
          })}

          {hasFilter && visibleSections.length === 0 && (
            <p className="tds-preview__nav-empty">No matches for &ldquo;{debouncedFilter}&rdquo;</p>
          )}
        </nav>

        <div className="tds-preview__sidebar-footer tds-preview__sidebar-chrome">
          <p>
            Synced from{" "}
            <a
              href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026"
              target="_blank"
              rel="noopener noreferrer"
            >
              Figma ADS 2026
            </a>
          </p>
        </div>
      </div>

      <button
        type="button"
        className="tds-preview__sidebar-toggle"
        onClick={onToggle}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        aria-expanded={isExpanded}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M9 3L4 7l5 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </aside>
  );
}
