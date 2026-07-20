import { NAV_ITEMS, type TabId } from "../data/navigation";

type TopBarProps = {
  activeLabel: string;
  activeTab: TabId | null;
  isHome: boolean;
  sidebarOpen: boolean;
  onSelect: (id: TabId) => void;
  onHome: () => void;
  onToggleSidebar: () => void;
};

export function TopBar({
  activeLabel,
  activeTab,
  isHome,
  sidebarOpen,
  onSelect,
  onHome,
  onToggleSidebar,
}: TopBarProps) {
  return (
    <header className="tds-preview__topbar">
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

        <button type="button" className="tds-preview__topbar-brand" onClick={onHome}>
          <span className="tds-preview__topbar-mark">TDS</span>
          <span className="tds-preview__topbar-title">
            {isHome ? "Overview" : activeLabel}
          </span>
        </button>
      </div>

      <nav className="tds-preview__mobile-tabs" role="tablist" aria-label="Components">
        {NAV_ITEMS.map((item) => {
          const active = !isHome && item.id === activeTab;
          return (
            <button
              key={item.id}
              type="button"
              className={`tds-preview__mobile-tab${active ? " is-active" : ""}`}
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
