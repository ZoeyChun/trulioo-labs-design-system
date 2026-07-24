import { useCallback, useEffect, useRef, useState } from "react";
import { PREVIEW_SECTIONS } from "./data/sections";
import {
  findPage,
  HERO_FEATURES,
  isContentPage,
  pageToPath,
  parseRouteFromHash,
  resolveLegacyRedirect,
  type AppRoute,
  type NavSectionId,
  type PageId,
} from "./data/navigation";
import { IconSprite } from "./components/IconSprite";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Hero } from "./components/Hero";
import { ComponentPage } from "./components/ComponentPage";
import { GettingStartedPanel } from "./components/GettingStartedPanel";
import { TrackerPanel } from "./components/tracker/TrackerPanel";
import { GlobalSearch, useGlobalSearchShortcut } from "./components/GlobalSearch";
import { usePreviewInteractions } from "./hooks/usePreviewInteractions";
import { useNavPersistence } from "./hooks/useNavPersistence";

function navigateToPath(path: string) {
  if (window.location.hash !== path) {
    history.replaceState(null, "", path);
  }
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(parseRouteFromHash);
  const [searchOpen, setSearchOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const isHome = route.type === "home";

  const { expandedSections, toggleSection, sidebarOpen, setSidebarOpen } =
    useNavPersistence(!isHome);

  useEffect(() => {
    const redirect = resolveLegacyRedirect();
    if (redirect) navigateToPath(redirect);
  }, []);

  const activatePage = useCallback(
    (section: NavSectionId, pageId: PageId, { scrollTop = true } = {}) => {
      setRoute({ type: "page", section, pageId });
      navigateToPath(pageToPath(section, pageId));
      if (scrollTop) {
        mainRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        window.scrollTo(0, 0);
      }
    },
    []
  );

  const goHome = useCallback(({ scrollTop = true } = {}) => {
    setRoute({ type: "home" });
    const base = window.location.pathname + window.location.search;
    if (window.location.hash) {
      history.replaceState(null, "", base);
    }
    if (scrollTop) {
      mainRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      window.scrollTo(0, 0);
    }
  }, []);

  const handleSearchNavigate = useCallback((path: string) => {
    navigateToPath(path);
    setRoute(parseRouteFromHash());
    setSearchOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const openSearch = useCallback(() => {
    if (route.type === "home") {
      document.querySelector<HTMLInputElement>(".tds-preview__hero-search-input")?.focus();
    } else {
      setSearchOpen(true);
    }
  }, [route.type]);
  useGlobalSearchShortcut(openSearch);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRouteFromHash());
      mainRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const contentTab =
    route.type === "page" && isContentPage(route.pageId) ? route.pageId : null;
  usePreviewInteractions(contentTab);

  return (
    <div
      className={`tds-preview${isHome ? " tds-preview--home" : " tds-preview--docs"}${sidebarOpen ? "" : " tds-preview--sidebar-closed"}`}
    >
      <IconSprite />

      <Sidebar
        route={route}
        isOpen={sidebarOpen}
        expandedSections={expandedSections}
        onSelectPage={activatePage}
        onHome={goHome}
        onToggle={() => setSidebarOpen((open) => !open)}
        onToggleSection={toggleSection}
      />

      <div className="tds-preview__shell">
        <div className="tds-preview__workspace">
          <TopBar
            route={route}
            sidebarOpen={sidebarOpen}
            onHome={goHome}
            onToggleSidebar={() => setSidebarOpen((open) => !open)}
            onOpenSearch={openSearch}
          />

          <main className="tds-preview__main" ref={mainRef}>
            <div className="tds-preview__content">
              {isHome && (
                <Hero
                  features={HERO_FEATURES}
                  onExplore={() => activatePage("components", "buttons")}
                  onSearchNavigate={handleSearchNavigate}
                  searchOpen={searchOpen}
                  onSearchOpen={openSearch}
                  onSearchClose={() => setSearchOpen(false)}
                />
              )}

              <div className="tds-preview__panels" aria-hidden={isHome}>
                {route.type === "page" && route.pageId === "overview" && (
                  <GettingStartedPanel pageId="overview" active onExplore={() => activatePage("components", "buttons")} />
                )}
                {route.type === "page" && route.pageId === "migration" && (
                  <GettingStartedPanel pageId="migration" active onExplore={() => activatePage("components", "buttons")} />
                )}
                {route.type === "page" && route.pageId === "tracker" && <TrackerPanel />}

                {PREVIEW_SECTIONS.map((section) => {
                  if (!isContentPage(section.id as PageId)) return null;
                  const page = findPage(section.id as PageId);
                  if (!page) return null;
                  const active = route.type === "page" && route.pageId === section.id;
                  return (
                    <ComponentPage
                      key={section.id}
                      section={section}
                      page={page}
                      active={active}
                    />
                  );
                })}
              </div>
            </div>

            <footer className="tds-preview__footer">
              <span>Trulioo Design System · Docs preview</span>
              {!isHome && (
                <>
                  <a href="../index.html" className="tds-preview__footer-link">Classic preview</a>
                  <a href="../react-dist/index.html" className="tds-preview__footer-link">Component preview</a>
                </>
              )}
            </footer>
          </main>
        </div>
      </div>

      <GlobalSearch
        variant="modal"
        open={searchOpen && !isHome}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleSearchNavigate}
      />
    </div>
  );
}
