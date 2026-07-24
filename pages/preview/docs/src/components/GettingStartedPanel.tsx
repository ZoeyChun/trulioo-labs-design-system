import { MigrationPanel } from "./MigrationPanel";
import { ChapterHeader } from "./ChapterHeader";
import { HERO_FEATURES } from "../data/navigation";

type GettingStartedPanelProps = {
  pageId: "overview" | "migration";
  active: boolean;
  onExplore: () => void;
};

export function GettingStartedPanel({
  pageId,
  active,
  onExplore,
}: GettingStartedPanelProps) {
  if (!active) return null;

  if (pageId === "migration") {
    return <MigrationPanel />;
  }

  return (
    <div className="tds-preview__panel is-active" role="tabpanel">
      <ChapterHeader
        eyebrow="Getting Started"
        title="Overview"
        desc="A living reference for the Trulioo component library — what each piece does, when to use it, and the exact class names to apply."
      />

      <div className="tds-preview__getting-started">
        <section className="tds-preview__gs-section">
          <h2>How this site is organized</h2>
          <div className="tds-preview__gs-grid">
            <article className="tds-preview__gs-card">
              <h3>Getting Started</h3>
              <p>Overview, component tracker, and migration notes from the classic preview.</p>
            </article>
            <article className="tds-preview__gs-card">
              <h3>Foundations</h3>
              <p>Typography and design tokens — the primitives every component builds on.</p>
            </article>
            <article className="tds-preview__gs-card">
              <h3>Components</h3>
              <p>Flat A–Z list of component families with Overview, Variants, Props, Tokens, A11y, and Code sections.</p>
            </article>
          </div>
        </section>

        <section className="tds-preview__gs-section">
          <h2>Principles</h2>
          <div className="tds-preview__hero-grid tds-preview__hero-grid--compact">
            {HERO_FEATURES.map((feature) => (
              <article key={feature.title} className="tds-preview__hero-card">
                <strong>{feature.title}</strong>
                <span>{feature.body}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="tds-preview__gs-section">
          <button type="button" className="tds-preview__hero-cta" onClick={onExplore}>
            Browse components
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
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
        </section>
      </div>
    </div>
  );
}
