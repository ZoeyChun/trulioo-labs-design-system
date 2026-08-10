import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChapterHeader } from "./ChapterHeader";
import { chapterIdForComponent } from "../data/component-chapters";
import { filterShowcasesForComponent, findTrackerComponent } from "../data/component-nav";
import {
  SHOWCASES_BY_CHAPTER,
  type PreviewShowcase,
  type TemplateSectionId,
} from "../data/showcases";
import {
  DEFAULT_COMPONENT_DOC_TAB,
  DOC_TABS,
  DEVELOPER_DOC_TABS,
  PRIMARY_DOC_TABS,
  type DocTabId,
} from "../data/template-sections";
import {
  renderComponentContentGuidelines,
} from "../data/component-content-guidelines";
import { getComponentAlternativeNames, getComponentPageDescription } from "../data/component-descriptions";
import { hasComponentAnatomy, renderComponentAnatomy } from "../data/component-anatomy";
import {
  renderComponentContentA11y,
} from "../data/component-content-a11y";
import {
  renderComponentContentCode,
} from "../data/component-content-code";
import type { PreviewSection } from "../data/sections";
import { isComponentDocPage, pageToPath, type NavPage } from "../data/navigation";
import { initPreviewDemos, usePanelDemoInteractions } from "../hooks/usePreviewInteractions";

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
        API classes are listed per showcase in the Design section. Add{" "}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const html = useMemo(
    () => showcase.html.replace(/\.\.\/\.\.\/assets\//g, "/assets/"),
    [showcase.html],
  );

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (el.dataset.showcaseSource !== showcase.slug) {
      el.innerHTML = html;
      el.dataset.showcaseSource = showcase.slug;
    }

    const frame = requestAnimationFrame(() => initPreviewDemos(el));
    return () => cancelAnimationFrame(frame);
  }, [html, showcase.slug]);

  return <div id={showcase.slug} ref={containerRef} />;
}

function DocTabItem({
  tab,
  activeTab,
  onSelect,
}: {
  tab: (typeof DOC_TABS)[number];
  activeTab: DocTabId;
  onSelect: (id: DocTabId) => void;
}) {
  const isActive = activeTab === tab.id;

  return (
    <button
      type="button"
      role="tab"
      className={`tds-tab-item${isActive ? " tds-tab-item--active" : ""}`}
      aria-selected={isActive}
      onClick={() => onSelect(tab.id)}
    >
      <span className="tds-tab-item__content">{tab.label}</span>
      <span className="tds-tab-item__indicator" aria-hidden="true" />
    </button>
  );
}

