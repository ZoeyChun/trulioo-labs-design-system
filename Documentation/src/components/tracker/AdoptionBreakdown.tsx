import { useMemo } from "react";
import type { TrackerPage, TrackerSummary } from "../../data/tracker";
import { TrackerShowcase } from "./TrackerShowcase";
import { ProgressBar, toneFromRatio } from "./ProgressBar";

type AdoptionBreakdownProps = {
  pages: TrackerPage[];
  summary: TrackerSummary;
};

const ADOPTION_PAGE_IDS = [
  "kyb-results",
  "document-verification",
  "electronic-id",
  "bank-verification",
  "unified-intelligence-home",
] as const;

export function AdoptionBreakdown({ pages, summary }: AdoptionBreakdownProps) {
  const sortedPages = useMemo(() => {
    const allowed = new Set<string>(ADOPTION_PAGE_IDS);
    return pages
      .filter((page) => allowed.has(page.id))
      .sort((a, b) => b.percent - a.percent);
  }, [pages]);

  const avgAdoptionPercent = useMemo(() => {
    if (sortedPages.length === 0) return 0;
    const total = sortedPages.reduce((sum, page) => sum + page.percent, 0);
    return Math.round(total / sortedPages.length);
  }, [sortedPages]);

  return (
    <TrackerShowcase
      title="Adoption breakdown"
      desc={`DS adoption across product demo pages. ${summary.builtForAdoption} components are built and trackable.`}
    >
      <div className="tds-preview__tracker-adoption">
        <div className="tds-preview__tracker-adoption-header">
          <span className="tds-preview__tracker-adoption-col-label">Page</span>
          <span className="tds-preview__tracker-adoption-col-label tds-preview__tracker-adoption-col-right">Usage</span>
        </div>

        <ul className="tds-preview__tracker-adoption-list">
          {sortedPages.map((page) => {
            const tone = toneFromRatio(page.percent / 100);
            return (
              <li key={page.id} className="tds-preview__tracker-adoption-row">
                <div className="tds-preview__tracker-adoption-row-head">
                  <span className="tds-preview__tracker-adoption-page-name">{page.label}</span>
                  <span className="tds-preview__tracker-adoption-page-stats">
                    <strong className="tds-preview__tracker-adoption-percent">{page.percent}%</strong>
                    <span className="tds-preview__tracker-adoption-detail">
                      {page.used} / {page.total} components
                    </span>
                  </span>
                </div>
                <ProgressBar
                  value={page.percent}
                  label={`${page.label}: ${page.percent}% adoption`}
                  tone={tone}
                  size="md"
                />
              </li>
            );
          })}
        </ul>

        <div className="tds-preview__tracker-adoption-footer">
          <span className="tds-preview__tracker-adoption-avg-label">Average adoption</span>
          <strong className="tds-preview__tracker-adoption-avg-value">{avgAdoptionPercent}%</strong>
        </div>
      </div>
    </TrackerShowcase>
  );
}
