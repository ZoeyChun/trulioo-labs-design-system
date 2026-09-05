import { useCallback, useEffect, useRef, useState } from "react";
import { PREVIEW_SECTIONS } from "./data/sections";
import { chapterIdForComponent } from "./data/component-chapters";
import { CONTENT_PAGES } from "./data/content-pages";
import {
  findPage,
  HERO_QUICK_LINKS,
  isComponentDocPage,
  isContentGuidelinePage,
  isLockedRoute,
  isNavPageLocked,
  isPreviewDemoPage,
  pageToPath,
  parseHashWithAnchor,
  parseRouteFromHash,
  parseRouteFromPath,
  resolveLegacyRedirect,
  resolveLockedRouteRedirect,
  type AppRoute,
  type NavSectionId,
} from "./data/navigation";
import { isMobileLayout, scrollToAnchor } from "./utils/platform";
import { IconSprite } from "./components/IconSprite";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Hero } from "./components/Hero";
import { ComponentPage, resolvePreviewSection } from "./components/ComponentPage";
import { ContentGuidelinePage } from "./components/ContentGuidelinePage";
import { GettingStartedPanel } from "./components/GettingStartedPanel";
import { TrackerPanel } from "./components/tracker/TrackerPanel";
import { GlobalSearch, useGlobalSearchShortcut } from "./components/GlobalSearch";
import { usePreviewInteractions } from "./hooks/usePreviewInteractions";
import { useNavPersistence } from "./hooks/useNavPersistence";

