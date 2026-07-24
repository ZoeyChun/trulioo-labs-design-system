import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChapterHeader } from "./ChapterHeader";
import {
  SHOWCASES_BY_CHAPTER,
  type PreviewShowcase,
  type TemplateSectionId,
} from "../data/showcases";
import type { PreviewSection } from "../data/sections";
import type { NavPage } from "../data/navigation";

const TEMPLATE_TABS: { id: TemplateSectionId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "variants", label: "Variants" },
  { id: "props", label: "Props" },
  { id: "tokens", label: "Tokens" },
  { id: "a11y", label: "A11y" },
  { id: "code", label: "Code" },
];

type ComponentPageProps = {
  section: PreviewSection;
  page: NavPage;
  active: boolean;
};

function bucketShowcases(showcases: PreviewShowcase[]) {
  const buckets: Record<TemplateSectionId, PreviewShowcase[]> = {
    overview: [],
    variants: [],
    props: [],
    tokens: [],
    a11y: [],
    code: [],
  };

  for (const s of showcases) {
    buckets[s.templateSection].push(s);
  }

  // Unclassified variants fallback
  if (buckets.variants.length === 0 && showcases.length > 0) {
    buckets.variants = showcases.filter((s) => s.templateSection !== "overview");
  }

  return buckets;
}

