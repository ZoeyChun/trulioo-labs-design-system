import { ALL_PAGES, NAV_SECTIONS, type AppRoute } from "../data/navigation";

type TopBarProps = {
  route: AppRoute;
  sidebarOpen: boolean;
  onHome: () => void;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
};

function breadcrumbLabel(route: AppRoute): string {
  if (route.type === "home") return "Overview";
  const page = ALL_PAGES.find((p) => p.id === route.pageId);
  const section = NAV_SECTIONS.find((s) => s.id === route.section);
  return page ? `${section?.label ?? ""} / ${page.label}` : "Overview";
}

export function TopBar({ route, sidebarOpen, onHome, onToggleSidebar, onOpenSearch }: TopBarProps) {
  const isHome = route.type === "home";
  const label = breadcrumbLabel(route);

  return (
    <header className="tds-preview__topbar">
      <div className="tds-preview__topbar-row">
        <button type="button" className="tds-preview__topbar-menu" onClick={onToggleSidebar} aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"} aria-expanded={sidebarOpen}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2.5 4h11M2.5 8h11M2.5 12h11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className="tds-preview__topbar-brand" onClick={onHome}>
          <span className="tds-preview__topbar-mark">TDS</span>
          <span className="tds-preview__topbar-title">{label}</span>
        </button>
        <button type="button" className="tds-preview__topbar-search" onClick={onOpenSearch} aria-label="Open search (Command K)">
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Search</span>
          <kbd>⌘K</kbd>
        </button>
      </div>
      {!isHome && route.type === "page" && (
        <nav className="tds-preview__breadcrumb" aria-label="Breadcrumb">
          <button type="button" className="tds-preview__breadcrumb-link" onClick={onHome}>Home</button>
          <span aria-hidden="true">/</span>
          <span className="tds-preview__breadcrumb-section">{NAV_SECTIONS.find((s) => s.id === route.section)?.label}</span>
          <span aria-hidden="true">/</span>
          <span className="tds-preview__breadcrumb-current" aria-current="page">{ALL_PAGES.find((p) => p.id === route.pageId)?.label}</span>
        </nav>
      )}
    </header>
  );
}
