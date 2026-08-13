import { ChapterHeader } from "./ChapterHeader";
import { OVERVIEW_PRINCIPLES } from "../data/navigation";

type GettingStartedPanelProps = {
  active: boolean;
  onExplore: () => void;
};

const MD = {
  brush:
    "M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 00-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 000-1.41z",
  warning:
    "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  person:
    "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  code:
    "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  menuBook:
    "M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z",
  checkCircle:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  linkOff:
    "M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16v-2zM2 4.27l3.11 3.11A4.991 4.991 0 002 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73l1 1H8v1.9h5.73l4 4 1.41-1.41L3.41 2.86 2 4.27z",
};

function GitHubLogoIcon({ x, y, r = 14, iconSize = 15 }: { x: number; y: number; r?: number; iconSize?: number }) {
  const scale = iconSize / 24;
  const tx = x - iconSize / 2;
  const ty = y - iconSize / 2;
  return (
    <>
      <circle cx={x} cy={y} r={r} fill="#24292f" />
      <g transform={`translate(${tx},${ty}) scale(${scale})`} aria-hidden="true">
        <path
          fill="#fff"
          d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.385-.135-.345-.72-1.385-1.235-1.685-1.125-.615-1.875-.21-2.355.075-.705.33-1.08 1.035-1.035 1.875.045.345.195.585.405.75-.345 0-1.335-.195-2.385-.96-1.125-.975-1.875-2.385-1.875-4.125 0-3.045 2.16-5.625 6.255-5.625 1.335 0 2.565.465 3.585 1.23.105-.09.465-.39.945-.63 1.425-.615 2.955-.21 3.765.12.12.675.465 1.875.63 2.385.015.195.075.42.075.645 0 1.56-.015 3.585-.015 4.125 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
        />
      </g>
    </>
  );
}

function MdIcon({
  path,
  x,
  y,
  size = 14,
  fill,
}: {
  path: string;
  x: number;
  y: number;
  size?: number;
  fill: string;
}) {
  const scale = size / 24;
  const tx = x - size / 2;
  const ty = y - size / 2;
  return (
    <g transform={`translate(${tx},${ty}) scale(${scale})`}>
      <path d={path} fill={fill} />
    </g>
  );
}

/**
 * Orthogonal connector: vertical drop, rounded corner, horizontal run, rounded corner, vertical drop.
 * R = corner radius. All paths go from (sx,sy) down to midY, across to tx, then down to (tx,ty).
 */
function elbowPath(sx: number, sy: number, tx: number, ty: number, r = 8) {
  const midY = sy + (ty - sy) * 0.45;
  const dx = tx > sx ? 1 : -1;
  return [
    `M${sx},${sy}`,
    `V${midY - r}`,
    `Q${sx},${midY} ${sx + r * dx},${midY}`,
    `H${tx - r * dx}`,
    `Q${tx},${midY} ${tx},${midY + r}`,
    `V${ty}`,
  ].join(" ");
}

const ARROW_SIZE = 4;

function ArrowHead({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <polygon
      points={`${x - ARROW_SIZE},${y - ARROW_SIZE} ${x},${y} ${x + ARROW_SIZE},${y - ARROW_SIZE}`}
      fill={fill}
    />
  );
}

