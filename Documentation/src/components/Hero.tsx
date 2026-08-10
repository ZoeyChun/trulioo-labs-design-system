import { HERO_QUICK_LINKS, type HeroQuickLink } from "../data/navigation";
import { GlobalSearch } from "./GlobalSearch";
import { FigmaLogo } from "./FigmaLogo";
import { HeroEcosystemVisual } from "./HeroEcosystemVisual";

const ROLE_ICONS: Record<string, string> = {
  Designer:
    "M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 0 0 0-1.41z",
  Engineer:
    "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z",
  "PM · Stakeholder":
    "M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z",
  Content:
    "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z",
};

type HeroProps = {
  quickLinks?: ReadonlyArray<HeroQuickLink>;
  onExplore: () => void;
  onNavigate: (path: string) => void;
  searchOpen: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
};

export function Hero({
  quickLinks = HERO_QUICK_LINKS,
  onExplore,
  onNavigate,
  searchOpen,
  onSearchOpen,
  onSearchClose,
}: HeroProps) {
  return (
    <section className="tds-preview__hero">
      <div className="tds-preview__hero-blobs" aria-hidden="true">
        <span className="tds-preview__hero-blob tds-preview__hero-blob--1" />
        <span className="tds-preview__hero-blob tds-preview__hero-blob--2" />
      </div>

      <div className="tds-preview__hero-shell">
        <div className="tds-preview__hero-inner">
        <div className="tds-preview__hero-left">
          <div className="tds-preview__hero-copy">
            <p className="tds-preview__hero-eyebrow">Trulioo Adaptive Design System</p>
            <h1 className="tds-preview__hero-title">
              Build trust through{" "}
              <span className="tds-preview__hero-title-accent">
                consistent experience
              </span>
            </h1>
            <p className="tds-preview__hero-lead">
              One design system for Trulioo verification products—shared components,
              tokens, and guidelines for KYB, KYC, and identity teams.
            </p>
          </div>

          <div className="tds-preview__hero-toolbar">
            <GlobalSearch
              variant="hero"
              open={searchOpen}
              onClose={onSearchClose}
              onOpen={onSearchOpen}
              onNavigate={onNavigate}
            />
            <div className="tds-preview__hero-actions">
              <button
                type="button"
                className="tds-preview__hero-cta"
                onClick={onExplore}
              >
                Browse components
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <a
                href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026"
                target="_blank"
                rel="noopener noreferrer"
                className="tds-preview__hero-secondary"
              >
                <FigmaLogo size={16} className="tds-preview__hero-figma-logo" />
                Open in Figma
              </a>
            </div>
          </div>
        </div>

        <div className="tds-preview__hero-visual">
          <HeroEcosystemVisual />
        </div>
      </div>

      {/* ── Entry-point cards ── */}
      <div className="tds-preview__hero-cards">
        <div className="tds-preview__hero-cards-inner">
          {quickLinks.map((link, i) => (
            <button
              key={link.title}
              type="button"
              className="tds-preview__hero-role-card"
              style={{ animationDelay: `${300 + i * 80}ms` }}
              onClick={() => onNavigate(link.path)}
            >
              <div className="tds-preview__hero-role-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d={ROLE_ICONS[link.tag ?? ""] ?? ROLE_ICONS.Designer} />
                </svg>
              </div>
              <div className="tds-preview__hero-role-copy">
                <span className="tds-preview__hero-role-tag">{link.tag}</span>
                <strong className="tds-preview__hero-role-title">{link.title}</strong>
                {link.body ? (
                  <span className="tds-preview__hero-role-body">{link.body}</span>
                ) : null}
              </div>
              <svg
                className="tds-preview__hero-role-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M6 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