function PropsTable({ showcases }: { showcases: PreviewShowcase[] }) {
  const apis = [...new Set(showcases.map((s) => s.api).filter(Boolean))];
  if (apis.length === 0) {
    return (
      <p className="tds-preview__template-empty">
        API classes are listed per showcase in the Variants section. Add{" "}
        <code>&lt;code class="ds-api"&gt;</code> blocks to index.html demos to populate this table.
      </p>
    );
  }

  return (
    <div className="tds-preview__props-table-wrap">
      <table className="tds-preview__props-table">
        <thead>
          <tr>
            <th scope="col">Class / API</th>
            <th scope="col">Used in</th>
          </tr>
        </thead>
        <tbody>
          {apis.map((api) => {
            const usedIn = showcases.filter((s) => s.api === api).map((s) => s.title);
            return (
              <tr key={api}>
                <td>
                  <code>{api}</code>
                </td>
                <td>{usedIn.join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function A11ySection({ pageLabel }: { pageLabel: string }) {
  return (
    <div className="tds-preview__a11y-guide">
      <ul className="tds-preview__a11y-list">
        <li>
          <strong>Keyboard</strong>: All interactive elements in {pageLabel} demos support Tab focus
          and Enter/Space activation. Dialog demos support Escape to dismiss.
        </li>
        <li>
          <strong>Focus visible</strong>: Components use <code>:focus-visible</code> with{" "}
          <code>--border-focus</code> (2px teal ring).
        </li>
        <li>
          <strong>ARIA</strong>: Apply <code>aria-label</code>, <code>aria-expanded</code>, and{" "}
          <code>role="dialog"</code> as shown in the Code section markup.
        </li>
        <li>
          <strong>Color contrast</strong>: Text and interactive colors meet WCAG AA against{" "}
          <code>--surface-neutral-01</code>.
        </li>
        <li>
          <strong>Motion</strong>: Respect <code>prefers-reduced-motion</code> in consuming apps for
          any added transitions.
        </li>
      </ul>
    </div>
  );
}

function ShowcaseBlock({ showcase }: { showcase: PreviewShowcase }) {
  const html = showcase.html.replace(/\.\.\/\.\.\/assets\//g, "/assets/");

  return (
    <article className="tds-preview__showcase-block" id={showcase.slug}>
      <header className="tds-preview__showcase-block-head">
        <h3>{showcase.title}</h3>
        {showcase.desc && <p>{showcase.desc}</p>}
        {showcase.api && (
          <code className="tds-preview__showcase-api">{showcase.api}</code>
        )}
      </header>
      <div
        className="tds-preview__showcase-block-canvas"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

export function ComponentPage({ section, page, active }: ComponentPageProps) {
  const showcases = SHOWCASES_BY_CHAPTER[section.id] ?? [];
  const buckets = useMemo(() => bucketShowcases(showcases), [showcases]);
  const [activeTab, setActiveTab] = useState<TemplateSectionId>("overview");
  const sectionRefs = useRef<Partial<Record<TemplateSectionId, HTMLElement | null>>>({});

  const scrollToSection = useCallback((id: TemplateSectionId) => {
    setActiveTab(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (!active) return;
    setActiveTab("overview");
  }, [active, section.id]);

  const hasTemplate = showcases.length > 0;
  const rawHtml = section.html.replace(/\.\.\/\.\.\/assets\//g, "/assets/");

  return (
    <div
      className={`tds-preview__panel${active ? " is-active" : ""}`}
      role="tabpanel"
      id={section.id}
      hidden={!active}
    >
      <ChapterHeader
        title={page.label}
        desc={section.desc}
        eyebrow={page.section === "foundations" ? "Foundation" : "Component family"}
      />

      {hasTemplate ? (
        <>
          <nav
            className="tds-preview__template-nav"
            aria-label="Page sections"
          >
            {TEMPLATE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tds-preview__template-nav-link${activeTab === tab.id ? " is-active" : ""}`}
                aria-current={activeTab === tab.id ? "true" : undefined}
                onClick={() => scrollToSection(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="tds-preview__template-sections">
            <section
              className="tds-preview__template-section"
              id={`${section.id}-overview`}
              ref={(el) => {
                sectionRefs.current.overview = el;
              }}
            >
              <h2 className="tds-preview__template-heading">Overview</h2>
              <p className="tds-preview__template-lead">{section.desc}</p>
              {buckets.overview.map((s) => (
                <ShowcaseBlock key={s.slug} showcase={s} />
              ))}
            </section>

            <section
              className="tds-preview__template-section"
              id={`${section.id}-variants`}
              ref={(el) => {
                sectionRefs.current.variants = el;
              }}
            >
              <h2 className="tds-preview__template-heading">Variants</h2>
              {buckets.variants.length > 0 ? (
                buckets.variants.map((s) => <ShowcaseBlock key={s.slug} showcase={s} />)
              ) : (
                <p className="tds-preview__template-empty">No variant showcases extracted yet.</p>
              )}
            </section>

            <section
              className="tds-preview__template-section"
              id={`${section.id}-props`}
              ref={(el) => {
                sectionRefs.current.props = el;
              }}
            >
              <h2 className="tds-preview__template-heading">Props</h2>
              <PropsTable showcases={showcases} />
            </section>

            <section
              className="tds-preview__template-section"
              id={`${section.id}-tokens`}
              ref={(el) => {
                sectionRefs.current.tokens = el;
              }}
            >
              <h2 className="tds-preview__template-heading">Tokens</h2>
              {buckets.tokens.length > 0 ? (
                buckets.tokens.map((s) => <ShowcaseBlock key={s.slug} showcase={s} />)
              ) : (
                <p className="tds-preview__template-empty">
                  Components inherit colors, spacing, radius, and type from{" "}
                  <a href="#/foundations/tokens">Design Tokens</a>. Use CSS custom properties from{" "}
                  <code>tokens/tokens.css</code> rather than hard-coded values.
                </p>
              )}
            </section>

            <section
              className="tds-preview__template-section"
              id={`${section.id}-a11y`}
              ref={(el) => {
                sectionRefs.current.a11y = el;
              }}
            >
              <h2 className="tds-preview__template-heading">A11y</h2>
              {buckets.a11y.length > 0 ? (
                buckets.a11y.map((s) => <ShowcaseBlock key={s.slug} showcase={s} />)
              ) : (
                <A11ySection pageLabel={page.label} />
              )}
            </section>

            <section
              className="tds-preview__template-section"
              id={`${section.id}-code`}
              ref={(el) => {
                sectionRefs.current.code = el;
              }}
            >
              <h2 className="tds-preview__template-heading">Code</h2>
              <p className="tds-preview__template-lead">
                Copy markup from the demos below. Each block mirrors the HTML in{" "}
                <code>pages/preview/index.html</code>.
              </p>
              {buckets.code.length > 0 ? (
                buckets.code.map((s) => <ShowcaseBlock key={s.slug} showcase={s} />)
              ) : (
                buckets.variants.slice(0, 2).map((s) => (
                  <ShowcaseBlock key={s.slug} showcase={s} />
                ))
              )}
            </section>
          </div>
        </>
      ) : (
        <div
          className="tds-preview__demos"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      )}
    </div>
  );
}