function BeforeDiagram() {
  const CX = 190;
  const COL_A = 70;
  const COL_C = 310;

  return (
    <svg
      viewBox="0 0 380 412"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="tds-preview__gs-diagram"
      role="img"
      aria-label="Before: fragmented workflow where developers rebuild components from scratch for every project"
    >
      <defs>
        <filter id="b-sh" x="-6%" y="-6%" width="112%" height="116%">
          <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#000" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* ---- Connectors (behind everything) ---- */}
      <g aria-hidden="true" fill="none" strokeWidth="1.25" strokeDasharray="5 4">
        {/* Center: Figma -> gap */}
        <line x1={CX} y1="72" x2={CX} y2="116" stroke="var(--diagram-arrow)" />
        {/* Gap -> Project A (elbow left) */}
        <path d={elbowPath(CX - 20, 152, COL_A, 198)} stroke="var(--diagram-arrow)" />
        {/* Gap -> Project B (straight) */}
        <line x1={CX} y1="152" x2={CX} y2="198" stroke="var(--diagram-arrow)" />
        {/* Gap -> Project C (elbow right) */}
        <path d={elbowPath(CX + 20, 152, COL_C, 198)} stroke="var(--diagram-arrow)" />
      </g>
      {/* Arrowheads */}
      <ArrowHead x={CX} y={118} fill="var(--diagram-arrow)" />
      <ArrowHead x={COL_A} y={200} fill="var(--diagram-arrow)" />
      <ArrowHead x={CX} y={200} fill="var(--diagram-arrow)" />
      <ArrowHead x={COL_C} y={200} fill="var(--diagram-arrow)" />

      {/* ---- Row 1: Figma file ---- */}
      <g filter="url(#b-sh)">
        <rect x={CX - 80} y="20" width="160" height="52" rx="12" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
      </g>
      <circle cx={CX - 50} cy="46" r="14" fill="var(--diagram-figma-icon-bg)" />
      <MdIcon path={MD.brush} x={CX - 50} y={46} size={14} fill="var(--diagram-figma-icon)" />
      <text x={CX - 28} y="43" fill="var(--diagram-text)" fontSize="12" fontWeight="600" fontFamily="var(--font-family)">Figma file</text>
      <text x={CX - 28} y="57" fill="var(--diagram-text-muted)" fontSize="10" fontFamily="var(--font-family)">Design only</text>

      {/* ---- Gap pill ---- */}
      <rect x={CX - 60} y="118" width="120" height="34" rx="17" fill="var(--diagram-gap-bg)" stroke="var(--diagram-gap-border)" strokeWidth="1" strokeDasharray="4 3" />
      <MdIcon path={MD.linkOff} x={CX - 25} y={135} size={13} fill="var(--diagram-gap-text)" />
      <text x={CX - 8} y="139" fill="var(--diagram-gap-text)" fontSize="10.5" fontWeight="600" fontFamily="var(--font-family)">No code</text>

      {/* ---- Row 2: Project cards ---- */}
      {([["A", COL_A], ["B", CX], ["C", COL_C]] as const).map(([label, cx]) => (
        <g key={label}>
          <g filter="url(#b-sh)">
            <rect x={cx - 56} y="200" width="112" height="52" rx="12" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
          </g>
          <circle cx={cx - 30} cy="226" r="11" fill="var(--diagram-proj-bg)" />
          <text x={cx - 30} y="230" textAnchor="middle" fill="var(--diagram-proj-icon)" fontSize="10" fontWeight="600" fontFamily="var(--font-family)">{label}</text>
          <text x={cx - 12} y="222" fill="var(--diagram-text)" fontSize="10.5" fontWeight="500" fontFamily="var(--font-family)">Project {label}</text>
          <text x={cx - 12} y="237" fill="var(--diagram-text-muted)" fontSize="9" fontFamily="var(--font-family)">Rebuilds all</text>
        </g>
      ))}

      {/* ---- Row 3: Pain pills ---- */}
      {([
        ["Inconsistent", COL_A],
        ["Duplicated", CX],
        ["Drift", COL_C],
      ] as const).map(([label, cx]) => (
        <g key={label}>
          <rect x={cx - 50} y="268" width="100" height="26" rx="13" fill="var(--diagram-pain-bg)" />
          <circle cx={cx - 32} cy="281" r="7" fill="var(--diagram-pain-icon-bg)" />
          <MdIcon path={MD.warning} x={cx - 32} y={281} size={9} fill="var(--diagram-pain-text)" />
          <text x={cx - 19} y="285" fill="var(--diagram-pain-text)" fontSize="9.5" fontWeight="500" fontFamily="var(--font-family)">{label}</text>
        </g>
      ))}

      {/* ---- Summary banner ---- */}
      <line x1="50" y1="312" x2="330" y2="312" stroke="var(--diagram-border)" strokeWidth="0.75" strokeDasharray="3 3" />
      <rect x={CX - 100} y="328" width="200" height="30" rx="15" fill="var(--diagram-pain-bg)" stroke="var(--diagram-pain-border)" strokeWidth="0.75" />
      <text x={CX} y="348" textAnchor="middle" fill="var(--diagram-pain-text)" fontSize="10" fontWeight="600" fontFamily="var(--font-family)">Every team ships a different UI</text>
    </svg>
  );
}

