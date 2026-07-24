import { useMemo } from "react";
import type { TrackerComponent, TrackerPlanned, TrackerSummary } from "../../data/tracker";
import {
  HorizontalBarChart,
  SegmentedBar,
  type BarRow,
  type Segment,
} from "./ProgressBar";

type TrackerChartsProps = {
  summary: TrackerSummary;
  components: TrackerComponent[];
  planned: TrackerPlanned[];
};

function countByStatus(components: TrackerComponent[], status: string) {
  return components.filter((component) => component.cssStatus === status).length;
}

function buildPriorityRows(planned: TrackerPlanned[]): BarRow[] {
  const order = ["High", "Medium", "Low"];
  const counts = new Map<string, number>();

  for (const item of planned) {
    counts.set(item.priority, (counts.get(item.priority) ?? 0) + 1);
  }

  const toneByPriority: Record<string, BarRow["tone"]> = {
    High: "negative",
    Medium: "intermediate",
    Low: "neutral",
  };

  return order
    .filter((priority) => counts.has(priority))
    .map((priority) => ({
      label: priority,
      value: counts.get(priority) ?? 0,
      max: planned.length,
      meta: `${counts.get(priority) ?? 0} items`,
      tone: toneByPriority[priority],
    }));
}

export function TrackerCharts({ summary, components, planned }: TrackerChartsProps) {
  const cssNa = useMemo(() => countByStatus(components, "N/A"), [components]);

  const buildSegments = useMemo<Segment[]>(
    () => [
      { label: "Done", value: summary.cssDone, tone: "positive" },
      { label: "Partial", value: summary.cssPartial, tone: "intermediate" },
      { label: "Not started", value: summary.cssNotStarted, tone: "negative" },
      { label: "N/A", value: cssNa, tone: "neutral" },
    ],
    [summary.cssDone, summary.cssPartial, summary.cssNotStarted, cssNa],
  );

  const adoptionRows = useMemo<BarRow[]>(
    () => [
      {
        label: "Preview",
        value: summary.adoption.preview.percent,
        max: 100,
        meta: `${summary.adoption.preview.used}/${summary.adoption.preview.total} used`,
        tone: "positive",
      },
      {
        label: "Bank verification",
        value: summary.adoption.bv.percent,
        max: 100,
        meta: `${summary.adoption.bv.used}/${summary.adoption.bv.total} used`,
        tone: "intermediate",
      },
      {
        label: "Document verification",
        value: summary.adoption.dv.percent,
        max: 100,
        meta: `${summary.adoption.dv.used}/${summary.adoption.dv.total} used`,
        tone: "brand",
      },
    ],
    [summary.adoption],
  );

  const priorityRows = useMemo(() => buildPriorityRows(planned), [planned]);

  return (
    <div className="tds-preview__tracker-charts" aria-label="Progress charts">
      <div className="tds-preview__tracker-charts-layout">
        <article className="tds-preview__tracker-chart">
          <h3 className="tds-preview__tracker-chart-title">Build status</h3>
          <p className="tds-preview__tracker-chart-lead">
            {summary.cssDone} of {summary.totalComponents} components have finished CSS
          </p>
          <SegmentedBar
            segments={buildSegments}
            total={summary.totalComponents}
            label={`CSS build status: ${summary.cssDone} done, ${summary.cssPartial} partial, ${summary.cssNotStarted} not started, ${cssNa} not applicable`}
          />
        </article>

        <div className="tds-preview__tracker-charts-pair">
          <HorizontalBarChart
            title="Adoption by page"
            description="Share of built components used on each demo page"
            rows={adoptionRows}
          />

          {planned.length > 0 && (
            <HorizontalBarChart
              title="Backlog by priority"
              description={`${planned.length} components queued`}
              rows={priorityRows}
              showPercent
            />
          )}
        </div>
      </div>
    </div>
  );
}
