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
        <span className="tds-preview__tracker-metric-label">Demo pages</span>
        <strong className="tds-preview__tracker-metric-value">{summary.demoPageCount}</strong>
        <ProgressBar
          value={summary.demoPageCount}
          max={Math.max(summary.demoPageCount, 1)}
          label={`Demo pages tracked: ${summary.demoPageCount}`}
          tone="intermediate"
        />
        <span className="tds-preview__tracker-metric-meta">
          Auto-discovered under pages/
        </span>
      </article>

      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">Avg DS adoption</span>
        <strong className="tds-preview__tracker-metric-value">{summary.avgAdoptionPercent}%</strong>
        <ProgressBar
          value={summary.avgAdoptionPercent}
          label={`Average DS adoption: ${summary.avgAdoptionPercent}%`}
          tone="brand"
        />
        <span className="tds-preview__tracker-metric-meta">
          Across {summary.builtForAdoption} built components
        </span>
      </article>
    </div>
  );
}
