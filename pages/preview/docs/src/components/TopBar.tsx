import { useStickyTopBarVisible } from "../hooks/useStickyTopBarVisible";
import { ALL_PAGES, type AppRoute } from "../data/navigation";
import { searchShortcutLabel } from "../utils/platform";
import type { RefObject } from "react";

type TopBarProps = {
  route: AppRoute;
  mainRef: RefObject<HTMLElement | null>;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
};

function pageTitle(route: AppRoute): string {
  if (route.type === "home") return "Overview";
  return ALL_PAGES.find((p) => p.id === route.pageId)?.label ?? "Overview";
}

export function TopBar({
  route,
  mainRef,
  sidebarOpen,
  onToggleSidebar,
  onOpenSearch,
}: TopBarProps) {
  const visible = useStickyTopBarVisible(mainRef, route);

  if (route.type === "home") return null;

  const title = pageTitle(route);

  return (
    <header
      className={`tds-preview__topbar tds-preview__topbar--minimal${visible ? " tds-preview__topbar--visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="tds-preview__topbar-row">
        <button
          type="button"
          className="tds-preview__topbar-menu"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M2.5 4h11M2.5 8h11M2.5 12h11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h1 className="tds-preview__topbar-title">{title}</h1>

        <button
          type="button"
          className="tds-preview__topbar-search"
          onClick={onOpenSearch}
          aria-label="Open search (Command K)"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Search</span>
          <kbd>{searchShortcutLabel()}</kbd>
        </button>
      </div>
    </header>
  );
}
