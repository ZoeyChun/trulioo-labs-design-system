import type { TrackerSummary } from "../../data/tracker";
import { ProgressBar } from "./ProgressBar";

type InventoryStatsProps = {
  summary: TrackerSummary;
  plannedCount: number;
  plannedHighCount: number;
};

export function InventoryStats({ summary, plannedCount, plannedHighCount }: InventoryStatsProps) {
  const totalInventory = summary.totalComponents + plannedCount;
  const completionPercent = totalInventory > 0 ? Math.round((summary.cssDone / totalInventory) * 100) : 0;
  const remaining = totalInventory - summary.cssDone;

  return (
    <div className="tds-preview__tracker-metrics">
      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">Completion</span>
        <strong className="tds-preview__tracker-metric-value">{completionPercent}%</strong>
        <ProgressBar
          value={completionPercent}
          label={`Completion: ${completionPercent}%`}
          tone="positive"
        />
        <span className="tds-preview__tracker-metric-meta">
          {summary.cssDone} done of {totalInventory} total
        </span>
      </article>

      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">Remaining</span>
        <strong className="tds-preview__tracker-metric-value">{remaining}</strong>
        <ProgressBar
          value={remaining}
          max={totalInventory}
          label={`Remaining: ${remaining} of ${totalInventory}`}
          tone="intermediate"
        />
        <span className="tds-preview__tracker-metric-meta">
          {summary.cssNotStarted + summary.cssPartial} in progress, {plannedCount} planned
        </span>
      </article>

      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">High priority</span>
        <strong className="tds-preview__tracker-metric-value">{plannedHighCount}</strong>
        <ProgressBar
          value={plannedHighCount}
          max={plannedCount || 1}
          label={`High priority: ${plannedHighCount} of ${plannedCount} planned`}
          tone="negative"
        />
        <span className="tds-preview__tracker-metric-meta">
          of {plannedCount} planned items
        </span>
      </article>

      <article className="tds-preview__tracker-metric">
        <span className="tds-preview__tracker-metric-label">Avg adoption</span>
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
