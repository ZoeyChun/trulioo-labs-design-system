import { useCallback, useEffect, useRef, useState } from "react";
import { PREVIEW_SECTIONS } from "./data/sections";
import { HERO_FEATURES, NAV_ITEMS, TAB_IDS, type TabId } from "./data/navigation";
import { IconSprite } from "./components/IconSprite";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Hero } from "./components/Hero";
import { ContentPanel } from "./components/ContentPanel";
import { TrackerPanel } from "./components/tracker/TrackerPanel";
import { usePreviewInteractions } from "./hooks/usePreviewInteractions";

function tabFromHash(): TabId | null {
  const hash = window.location.hash.replace("#", "");
  if (!hash || hash === "home") return null;
  return TAB_IDS.includes(hash as TabId) ? (hash as TabId) : null;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId | null>(tabFromHash);
  const [sidebarOpen, setSidebarOpen] = useState(() => tabFromHash() !== null);
  const mainRef = useRef<HTMLElement>(null);
  const isHome = activeTab === null;

  const activeLabel =
    NAV_ITEMS.find((item) => item.id === activeTab)?.label ?? "Overview";

  const activateTab = useCallback(
    (id: TabId, { updateHash = true, scrollTop = true } = {}) => {
      setActiveTab(id);

      if (updateHash && window.location.hash !== `#${id}`) {
        history.replaceState(null, "", `#${id}`);
      }

      if (scrollTop) {
        mainRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        window.scrollTo(0, 0);
      }
    },
    []
  );

  const goHome = useCallback(
    ({ updateHash = true, scrollTop = true } = {}) => {
      setActiveTab(null);

      if (updateHash && window.location.hash !== "" && window.location.hash !== "#home") {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      if (scrollTop) {
        mainRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        window.scrollTo(0, 0);
      }
    },
    []
  );

  useEffect(() => {
    const onHashChange = () => {
      const id = tabFromHash();
      setActiveTab(id);
      mainRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  usePreviewInteractions();

  return (
    <div
      className={`tds-preview${isHome ? " tds-preview--home" : " tds-preview--docs"}${sidebarOpen ? "" : " tds-preview--sidebar-closed"}`}
    >
      <IconSprite />

      <Sidebar
        activeTab={activeTab}
        isHome={isHome}
        isOpen={sidebarOpen}
        onSelect={activateTab}
        onHome={goHome}
        onToggle={() => setSidebarOpen((open) => !open)}
      />

      <div className="tds-preview__shell">
        <div className="tds-preview__workspace">
          <TopBar
            activeLabel={activeLabel}
            activeTab={activeTab}
            isHome={isHome}
            sidebarOpen={sidebarOpen}
            onSelect={activateTab}
            onHome={goHome}
            onToggleSidebar={() => setSidebarOpen((open) => !open)}
          />

          <main className="tds-preview__main" ref={mainRef}>
            <div className="tds-preview__content">
              {isHome && (
                <Hero
                  features={HERO_FEATURES}
                  onExplore={() => activateTab("buttons")}
                />
              )}

              <div className="tds-preview__panels" aria-hidden={isHome}>
                {PREVIEW_SECTIONS.map((section) => (
                  <ContentPanel
                    key={section.id}
                    section={section}
                    active={!isHome && section.id === activeTab}
                  />
                ))}

                {!isHome && activeTab === "tracker" && <TrackerPanel />}
              </div>
            </div>

            <footer className="tds-preview__footer">
              <span>Trulioo Design System · ADS 2026</span>
              {!isHome && (
                <a href="../index.html" className="tds-preview__footer-link">
                  Classic preview
                </a>
              )}
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