export function ComponentPage({ section, page, active }: ComponentPageProps) {
  const pageKey = page.id;
  const chapterShowcases = SHOWCASES_BY_CHAPTER[section.id] ?? [];
  const showcases = useMemo(() => {
    if (!isComponentDocPage(page.id)) return chapterShowcases;
    return filterShowcasesForComponent(chapterShowcases, page.id);
  }, [chapterShowcases, page.id]);

  const buckets = useMemo(() => bucketShowcases(showcases), [showcases]);
  const designShowcases = useMemo(
    () => [...buckets.variants, ...buckets.tokens],
    [buckets.variants, buckets.tokens]
  );

  const defaultTab = useMemo<DocTabId>(() => {
    if (isComponentDocPage(page.id)) {
      if (hasComponentAnatomy(page.id)) return "variants";
      return DEFAULT_COMPONENT_DOC_TAB;
    }
    if (buckets.overview.length > 0) return "overview";
    if (designShowcases.length > 0) return "variants";
    return "overview";
  }, [page.id, buckets.overview.length, designShowcases.length]);
  const [activeTab, setActiveTab] = useState<DocTabId>(defaultTab);

  const selectTab = (id: DocTabId) => {
    setActiveTab(id);
    const main = document.querySelector(".tds-preview__main");
    if (main) main.scrollTop = 0;
  };

  const pageDesc = isComponentDocPage(page.id)
    ? getComponentPageDescription(page.id, page.label)
    : section.desc;
  const alternativeNames = isComponentDocPage(page.id)
    ? getComponentAlternativeNames(page.id)
    : [];

  const hasTemplate = isComponentDocPage(page.id) || showcases.length > 0;

  useEffect(() => {
    if (!active) return;
    setActiveTab(defaultTab);
  }, [active, pageKey, defaultTab]);

  const demoContentKey = `${activeTab}:${showcases.length}:${designShowcases.length}`;
  usePanelDemoInteractions(pageKey, active, demoContentKey);

  const sectionNav = (
    <>
      <div className="tds-preview__doc-tabs-wrap">
        <div className="tds-tabs tds-tabs--scrollable tds-preview__doc-tabs">
          <div className="tds-tabs__row">
            <div className="tds-tabs__list" role="tablist" aria-label="Page sections">
              {PRIMARY_DOC_TABS.map((tab) => (
                <DocTabItem key={tab.id} tab={tab} activeTab={activeTab} onSelect={selectTab} />
              ))}
              <span className="tds-preview__doc-tabs-separator" aria-hidden="true" />
              {DEVELOPER_DOC_TABS.map((tab) => (
                <DocTabItem key={tab.id} tab={tab} activeTab={activeTab} onSelect={selectTab} />
              ))}
            </div>
          </div>
          <div className="tds-tabs__divider" aria-hidden="true" />
        </div>
      </div>
    </>
  );

  const renderSectionBody = (tabId: DocTabId) => {
    switch (tabId) {
      case "overview": {
        if (isComponentDocPage(page.id)) {
          return renderComponentContentGuidelines(page.id);
        }

        return buckets.overview.length > 0 ? (
          <div className="tds-preview__demos">
            {buckets.overview.map((s) => (
              <ShowcaseBlock key={s.slug} showcase={s} />
            ))}
          </div>
        ) : (
          <div className="tds-preview__section-card">
            <p className="tds-preview__template-lead">{pageDesc}</p>
            {designShowcases.length > 0 && (
              <p className="tds-preview__template-empty">
                See the <strong>Design</strong> tab for live demos and variants.
              </p>
            )}
          </div>
        );
      }
      case "variants": {
        const anatomy =
          isComponentDocPage(page.id) && hasComponentAnatomy(page.id)
            ? renderComponentAnatomy(page.id)
            : null;

        return (
          <div className="tds-preview__demos">
            {anatomy}
            {designShowcases.length > 0 ? (
              designShowcases.map((s) => <ShowcaseBlock key={s.slug} showcase={s} />)
            ) : (
              !anatomy && (
                <p className="tds-preview__template-empty">No design showcases extracted yet.</p>
              )
            )}
          </div>
        );
      }
      case "props":
        return (
          <div className="tds-preview__section-card">
            <PropsTable showcases={showcases} />
          </div>
        );
      case "a11y": {
        if (isComponentDocPage(page.id)) {
          return (
            <div className="tds-preview__section-card">
              {renderComponentContentA11y(page.id)}
            </div>
          );
        }

        return buckets.a11y.length > 0 ? (
          <div className="tds-preview__demos">
            {buckets.a11y.map((s) => (
              <ShowcaseBlock key={s.slug} showcase={s} />
            ))}
          </div>
        ) : (
          <div className="tds-preview__section-card">
            <A11ySection pageLabel={page.label} />
          </div>
        );
      }
      case "changelog":
        return (
          <div className="tds-preview__section-card">
            <p className="tds-preview__template-empty">
              Change log entries for {page.label} will appear here as components ship updates.
            </p>
          </div>
        );
      case "code": {
        if (isComponentDocPage(page.id)) {
          return renderComponentContentCode(page.id, {
            basePath: pageToPath("components", page.id),
          });
        }

        return (
          <>
            <p className="tds-preview__template-lead">
              Copy markup from the demos below. Each block mirrors the HTML in{" "}
              <code>pages/preview/index.html</code>.
            </p>
            <div className="tds-preview__demos">
              {buckets.code.length > 0
                ? buckets.code.map((s) => <ShowcaseBlock key={s.slug} showcase={s} />)
                : designShowcases.slice(0, 2).map((s) => (
                    <ShowcaseBlock key={s.slug} showcase={s} />
                  ))}
            </div>
          </>
        );
      }
      default:
        return null;
    }
  };

  const rawHtml = section.html.replace(/\.\.\/\.\.\/assets\//g, "/assets/");

  return (
    <div
      className={`tds-preview__panel${active ? " is-active" : ""}`}
      role="tabpanel"
      id={pageKey}
      hidden={!active}
    >
      <ChapterHeader
        title={page.label}
        desc={pageDesc}
        alternativeNames={alternativeNames}
        eyebrow={
          page.section === "foundations"
            ? "Foundation"
            : isComponentDocPage(page.id)
              ? findTrackerComponent(page.id)?.category ?? "Component"
              : "Component family"
        }
      />

      {hasTemplate ? (
        <>
          {sectionNav}

          <div className="tds-preview__template-panels">
            {DOC_TABS.map((tab) => (
              <section
                key={tab.id}
                className="tds-preview__template-panel"
                id={`${pageKey}-${tab.id}`}
                role="tabpanel"
                hidden={activeTab !== tab.id}
              >
                {activeTab === tab.id && renderSectionBody(tab.id)}
              </section>
            ))}
          </div>
        </>
      ) : (
        <div className="tds-preview__demos" dangerouslySetInnerHTML={{ __html: rawHtml }} />
      )}
    </div>
  );
}

export function resolvePreviewSection(page: NavPage, sections: PreviewSection[]): PreviewSection | undefined {
  const chapterId = isComponentDocPage(page.id) ? chapterIdForComponent(page.id) : page.id;
  return sections.find((s) => s.id === chapterId);
}
