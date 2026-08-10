import type { ReactNode } from "react";

type GuidelineSectionProps = {
  title: string;
  lead: ReactNode;
  children: ReactNode;
};

export function GuidelineSection({ title, lead, children }: GuidelineSectionProps) {
  return (
    <section className="tds-guideline-section">
      <h2 className="tds-guideline-section__title">{title}</h2>
      <div className="tds-guideline-section__lead">{lead}</div>
      {children}
    </section>
  );
}

type GuidelineCardProps = {
  variant: "do" | "dont";
  preview: ReactNode;
  caption: string;
};

function GuidelineVerdictIcon({ variant }: { variant: "do" | "dont" }) {
  if (variant === "do") {
    return (
      <svg
        className="tds-guideline-card__icon"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M5 8.25 7.1 10.35 11.25 6.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className="tds-guideline-card__icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M5.75 5.75 10.25 10.25M10.25 5.75 5.75 10.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GuidelineCard({ variant, preview, caption }: GuidelineCardProps) {
  const label = variant === "do" ? "Do" : "Don't";
  return (
    <article className={`tds-guideline-card tds-guideline-card--${variant}`}>
      <div className="tds-guideline-card__preview">{preview}</div>
      <div className="tds-guideline-card__verdict">
        <span className="tds-guideline-card__badge">
          <GuidelineVerdictIcon variant={variant} />
          {label}
        </span>
        <p>{caption}</p>
      </div>
    </article>
  );
}

type DoDontPairProps = {
  doPreview: ReactNode;
  doCaption: string;
  dontPreview: ReactNode;
  dontCaption: string;
};

export function DoDontPair({
  doPreview,
  doCaption,
  dontPreview,
  dontCaption,
}: DoDontPairProps) {
  return (
    <div className="tds-guideline-dodont">
      <GuidelineCard variant="do" preview={doPreview} caption={doCaption} />
      <GuidelineCard variant="dont" preview={dontPreview} caption={dontCaption} />
    </div>
  );
}
