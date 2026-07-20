type ProgressBarProps = {
  value: number;
  max?: number;
  label: string;
  tone?: "brand" | "positive" | "intermediate" | "negative" | "neutral";
  size?: "sm" | "md";
};

export function ProgressBar({
  value,
  max = 100,
  label,
  tone = "brand",
  size = "sm",
}: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div
      className={`tds-preview__tracker-progress tds-preview__tracker-progress--${tone} tds-preview__tracker-progress--${size}`}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="tds-preview__tracker-progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

export type Segment = {
  label: string;
  value: number;
  tone: "positive" | "intermediate" | "negative" | "neutral";
};

type SegmentedBarProps = {
  segments: Segment[];
  total: number;
  label: string;
};

export function SegmentedBar({ segments, total, label }: SegmentedBarProps) {
  const safeTotal = total > 0 ? total : 1;

  return (
    <div className="tds-preview__tracker-segmented" role="img" aria-label={label}>
      <div className="tds-preview__tracker-segmented-track">
        {segments.map((segment) => {
          const width = (segment.value / safeTotal) * 100;
          if (width <= 0) return null;
          return (
            <div
              key={segment.label}
              className={`tds-preview__tracker-segment tds-preview__tracker-segment--${segment.tone}`}
              style={{ width: `${width}%` }}
              title={`${segment.label}: ${segment.value}`}
            />
          );
        })}
      </div>
      <ul className="tds-preview__tracker-segmented-legend">
        {segments.map((segment) => (
          <li
            key={segment.label}
            className={`tds-preview__tracker-stat-chip tds-preview__tracker-stat-chip--${segment.tone}`}
          >
            <span className="tds-preview__tracker-stat-chip-value">{segment.value}</span>
            <span className="tds-preview__tracker-stat-chip-label">{segment.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type BarRow = {
  label: string;
  value: number;
  max: number;
  meta?: string;
  tone?: "brand" | "positive" | "intermediate" | "negative" | "neutral";
};

type HorizontalBarChartProps = {
  title: string;
  description?: string;
  rows: BarRow[];
  valueSuffix?: string;
  showPercent?: boolean;
  compact?: boolean;
};

export function toneFromRatio(ratio: number): BarRow["tone"] {
  if (ratio >= 1) return "positive";
  if (ratio >= 0.5) return "intermediate";
  if (ratio > 0) return "brand";
  return "neutral";
}

export function HorizontalBarChart({
  title,
  description,
  rows,
  valueSuffix = "",
  showPercent = true,
  compact = false,
}: HorizontalBarChartProps) {
  return (
    <article className={`tds-preview__tracker-chart${compact ? " tds-preview__tracker-chart--compact" : ""}`}>
      <header className="tds-preview__tracker-chart-header">
        <h4 className="tds-preview__tracker-chart-title">{title}</h4>
        {description && <p className="tds-preview__tracker-chart-lead">{description}</p>}
      </header>
      <ul className="tds-preview__tracker-bar-chart">
        {rows.map((row) => {
          const percent = row.max > 0 ? Math.min(100, Math.round((row.value / row.max) * 100)) : 0;
          const tone = row.tone ?? toneFromRatio(row.value / row.max);
          return (
            <li key={row.label} className="tds-preview__tracker-bar-row">
              <div className="tds-preview__tracker-bar-head">
                <span className="tds-preview__tracker-bar-label">{row.label}</span>
                <span className="tds-preview__tracker-bar-value">
                  {showPercent && (
                    <strong className="tds-preview__tracker-bar-percent">{percent}%</strong>
                  )}
                  {(row.meta || !showPercent) && (
                    <span className="tds-preview__tracker-bar-detail">
                      {!showPercent && (
                        <>
                          {row.value}
                          {valueSuffix}
                        </>
                      )}
                      {row.meta && (
                        <span className="tds-preview__tracker-bar-meta">
                          {!showPercent && valueSuffix ? " · " : ""}
                          {row.meta}
                        </span>
                      )}
                    </span>
                  )}
                </span>
              </div>
              <div className="tds-preview__tracker-bar-track" aria-hidden="true">
                <div
                  className={`tds-preview__tracker-bar-fill tds-preview__tracker-bar-fill--${tone}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