function navigateToPath(path: string) {
  const { routePath, anchor } = parseHashWithAnchor(path);
  const hash = anchor ? `${routePath}#${anchor}` : routePath;
  const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (currentUrl !== nextUrl) {
    history.replaceState(null, "", nextUrl);
  }
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(parseRouteFromHash);
  const [searchOpen, setSearchOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const isHome = route.type === "home";

  const { sidebarOpen, setSidebarOpen } = useNavPersistence(false);
  const [sidebarHover, setSidebarHover] = useState(false);
  const sidebarExpanded = sidebarOpen || sidebarHover;

  const expandSidebar = useCallback(() => {
    setSidebarHover(false);
    setSidebarOpen(true);
  }, [setSidebarOpen]);

  const collapseSidebar = useCallback(() => {
    setSidebarHover(false);
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  const toggleSidebar = useCallback(() => {
    setSidebarHover(false);
    setSidebarOpen((open) => !open);
  }, [setSidebarOpen]);

  useEffect(() => {
    const redirect = resolveLegacyRedirect();
    if (redirect) navigateToPath(redirect);
  }, []);

  useEffect(() => {
    const redirect = resolveLockedRouteRedirect(parseRouteFromHash());
    if (redirect) navigateToPath(redirect);
  }, []);

  useEffect(() => {
    const { anchor } = parseHashWithAnchor(window.location.hash);
    if (anchor) {
      scrollToAnchor(mainRef.current, anchor);
    }
  }, []);

  const activatePage = useCallback(
    (section: NavSectionId, pageId: string, { scrollTop = true } = {}) => {
      const page = findPage(pageId);
      if (page && isNavPageLocked(page)) return;

      setRoute({ type: "page", section, pageId });
      navigateToPath(pageToPath(section, pageId));
      if (scrollTop) {
        scrollToAnchor(mainRef.current);
      }
      if (isMobileLayout()) {
        setSidebarOpen(false);
      }
    },
    [setSidebarOpen]
  );

  const goHome = useCallback(
    ({ scrollTop = true } = {}) => {
      setRoute({ type: "home" });
      const base = window.location.pathname + window.location.search;
      if (window.location.hash) {
        history.replaceState(null, "", base);
      }
      if (scrollTop) {
        scrollToAnchor(mainRef.current);
      }
      if (isMobileLayout()) {
        setSidebarOpen(false);
      }
    },
    [setSidebarOpen]
  );

  const handleSearchNavigate = useCallback(
    (path: string) => {
      const { routePath, anchor } = parseHashWithAnchor(path);
      const nextRoute = parseRouteFromPath(routePath);
      if (isLockedRoute(nextRoute)) return;

      navigateToPath(path);
      setRoute(nextRoute);
      setSearchOpen(false);
      scrollToAnchor(mainRef.current, anchor);
      if (isMobileLayout()) {
        setSidebarOpen(false);
      }
    },
    [setSidebarOpen]
  );

  const openSearch = useCallback((options?: { select?: boolean }) => {
    if (route.type === "home") {
      const input = document.querySelector<HTMLInputElement>(".tds-preview__hero-search-input");
      input?.scrollIntoView({ block: "center" });
      input?.focus();
      if (options?.select) {
        input?.select();
      }
    } else {
      setSearchOpen(true);
    }
  }, [route.type]);
  useGlobalSearchShortcut(() => openSearch({ select: true }));

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = parseRouteFromHash();
      const lockedRedirect = resolveLockedRouteRedirect(nextRoute);
      if (lockedRedirect) {
        navigateToPath(lockedRedirect);
        return;
      }

      const { anchor } = parseHashWithAnchor(window.location.hash);
      setRoute(nextRoute);
      scrollToAnchor(mainRef.current, anchor);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const interactionChapter =
    route.type === "page" && isPreviewDemoPage(route.pageId)
      ? isComponentDocPage(route.pageId)
        ? chapterIdForComponent(route.pageId)
        : route.pageId
      : null;
  usePreviewInteractions(interactionChapter);

  return (
    <div
      className={`tds-preview${isHome ? " tds-preview--home" : " tds-preview--docs"}${sidebarExpanded ? "" : " tds-preview--sidebar-closed"}${sidebarHover && !sidebarOpen ? " tds-preview--sidebar-hover" : ""}`}
    >
      <IconSprite />

      <Sidebar
        route={route}
        isOpen={sidebarOpen}
        isExpanded={sidebarExpanded}
        onSelectPage={activatePage}
        onHome={goHome}
        onToggle={toggleSidebar}
        onExpand={expandSidebar}
        onHoverStart={() => {
          if (!sidebarOpen) setSidebarHover(true);
        }}
        onHoverEnd={() => setSidebarHover(false)}
      />

      {sidebarOpen && (
        <button
          type="button"
          className="tds-preview__sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => collapseSidebar()}
        />
      )}

      <div className="tds-preview__shell">
        <div className="tds-preview__workspace">
          <TopBar
            route={route}
            mainRef={mainRef}
            sidebarOpen={sidebarExpanded}
            onToggleSidebar={toggleSidebar}
            onOpenSearch={openSearch}
          />

          <main className="tds-preview__main" ref={mainRef}>
            <div className="tds-preview__content">
              {isHome && (
                <Hero
                  quickLinks={HERO_QUICK_LINKS}
                  onExplore={() => activatePage("components", "button")}
                  onNavigate={handleSearchNavigate}
                  searchOpen={searchOpen}
                  onSearchOpen={openSearch}
                  onSearchClose={() => setSearchOpen(false)}
                />
              )}

              <div className="tds-preview__panels" aria-hidden={isHome}>
                {route.type === "page" && route.pageId === "overview" && (
                  <GettingStartedPanel
                    active
                    onExplore={() => activatePage("components", "button")}
                  />
                )}
                {route.type === "page" && route.pageId === "tracker" && <TrackerPanel />}

                {route.type === "page" &&
                  isContentGuidelinePage(route.pageId) &&
                  !isLockedRoute(route) &&
                  CONTENT_PAGES.map((contentPage) => (
                    <ContentGuidelinePage
                      key={contentPage.id}
                      pageId={contentPage.id}
                      active={route.pageId === contentPage.id}
                    />
                  ))}

                {route.type === "page" &&
                  isPreviewDemoPage(route.pageId) &&
                  (() => {
                    const page = findPage(route.pageId);
                    const section = page ? resolvePreviewSection(page, PREVIEW_SECTIONS) : undefined;
                    if (!page || !section) return null;
                    return (
                      <ComponentPage
                        key={page.id}
                        section={section}
                        page={page}
                        active
                      />
                    );
                  })()}
              </div>
            </div>

            <footer className="tds-preview__footer">
              <span>Trulioo Design System · Docs preview</span>
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
