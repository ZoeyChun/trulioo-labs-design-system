import { COMPONENT_TRACKER } from "../../data/tracker";
import { ChapterHeader } from "../ChapterHeader";
import { SummaryHeader } from "./SummaryHeader";
import { TrackerCharts } from "./TrackerCharts";
import { ComponentTable } from "./ComponentTable";
import { PlannedSection } from "./PlannedSection";
import { TrackerShowcase } from "./TrackerShowcase";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function TrackerPanel() {
  const { summary, components, planned, lastBuiltAt, warnings } = COMPONENT_TRACKER;

  return (
    <div className="tds-preview__panel is-active" role="tabpanel" id="tracker">
      <ChapterHeader
        eyebrow="Build progress"
        title="Component tracker"
        desc={`Live status from Components/ and adoption across Preview, BV, and DV demo pages. Last updated ${formatDate(lastBuiltAt)}.`}
      />

      <TrackerShowcase
        title="At a glance"
        desc="CSS build completion, page adoption, and category coverage — regenerated on every preview build."
      >
        <SummaryHeader summary={summary} />
        <TrackerCharts summary={summary} components={components} planned={planned} />
      </TrackerShowcase>

      <ComponentTable components={components} />

      {planned.length > 0 && (
        <TrackerShowcase
          title="Planned backlog"
          desc="Upcoming components tracked in data/component-tracker.yaml."
        >
          <PlannedSection planned={planned} />
        </TrackerShowcase>
      )}

      {warnings.length > 0 && (
        <aside className="tds-preview__tracker-warnings" aria-label="Tracker warnings">
          <h3 className="tds-preview__tracker-showcase__title">Build warnings</h3>
          <ul>
            {warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
