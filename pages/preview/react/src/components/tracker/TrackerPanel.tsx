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
  const { summary, pages, components, planned, lastBuiltAt, warnings } = COMPONENT_TRACKER;

  return (
    <div className="tds-preview__panel is-active" role="tabpanel" id="tracker">
      <ChapterHeader
        eyebrow="Build progress"
        title="Component tracker"
        desc={`CSS build status from Components/ and DS consumption across every demo under pages/. Last updated ${formatDate(lastBuiltAt)}.`}
      />

      <TrackerShowcase
        title="At a glance"
        desc="CSS build completion, per-page DS adoption, and category coverage — regenerated on every preview build."
      >
        <SummaryHeader summary={summary} />
        <TrackerCharts summary={summary} components={components} pages={pages} planned={planned} />
      </TrackerShowcase>

      <ComponentTable components={components} pages={pages} />

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
