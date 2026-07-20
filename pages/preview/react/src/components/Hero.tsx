type HeroProps = {
  features: ReadonlyArray<{ title: string; body: string }>;
  onExplore: () => void;
};

export function Hero({ features, onExplore }: HeroProps) {
  return (
    <section className="tds-preview__hero">
      <div className="tds-preview__hero-orbs" aria-hidden="true">
        <div className="tds-preview__hero-orb tds-preview__hero-orb--1" />
        <div className="tds-preview__hero-orb tds-preview__hero-orb--2" />
        <div className="tds-preview__hero-orb tds-preview__hero-orb--3" />
      </div>

      <div className="tds-preview__hero-inner">
        <div className="tds-preview__hero-badge">
          <span className="tds-preview__hero-badge-dot" aria-hidden="true" />
          For product &amp; engineering teams
        </div>

        <h1 className="tds-preview__hero-title">
          Build with
          <br />
          <span className="tds-preview__hero-title-accent">clarity.</span>
        </h1>

        <p className="tds-preview__hero-lead">
          A living reference for the Trulioo component library: what each piece
          does, when to use it, and the exact class names to apply. Pure CSS,
          mapped 1:1 from Figma.
        </p>

        <div className="tds-preview__hero-actions">
          <button type="button" className="tds-preview__hero-cta" onClick={onExplore}>
            Explore components
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
          <a
            href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026"
            target="_blank"
            rel="noopener noreferrer"
            className="tds-preview__hero-secondary"
          >
            Open in Figma
          </a>
        </div>

        <div className="tds-preview__hero-highlights">
          <p className="tds-preview__hero-highlights-label">Get the highlights.</p>
          <div className="tds-preview__hero-grid">
            {features.map((feature, i) => (
              <article
                key={feature.title}
                className="tds-preview__hero-card"
                style={{ animationDelay: `${240 + i * 80}ms` }}
              >
                <strong>{feature.title}</strong>
                <span>{feature.body}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
