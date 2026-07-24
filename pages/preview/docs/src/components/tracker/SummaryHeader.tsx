import type { TrackerSummary } from "../../data/tracker";
import { ProgressBar } from "./ProgressBar";

type SummaryHeaderProps = {
  summary: TrackerSummary;
};

export function SummaryHeader({ summary }: SummaryHeaderProps) {
  return (
    <div className="tds-preview__tracker-metrics">
      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">CSS built</span>
        <strong className="tds-preview__tracker-metric-value">
          {summary.cssDone}
          <span className="tds-preview__tracker-metric-total"> / {summary.totalComponents}</span>
        </strong>
        <ProgressBar
          value={summary.cssDone}
          max={summary.totalComponents}
          label={`CSS built: ${summary.cssDone} of ${summary.totalComponents}`}
          tone="positive"
        />
        <span className="tds-preview__tracker-metric-meta">
          {summary.cssPartial} partial · {summary.cssNotStarted} not started
        </span>
      </article>

      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">Figma complete</span>
        <strong className="tds-preview__tracker-metric-value">{summary.figmaDonePercent}%</strong>
        <ProgressBar
          value={summary.figmaDonePercent}
          label={`Figma complete: ${summary.figmaDonePercent}%`}
          tone="positive"
        />
        <span className="tds-preview__tracker-metric-meta">
          {summary.figmaDone} of {summary.figmaEligible} components
        </span>
      </article>

      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">Preview adoption</span>
        <strong className="tds-preview__tracker-metric-value">{summary.adoption.preview.percent}%</strong>
        <ProgressBar
          value={summary.adoption.preview.percent}
          label={`Preview adoption: ${summary.adoption.preview.percent}%`}
          tone="positive"
        />
        <span className="tds-preview__tracker-metric-meta">
          {summary.adoption.preview.used} of {summary.adoption.preview.total} built
        </span>
      </article>

      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">BV adoption</span>
        <strong className="tds-preview__tracker-metric-value">{summary.adoption.bv.percent}%</strong>
        <ProgressBar
          value={summary.adoption.bv.percent}
          label={`BV adoption: ${summary.adoption.bv.percent}%`}
          tone="intermediate"
        />
        <span className="tds-preview__tracker-metric-meta">
          {summary.adoption.bv.used} of {summary.adoption.bv.total} built
        </span>
      </article>

      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">DV adoption</span>
        <strong className="tds-preview__tracker-metric-value">{summary.adoption.dv.percent}%</strong>
        <ProgressBar
          value={summary.adoption.dv.percent}
          label={`DV adoption: ${summary.adoption.dv.percent}%`}
          tone="brand"
        />
        <span className="tds-preview__tracker-metric-meta">
          {summary.adoption.dv.used} of {summary.adoption.dv.total} built
        </span>
      </article>
    </div>
  );
}
