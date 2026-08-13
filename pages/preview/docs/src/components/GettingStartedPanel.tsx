import { ChapterHeader } from "./ChapterHeader";
import { OVERVIEW_PRINCIPLES } from "../data/navigation";

type GettingStartedPanelProps = {
  active: boolean;
  onExplore: () => void;
};

function BeforeDiagram() {
  return (
    <svg
      viewBox="0 0 440 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="tds-preview__gs-diagram"
      role="img"
      aria-label="Before: fragmented workflow where developers rebuild components from scratch for every project"
    >
      <defs>
        <filter id="b-shadow" x="-4%" y="-4%" width="108%" height="112%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="var(--diagram-shadow)" floodOpacity="0.08" />
        </filter>
        <marker id="b-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="none" stroke="var(--diagram-arrow)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Figma node */}
      <g filter="url(#b-shadow)">
        <rect x="140" y="16" width="160" height="56" rx="14" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
      </g>
      <circle cx="172" cy="44" r="14" fill="var(--diagram-figma-bg)" stroke="var(--diagram-figma-border)" strokeWidth="0.75" />
      <path d="M167 38h4a3 3 0 010 6h-4m0-6v12m0-6h4a3 3 0 010 6h-4m4-12a3 3 0 010 6" stroke="var(--diagram-figma-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(0.5,0)" />
      <text x="198" y="41" fill="var(--diagram-text)" fontSize="12" fontWeight="600" fontFamily="var(--font-family)">Figma file</text>
      <text x="198" y="55" fill="var(--diagram-text-muted)" fontSize="10" fontFamily="var(--font-family)">Design only</text>

      {/* Dashed arrow down */}
      <path d="M220,72 L220,106" stroke="var(--diagram-arrow)" strokeWidth="1.2" strokeDasharray="5 4" markerEnd="url(#b-arrow)" />

      {/* Broken bridge */}
      <rect x="158" y="112" width="124" height="36" rx="10" fill="var(--diagram-gap-bg)" stroke="var(--diagram-gap-border)" strokeWidth="1" strokeDasharray="4 3" />
      <text x="184" y="135" fill="var(--diagram-gap-text)" fontSize="10.5" fontWeight="600" fontFamily="var(--font-family)">No shared code</text>

      {/* Scatter arrows to 3 projects */}
      <path d="M180,148 C168,170 100,170 80,190" stroke="var(--diagram-arrow)" strokeWidth="1.2" strokeDasharray="5 4" markerEnd="url(#b-arrow)" />
      <path d="M220,148 L220,190" stroke="var(--diagram-arrow)" strokeWidth="1.2" strokeDasharray="5 4" markerEnd="url(#b-arrow)" />
      <path d="M260,148 C272,170 340,170 360,190" stroke="var(--diagram-arrow)" strokeWidth="1.2" strokeDasharray="5 4" markerEnd="url(#b-arrow)" />

      {/* Project A */}
      <g filter="url(#b-shadow)">
        <rect x="16" y="196" width="128" height="64" rx="14" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
      </g>
      <circle cx="44" cy="220" r="12" fill="var(--diagram-proj-bg)" />
      <text x="40" y="224" textAnchor="middle" fill="var(--diagram-proj-icon)" fontSize="11" fontFamily="var(--font-family)">A</text>
      <text x="64" y="220" fill="var(--diagram-text)" fontSize="11" fontWeight="500" fontFamily="var(--font-family)">Project A</text>
      <text x="44" y="247" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">Rebuilds everything</text>

      {/* Project B */}
      <g filter="url(#b-shadow)">
        <rect x="156" y="196" width="128" height="64" rx="14" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
      </g>
      <circle cx="184" cy="220" r="12" fill="var(--diagram-proj-bg)" />
      <text x="180" y="224" textAnchor="middle" fill="var(--diagram-proj-icon)" fontSize="11" fontFamily="var(--font-family)">B</text>
      <text x="204" y="220" fill="var(--diagram-text)" fontSize="11" fontWeight="500" fontFamily="var(--font-family)">Project B</text>
      <text x="184" y="247" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">Rebuilds everything</text>

      {/* Project C */}
      <g filter="url(#b-shadow)">
        <rect x="296" y="196" width="128" height="64" rx="14" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
      </g>
      <circle cx="324" cy="220" r="12" fill="var(--diagram-proj-bg)" />
      <text x="320" y="224" textAnchor="middle" fill="var(--diagram-proj-icon)" fontSize="11" fontFamily="var(--font-family)">C</text>
      <text x="344" y="220" fill="var(--diagram-text)" fontSize="11" fontWeight="500" fontFamily="var(--font-family)">Project C</text>
      <text x="324" y="247" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">Rebuilds everything</text>

      {/* Pain-point pills */}
      <rect x="24" y="280" width="112" height="28" rx="14" fill="var(--diagram-pain-bg)" />
      <circle cx="42" cy="294" r="7" fill="var(--diagram-pain-icon-bg)" />
      <text x="38.5" y="297.5" textAnchor="middle" fill="var(--diagram-pain-text)" fontSize="9" fontWeight="700" fontFamily="var(--font-family)">!</text>
      <text x="56" y="298" fill="var(--diagram-pain-text)" fontSize="10" fontWeight="500" fontFamily="var(--font-family)">Inconsistent</text>

      <rect x="164" y="280" width="112" height="28" rx="14" fill="var(--diagram-pain-bg)" />
      <circle cx="182" cy="294" r="7" fill="var(--diagram-pain-icon-bg)" />
      <text x="178.5" y="297.5" textAnchor="middle" fill="var(--diagram-pain-text)" fontSize="9" fontWeight="700" fontFamily="var(--font-family)">!</text>
      <text x="196" y="298" fill="var(--diagram-pain-text)" fontSize="10" fontWeight="500" fontFamily="var(--font-family)">Duplicated</text>

      <rect x="304" y="280" width="112" height="28" rx="14" fill="var(--diagram-pain-bg)" />
      <circle cx="322" cy="294" r="7" fill="var(--diagram-pain-icon-bg)" />
      <text x="318.5" y="297.5" textAnchor="middle" fill="var(--diagram-pain-text)" fontSize="9" fontWeight="700" fontFamily="var(--font-family)">!</text>
      <text x="336" y="298" fill="var(--diagram-pain-text)" fontSize="10" fontWeight="500" fontFamily="var(--font-family)">Drift</text>

      {/* Divider + summary */}
      <line x1="60" y1="332" x2="380" y2="332" stroke="var(--diagram-border)" strokeWidth="0.75" strokeDasharray="3 3" />
      <rect x="108" y="348" width="224" height="32" rx="16" fill="var(--diagram-pain-bg)" stroke="var(--diagram-pain-border)" strokeWidth="0.75" />
      <text x="220" y="369" textAnchor="middle" fill="var(--diagram-pain-text)" fontSize="10.5" fontWeight="600" fontFamily="var(--font-family)">Every team ships a different UI</text>
    </svg>
  );
}

