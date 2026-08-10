import { useState } from "react";

const LAYERS = [
  { id: "figma", label: "Figma", offset: 72 },
  { id: "ai", label: "AI Tooling", offset: 54 },
  { id: "local", label: "Local Dev", offset: 36 },
  { id: "github", label: "GitHub", offset: 18 },
  { id: "production", label: "Production", offset: 0 },
] as const;

const LAYER_ICONS: Record<string, string> = {
  figma:
    "M6 2a4 4 0 0 0 0 8h2V6h2a4 4 0 0 0 0-8H6Zm4 8H8v4h2a4 4 0 0 0 0-8v4Zm-4 0a4 4 0 0 0 0 8h2v-4H8a4 4 0 0 1-2-4Zm0 8a4 4 0 1 0 4-4H8v2a4 4 0 0 1-2 2Z",
  ai: "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8Z",
  local:
    "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z",
  github:
    "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z",
  production:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z",
};

export function HeroEcosystemVisual() {
  const [hovered, setHovered] = useState<string | null>(null);
  const layerPath = "M60 8 L112 40 L60 72 L8 40 Z";
  const viewHeight = 152;
  const layerCenterY = 40;

  return (
    <div className="tds-preview__hero-ecosystem-wrap">
      <svg
        className="tds-preview__hero-ecosystem"
        viewBox={`0 0 120 ${viewHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Design system pipeline: Figma, AI Tooling, Local Dev, GitHub, Production"
      >
        <g className="tds-preview__hero-ecosystem__float">
          {LAYERS.map((layer, i) => (
            <g
              key={layer.id}
              className={[
                "tds-preview__hero-ecosystem__layer",
                `tds-preview__hero-ecosystem__layer--${i + 1}`,
                hovered === layer.id && "is-hovered",
                hovered && hovered !== layer.id && "is-dimmed",
              ]
                .filter(Boolean)
                .join(" ")}
              onMouseEnter={() => setHovered(layer.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <path d={layerPath} pathLength={1} />
            </g>
          ))}
        </g>
      </svg>

      {LAYERS.map((layer) => (
        <div
          key={layer.id}
          className={[
            "tds-preview__hero-ecosystem__label",
            hovered === layer.id && "is-visible",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ top: `${((layerCenterY + layer.offset) / viewHeight) * 100}%` }}
          aria-hidden="true"
        >
          <svg
            className="tds-preview__hero-ecosystem__label-icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={LAYER_ICONS[layer.id]} />
          </svg>
          <span>{layer.label}</span>
        </div>
      ))}
    </div>
  );
}
