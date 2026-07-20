import type { TrackerPlanned } from "../../data/tracker";

type PlannedSectionProps = {
  planned: TrackerPlanned[];
};

function priorityClass(priority: string) {
  return priority.toLowerCase().replace(/\s+/g, "-");
}

export function PlannedSection({ planned }: PlannedSectionProps) {
  return (
    <div className="tds-preview__tracker-planned-grid">
      {planned.map((item) => (
        <article key={item.name} className="tds-preview__tracker-planned-card">
          <div className="tds-preview__tracker-planned-card-head">
            <h3 className="tds-preview__tracker-planned-name">{item.name}</h3>
            <span
              className={`tds-preview__tracker-priority tds-preview__tracker-priority--${priorityClass(item.priority)}`}
            >
              {item.priority}
            </span>
          </div>
          <p className="tds-preview__tracker-planned-category">{item.category}</p>
          {item.description && (
            <p className="tds-preview__tracker-planned-desc">{item.description}</p>
          )}
          {item.dependsOn && (
            <p className="tds-preview__tracker-planned-meta">Depends on: {item.dependsOn}</p>
          )}
        </article>
      ))}
    </div>
  );
}