function AfterDiagram() {
  const CX = 190;
  const DOC_CX = 90;
  const DEV_CX = 290;
  const COL_A = 70;
  const COL_C = 310;

  return (
    <svg
      viewBox="0 0 380 412"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="tds-preview__gs-diagram"
      role="img"
      aria-label="After: unified workflow where designers design and code components, then push to a shared Git repo"
    >
      <defs>
        <filter id="a-sh" x="-6%" y="-6%" width="112%" height="116%">
          <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#000" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* ---- Connectors (behind everything) ---- */}
      <g aria-hidden="true" fill="none" stroke="var(--diagram-flow)" strokeWidth="1.5">
        {/* Figma -> Designers */}
        <line x1={CX} y1="68" x2={CX} y2="98" />
        {/* Designers -> Git */}
        <line x1={CX} y1="148" x2={CX} y2="178" />
        {/* Git -> Doc site (elbow left) */}
        <path d={elbowPath(CX, 232, DOC_CX, 276)} />
        {/* Git -> Dev teams (elbow right) */}
        <path d={elbowPath(CX, 232, DEV_CX, 276)} />
      </g>
      {/* Arrowheads */}
      <ArrowHead x={CX} y={100} fill="var(--diagram-flow)" />
      <ArrowHead x={CX} y={180} fill="var(--diagram-flow)" />
      <ArrowHead x={DOC_CX} y={278} fill="var(--diagram-flow)" />
      <ArrowHead x={DEV_CX} y={278} fill="var(--diagram-flow)" />

      {/* Dev teams -> Projects bus line */}
      <g aria-hidden="true" fill="none" stroke="var(--diagram-flow)" strokeWidth="1.25">
        {/* Vertical drop from Dev teams */}
        <line x1={DEV_CX} y1="326" x2={DEV_CX} y2="340" />
        {/* Horizontal bus */}
        <line x1={COL_A} y1="340" x2={COL_C} y2="340" />
        {/* Drops to each project */}
        <line x1={COL_A} y1="340" x2={COL_A} y2="356" />
        <line x1={CX} y1="340" x2={CX} y2="356" />
        <line x1={COL_C} y1="340" x2={COL_C} y2="356" />
      </g>
      <ArrowHead x={COL_A} y={358} fill="var(--diagram-flow)" />
      <ArrowHead x={CX} y={358} fill="var(--diagram-flow)" />
      <ArrowHead x={COL_C} y={358} fill="var(--diagram-flow)" />

      {/* ---- Row 1: Figma ---- */}
      <g filter="url(#a-sh)">
        <rect x={CX - 80} y="16" width="160" height="52" rx="12" fill="var(--diagram-figma-bg)" stroke="var(--diagram-figma-border)" strokeWidth="1" />
      </g>
      <circle cx={CX - 50} cy="42" r="14" fill="var(--diagram-figma-icon-bg)" />
      <MdIcon path={MD.brush} x={CX - 50} y={42} size={14} fill="var(--diagram-figma-icon)" />
      <text x={CX - 28} y="39" fill="var(--diagram-text)" fontSize="12" fontWeight="600" fontFamily="var(--font-family)">Figma</text>
      <text x={CX - 28} y="53" fill="var(--diagram-text-muted)" fontSize="10" fontFamily="var(--font-family)">Source of truth</text>

      {/* ---- Row 2: Designers ---- */}
      <g filter="url(#a-sh)">
        <rect x={CX - 96} y="100" width="192" height="48" rx="12" fill="var(--diagram-role-bg)" stroke="var(--diagram-role-border)" strokeWidth="1" />
      </g>
      <circle cx={CX - 66} cy="124" r="13" fill="var(--diagram-role-icon-bg)" />
      <MdIcon path={MD.person} x={CX - 66} y={124} size={14} fill="var(--diagram-role-icon)" />
      <text x={CX - 44} y="121" fill="var(--diagram-text)" fontSize="11" fontWeight="600" fontFamily="var(--font-family)">Designers</text>
      <text x={CX - 44} y="134" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">Design in Figma, code in CSS</text>

      {/* ---- Row 3: Git repo ---- */}
      <g filter="url(#a-sh)">
        <rect x={CX - 96} y="180" width="192" height="52" rx="12" fill="var(--diagram-git-bg)" stroke="var(--diagram-git-border)" strokeWidth="1" />
      </g>
      <GitHubLogoIcon x={CX - 66} y={206} />
      <text x={CX - 44} y="203" fill="var(--diagram-text)" fontSize="12" fontWeight="600" fontFamily="var(--font-family)">Git repository</text>
      <text x={CX - 44} y="217" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">CSS + HTML components</text>

      {/* ---- Row 4: Doc site + Dev teams ---- */}
      <g filter="url(#a-sh)">
        <rect x={DOC_CX - 74} y="278" width="148" height="48" rx="12" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
      </g>
      <circle cx={DOC_CX - 46} cy="302" r="13" fill="var(--diagram-doc-bg)" />
      <MdIcon path={MD.menuBook} x={DOC_CX - 46} y={302} size={14} fill="var(--diagram-doc-icon)" />
      <text x={DOC_CX - 26} y="299" fill="var(--diagram-text)" fontSize="11" fontWeight="500" fontFamily="var(--font-family)">Doc site</text>
      <text x={DOC_CX - 26} y="312" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">Previews + guides</text>

      <g filter="url(#a-sh)">
        <rect x={DEV_CX - 74} y="278" width="148" height="48" rx="12" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
      </g>
      <circle cx={DEV_CX - 46} cy="302" r="13" fill="var(--diagram-dev-bg)" />
      <MdIcon path={MD.code} x={DEV_CX - 46} y={302} size={14} fill="var(--diagram-dev-icon)" />
      <text x={DEV_CX - 26} y="299" fill="var(--diagram-text)" fontSize="11" fontWeight="500" fontFamily="var(--font-family)">Dev teams</text>
      <text x={DEV_CX - 26} y="312" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">Import + ship</text>

      {/* ---- Row 5: Project pills ---- */}
      {([["A", COL_A], ["B", CX], ["C", COL_C]] as const).map(([label, cx]) => (
        <g key={label}>
          <rect x={cx - 48} y="358" width="96" height="26" rx="13" fill="var(--diagram-success-bg)" stroke="var(--diagram-success-border)" strokeWidth="0.75" />
          <MdIcon path={MD.checkCircle} x={cx - 30} y={371} size={12} fill="var(--diagram-success-icon)" />
          <text x={cx - 18} y="375" fill="var(--diagram-success-text)" fontSize="10" fontWeight="500" fontFamily="var(--font-family)">Project {label}</text>
        </g>
      ))}

      {/* Bottom banner */}
      <rect x={CX - 120} y="388" width="240" height="18" rx="9" fill="var(--diagram-success-bg)" />
      <text x={CX} y="401" textAnchor="middle" fill="var(--diagram-success-text)" fontSize="8.5" fontWeight="600" letterSpacing="0.04em" fontFamily="var(--font-family)">CONSISTENT UI ACROSS ALL PRODUCTS</text>
    </svg>
  );
}

