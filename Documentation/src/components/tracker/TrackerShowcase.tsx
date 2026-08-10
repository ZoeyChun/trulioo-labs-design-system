import type { ReactNode } from "react";

type TrackerShowcaseProps = {
  title: string;
  desc?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function TrackerShowcase({ title, desc, actions, children }: TrackerShowcaseProps) {
  return (
    <section className="tds-preview__tracker-showcase">
      <header className="tds-preview__tracker-showcase__head">
        <div className="tds-preview__tracker-showcase__copy">
          <h2 className="tds-preview__tracker-showcase__title">{title}</h2>
          {desc && <p className="tds-preview__tracker-showcase__desc">{desc}</p>}
        </div>
        {actions && <div className="tds-preview__tracker-showcase__actions">{actions}</div>}
      </header>
      <div className="tds-preview__tracker-showcase__body">{children}</div>
    </section>
  );
}