function AfterDiagram() {
  return (
    <svg
      viewBox="0 0 440 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="tds-preview__gs-diagram"
      role="img"
      aria-label="After: unified workflow where designers design and code components, pushing to a shared Git repo that all projects consume"
    >
      <defs>
        <filter id="a-shadow" x="-4%" y="-4%" width="108%" height="112%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="var(--diagram-shadow)" floodOpacity="0.08" />
        </filter>
        <marker id="a-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="none" stroke="var(--diagram-flow)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* ---- Row 1: Figma ---- */}
      <g filter="url(#a-shadow)">
        <rect x="140" y="12" width="160" height="56" rx="14" fill="var(--diagram-figma-bg)" stroke="var(--diagram-figma-border)" strokeWidth="1" />
      </g>
      <circle cx="172" cy="40" r="14" fill="var(--diagram-figma-icon-bg)" />
      <path d="M167 34h4a3 3 0 010 6h-4m0-6v12m0-6h4a3 3 0 010 6h-4m4-12a3 3 0 010 6" stroke="var(--diagram-figma-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(0.5,0)" />
      <text x="198" y="37" fill="var(--diagram-text)" fontSize="12" fontWeight="600" fontFamily="var(--font-family)">Figma</text>
      <text x="198" y="51" fill="var(--diagram-text-muted)" fontSize="10" fontFamily="var(--font-family)">Source of truth</text>

      {/* Solid arrow down to designer role */}
      <path d="M220,68 L220,92" stroke="var(--diagram-flow)" strokeWidth="1.5" markerEnd="url(#a-arrow)" />

      {/* ---- Row 2: Designer role ---- */}
      <g filter="url(#a-shadow)">
        <rect x="118" y="100" width="204" height="48" rx="14" fill="var(--diagram-role-bg)" stroke="var(--diagram-role-border)" strokeWidth="1" />
      </g>
      <circle cx="150" cy="124" r="13" fill="var(--diagram-role-icon-bg)" />
      <path d="M146 121a4 4 0 118 0 4 4 0 01-8 0m-2 9c0-3 3-5 6-5s6 2 6 5" stroke="var(--diagram-role-icon)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <text x="172" y="121" fill="var(--diagram-text)" fontSize="11" fontWeight="600" fontFamily="var(--font-family)">Designers</text>
      <text x="172" y="135" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">Design in Figma, code in CSS</text>

      {/* Arrow down to Git */}
      <path d="M220,148 L220,172" stroke="var(--diagram-flow)" strokeWidth="1.5" markerEnd="url(#a-arrow)" />

      {/* ---- Row 3: Git repo (central hub) ---- */}
      <g filter="url(#a-shadow)">
        <rect x="118" y="180" width="204" height="56" rx="14" fill="var(--diagram-git-bg)" stroke="var(--diagram-git-border)" strokeWidth="1" />
      </g>
      <circle cx="150" cy="208" r="14" fill="var(--diagram-git-icon-bg)" />
      {/* Git branch icon */}
      <circle cx="146" cy="202" r="2" stroke="var(--diagram-git-icon)" strokeWidth="1.2" fill="none" />
      <circle cx="154" cy="202" r="2" stroke="var(--diagram-git-icon)" strokeWidth="1.2" fill="none" />
      <circle cx="154" cy="214" r="2" stroke="var(--diagram-git-icon)" strokeWidth="1.2" fill="none" />
      <path d="M146 204v6c0 3 8 3 8 0v-2" stroke="var(--diagram-git-icon)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <text x="172" y="205" fill="var(--diagram-text)" fontSize="12" fontWeight="600" fontFamily="var(--font-family)">Git repository</text>
      <text x="172" y="219" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">CSS + HTML components</text>

      {/* Branching arrows: left to Doc site, right to Dev teams */}
      <path d="M176,236 C176,256 100,256 100,274" stroke="var(--diagram-flow)" strokeWidth="1.5" markerEnd="url(#a-arrow)" />
      <path d="M264,236 C264,256 340,256 340,274" stroke="var(--diagram-flow)" strokeWidth="1.5" markerEnd="url(#a-arrow)" />

      {/* ---- Row 4 left: Doc site ---- */}
      <g filter="url(#a-shadow)">
        <rect x="16" y="282" width="168" height="48" rx="14" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
      </g>
      <circle cx="46" cy="306" r="13" fill="var(--diagram-doc-bg)" />
      {/* Doc/book icon */}
      <path d="M41 300v12c3-2 7-2 10 0v-12c-3 2-7 2-10 0z" stroke="var(--diagram-doc-icon)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="68" y="303" fill="var(--diagram-text)" fontSize="11" fontWeight="500" fontFamily="var(--font-family)">Doc site</text>
      <text x="68" y="316" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">Previews + guides</text>

      {/* ---- Row 4 right: Dev teams ---- */}
      <g filter="url(#a-shadow)">
        <rect x="256" y="282" width="168" height="48" rx="14" fill="var(--diagram-node-bg)" stroke="var(--diagram-border)" strokeWidth="1" />
      </g>
      <circle cx="286" cy="306" r="13" fill="var(--diagram-dev-bg)" />
      {/* Code brackets icon */}
      <path d="M282 301l-4 5 4 5m8-10l4 5-4 5" stroke="var(--diagram-dev-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="308" y="303" fill="var(--diagram-text)" fontSize="11" fontWeight="500" fontFamily="var(--font-family)">Dev teams</text>
      <text x="308" y="316" fill="var(--diagram-text-muted)" fontSize="9.5" fontFamily="var(--font-family)">Import + ship</text>

      {/* Arrows from Dev teams down to projects */}
      <path d="M300,330 C300,346 80,346 80,358" stroke="var(--diagram-flow)" strokeWidth="1.2" markerEnd="url(#a-arrow)" />
      <path d="M340,330 L340,358" stroke="var(--diagram-flow)" strokeWidth="1.2" markerEnd="url(#a-arrow)" />
      <path d="M380,330 C380,346 400,348 400,358" stroke="var(--diagram-flow)" strokeWidth="1.2" markerEnd="url(#a-arrow)" />

      {/* ---- Row 5: Project pills ---- */}
      <rect x="28" y="364" width="104" height="28" rx="14" fill="var(--diagram-success-bg)" stroke="var(--diagram-success-border)" strokeWidth="0.75" />
      <circle cx="46" cy="378" r="7" fill="var(--diagram-success-check-bg)" />
      <path d="M43 378l2 2 4-4" stroke="var(--diagram-success-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="58" y="382" fill="var(--diagram-success-text)" fontSize="10" fontWeight="500" fontFamily="var(--font-family)">Project A</text>

      <rect x="288" y="364" width="104" height="28" rx="14" fill="var(--diagram-success-bg)" stroke="var(--diagram-success-border)" strokeWidth="0.75" />
      <circle cx="306" cy="378" r="7" fill="var(--diagram-success-check-bg)" />
      <path d="M303 378l2 2 4-4" stroke="var(--diagram-success-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="318" y="382" fill="var(--diagram-success-text)" fontSize="10" fontWeight="500" fontFamily="var(--font-family)">Project B</text>

      <rect x="348" y="364" width="76" height="28" rx="14" fill="var(--diagram-success-bg)" stroke="var(--diagram-success-border)" strokeWidth="0.75" />
      <circle cx="366" cy="378" r="7" fill="var(--diagram-success-check-bg)" />
      <path d="M363 378l2 2 4-4" stroke="var(--diagram-success-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="378" y="382" fill="var(--diagram-success-text)" fontSize="10" fontWeight="500" fontFamily="var(--font-family)">C</text>

      {/* Bottom banner */}
      <rect x="88" y="400" width="264" height="14" rx="7" fill="var(--diagram-success-bg)" />
      <text x="220" y="411" textAnchor="middle" fill="var(--diagram-success-text)" fontSize="9" fontWeight="600" letterSpacing="0.05em" fontFamily="var(--font-family)">CONSISTENT UI ACROSS ALL PRODUCTS</text>
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
        <section className="tds-preview__gs-section tds-preview__gs-section--full-bleed">
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
              <BeforeDiagram />
            </div>

            <div className="tds-preview__gs-comparison-panel tds-preview__gs-comparison-panel--after">
              <div className="tds-preview__gs-comparison-label tds-preview__gs-comparison-label--after">After</div>
              <p className="tds-preview__gs-comparison-desc">
                Designers now own the full component lifecycle. They design in Figma, code the CSS themselves,
                and push to a shared Git repository. Dev teams import prebuilt, production-ready components
                directly into their codebases -- no more rebuilding, no more guessing.
              </p>
              <AfterDiagram />
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