export function GettingStartedPanel({ active, onExplore }: GettingStartedPanelProps) {
  if (!active) return null;

  return (
    <div className="tds-preview__panel is-active" role="tabpanel">
      <ChapterHeader
        eyebrow="Getting Started"
        title="Overview"
        desc="The Trulioo Design System (TDS) is a design-to-code ecosystem that bridges Figma and production. Designers own the full lifecycle: they design components in Figma, code them as CSS, and ship to a shared Git repository that every product team consumes."
      />

      <div className="tds-preview__getting-started">
        {/* Before / After comparison */}
        <section className="tds-preview__gs-section">
          <h2>Why we built this</h2>
          <p>
            Building consistent products at scale requires a single shared component language.
            Here is how our workflow changed.
          </p>

          <div className="tds-preview__gs-comparison">
            <div className="tds-preview__gs-comparison-panel tds-preview__gs-comparison-panel--before">
              <div className="tds-preview__gs-comparison-label tds-preview__gs-comparison-label--before">Before</div>
              <p className="tds-preview__gs-comparison-desc">
                The design system lived only in Figma. For every new project, developers interpreted designs
                and rebuilt components from scratch. Each team made different decisions, leading to inconsistent
                UI, duplicated effort, and Figma-to-code drift that compounded over time.
              </p>
              <div className="tds-preview__gs-diagram-wrap">
                <BeforeDiagram />
              </div>
            </div>

            <div className="tds-preview__gs-comparison-panel tds-preview__gs-comparison-panel--after">
              <div className="tds-preview__gs-comparison-label tds-preview__gs-comparison-label--after">After</div>
              <p className="tds-preview__gs-comparison-desc">
                Designers now own the full component lifecycle. They design in Figma, code the CSS themselves,
                and push to a shared Git repository. Dev teams import prebuilt, production-ready components
                directly into their codebases -- no more rebuilding, no more guessing.
              </p>
              <div className="tds-preview__gs-diagram-wrap">
                <AfterDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="tds-preview__gs-section">
          <h2>Principles</h2>
          <div className="tds-preview__hero-grid tds-preview__hero-grid--compact">
            {OVERVIEW_PRINCIPLES.map((feature) => (
              <article key={feature.title} className="tds-preview__gs-principle-card">
                <strong>{feature.title}</strong>
                <span>{feature.body}</span>
              </article>
            ))}
          </div>
        </section>

        {/* Site organization */}
        <section className="tds-preview__gs-section">
          <h2>How this site is organized</h2>
          <div className="tds-preview__gs-grid tds-preview__gs-grid--four">
            <article className="tds-preview__gs-principle-card">
              <strong>Getting Started</strong>
              <span>Overview and component tracker for build status and adoption.</span>
            </article>
            <article className="tds-preview__gs-principle-card">
              <strong>Foundations</strong>
              <span>Typography and design tokens, the primitives every component builds on.</span>
            </article>
            <article className="tds-preview__gs-principle-card">
              <strong>Components</strong>
              <span>Individual components grouped by category: Button, TextInput, SideNav, and more.</span>
            </article>
            <article className="tds-preview__gs-principle-card">
              <strong>Content</strong>
              <span>Writing guidelines, vocabulary, and voice for product copy.</span>
            </article>
          </div>
        </section>

        <section className="tds-preview__gs-section">
          <button type="button" className="tds-preview__hero-cta" onClick={onExplore}>
            Browse components
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </section>
      </div>
    </div>
  );
}
