import type { ReactNode } from "react";

type AnatomyPart = {
  number?: number;
  name: string;
  detail: string;
  api: string;
};

type ComponentAnatomyCardProps = {
  desc: string;
  api: string;
  parts: AnatomyPart[];
  children: ReactNode;
  tag?: string;
};

export function ComponentAnatomyCard({
  desc,
  api,
  parts,
  children,
  tag,
}: ComponentAnatomyCardProps) {
  return (
    <article className="ds-showcase" id="anatomy">
      <div className="ds-showcase__head">
        <h3 className="ds-showcase__title">Anatomy</h3>
        <p className="ds-showcase__desc">{desc}</p>
        <div className="ds-showcase__meta">
          <code className="ds-api">{api}</code>
          {tag ? <span className="ds-tag">{tag}</span> : null}
        </div>
      </div>
      <div className="ds-showcase__canvas ds-showcase__canvas--anatomy">
        <div className="ds-anatomy-layout">
          <div className="ds-anatomy-layout__specimen tds-guideline-card__preview">{children}</div>
          <div className="ds-anatomy-layout__legend">
            <dl className="ds-anatomy-legend">
              {parts.map((part) => (
                <div key={part.api} className="ds-anatomy-legend__item">
                  <dt className="ds-anatomy-legend__term">
                    {part.number != null ? (
                      <span className="ds-anatomy-legend__number" aria-hidden="true">
                        {part.number}
                      </span>
                    ) : null}
                    {part.name}
                  </dt>
                  <dd className="ds-anatomy-legend__detail">
                    <code>{part.api}</code>
                    <span>{part.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </article>
  );
}
