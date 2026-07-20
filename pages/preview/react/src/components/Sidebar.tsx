import { NAV_ITEMS, type TabId } from "../data/navigation";
import { NavIcon } from "./IconSprite";

type SidebarProps = {
  activeTab: TabId | null;
  isHome: boolean;
  isOpen: boolean;
  onSelect: (id: TabId) => void;
  onHome: () => void;
  onToggle: () => void;
};

export function Sidebar({
  activeTab,
  isHome,
  isOpen,
  onSelect,
  onHome,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className="tds-preview__sidebar"
      aria-label="Component navigation"
      data-expanded={isOpen}
    >
      <div className="tds-preview__sidebar-inner">
        <button
          type="button"
          className="tds-preview__brand"
          onClick={onHome}
          aria-current={isHome ? "page" : undefined}
        >
          <span className="tds-preview__brand-mark">TDS</span>
          <span className="tds-preview__brand-text">
            <span className="tds-preview__brand-name">Trulioo DS</span>
            <span className="tds-preview__brand-tag">Component reference</span>
          </span>
        </button>

        <p className="tds-preview__nav-label">Components</p>

        <nav className="tds-preview__nav" role="tablist" aria-label="Components">
          {NAV_ITEMS.map((item) => {
            const active = !isHome && item.id === activeTab;
            return (
              <button
                key={item.id}
                type="button"
                className={`tds-preview__nav-link${active ? " is-active" : ""}`}
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                aria-label={item.label}
                title={item.label}
                onClick={() => onSelect(item.id)}
              >
                <span className="tds-preview__nav-icon" aria-hidden="true">
                  <NavIcon name={item.icon} />
                </span>
                <span className="tds-preview__nav-label-text">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="tds-preview__sidebar-footer">
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
          <p className="tds-preview__sidebar-note">
            Classes use the <code>tds-</code> prefix.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="tds-preview__sidebar-toggle"
        onClick={onToggle}
        aria-label="Collapse sidebar"
        aria-expanded={isOpen}
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
