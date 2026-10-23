import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  buildComponentThumbnails,
  thumbnailsByCategory,
  type ComponentThumbnail,
} from "../data/component-thumbnails";

type ComponentThumbnailGridProps = {
  onSelect: (componentId: string) => void;
};

/** Fit preview to the card by scaling down proportionally (never squeeze). */
function fitPreviewToStage(stage: HTMLElement, preview: HTMLElement) {
  preview.style.transform = "none";
  const content = (preview.firstElementChild as HTMLElement | null) ?? preview;
  const contentWidth = Math.max(content.scrollWidth, content.offsetWidth, 1);
  const contentHeight = Math.max(content.scrollHeight, content.offsetHeight, 1);
  const availWidth = Math.max(stage.clientWidth, 1);
  const availHeight = Math.max(stage.clientHeight, 1);
  const scale = Math.min(1, availWidth / contentWidth, availHeight / contentHeight);
  preview.style.transform = scale < 0.999 ? `scale(${scale})` : "none";
}

function ThumbnailPreview({ thumb }: { thumb: ComponentThumbnail }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const preview = previewRef.current;
    if (!stage || !preview || !thumb.canvasHtml) return;

    preview.innerHTML = thumb.canvasHtml;

    const runFit = () => fitPreviewToStage(stage, preview);
    runFit();
    const frame = requestAnimationFrame(runFit);

    const observer = new ResizeObserver(runFit);
    observer.observe(stage);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [thumb.canvasHtml]);

  if (!thumb.canvasHtml) {
    return (
      <div className="tds-component-thumb__fallback" aria-hidden="true">
        <code>{thumb.apiHint || `.tds-${thumb.id}`}</code>
      </div>
    );
  }

  return (
    <div className="tds-component-thumb__stage" ref={stageRef} aria-hidden="true">
      <div className="tds-component-thumb__preview" ref={previewRef} />
    </div>
  );
}

export function ComponentThumbnailGrid({ onSelect }: ComponentThumbnailGridProps) {
  const [query, setQuery] = useState("");
  const thumbs = useMemo(() => buildComponentThumbnails(), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return thumbs;
    return thumbs.filter(
      (t) =>
        t.label.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.apiHint?.toLowerCase().includes(q) ?? false),
    );
  }, [thumbs, query]);
  const sections = useMemo(() => thumbnailsByCategory(filtered), [filtered]);

  return (
    <div className="tds-component-overview">
      <div className="tds-component-overview__toolbar">
        <label className="tds-component-overview__search">
          <span className="visually-hidden">Filter components</span>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter components"
            autoComplete="off"
          />
        </label>
        <span className="tds-component-overview__count">
          {filtered.length} component{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {sections.length === 0 ? (
        <p className="tds-component-overview__empty">No components match “{query}”.</p>
      ) : (
        sections.map((section) => (
          <section key={section.category} className="tds-component-overview__section">
            <h3 className="tds-component-overview__category">{section.category}</h3>
            <div className="tds-component-overview__grid">
              {section.items.map((thumb) => (
                <button
                  key={thumb.id}
                  type="button"
                  className="tds-component-thumb"
                  onClick={() => onSelect(thumb.id)}
                >
                  <div className="tds-component-thumb__media">
                    <ThumbnailPreview thumb={thumb} />
                  </div>
                  <div className="tds-component-thumb__meta">
                    <span className="tds-component-thumb__title">{thumb.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
