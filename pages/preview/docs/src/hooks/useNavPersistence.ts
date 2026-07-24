import { useCallback, useEffect, useState } from "react";
import type { NavSectionId } from "../data/navigation";

const EXPANDED_KEY = "tds-preview-nav-expanded";
const SIDEBAR_KEY = "tds-preview-sidebar-open";

const DEFAULT_EXPANDED: Record<NavSectionId, boolean> = {
  "getting-started": true,
  foundations: true,
  components: true,
};

function readExpanded(): Record<NavSectionId, boolean> {
  try {
    const raw = localStorage.getItem(EXPANDED_KEY);
    if (!raw) return { ...DEFAULT_EXPANDED };
    return { ...DEFAULT_EXPANDED, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_EXPANDED };
  }
}

function readSidebarOpen(): boolean | null {
  try {
    const raw = localStorage.getItem(SIDEBAR_KEY);
    if (raw === null) return null;
    return raw === "true";
  } catch {
    return null;
  }
}

export function useNavPersistence(initialSidebarOpen: boolean) {
  const [expandedSections, setExpandedSections] =
    useState<Record<NavSectionId, boolean>>(readExpanded);
  const [sidebarOpen, setSidebarOpenState] = useState(() => {
    const stored = readSidebarOpen();
    return stored ?? initialSidebarOpen;
  });

  useEffect(() => {
    localStorage.setItem(EXPANDED_KEY, JSON.stringify(expandedSections));
  }, [expandedSections]);

  const setSidebarOpen = useCallback((open: boolean | ((prev: boolean) => boolean)) => {
    setSidebarOpenState((prev) => {
      const next = typeof open === "function" ? open(prev) : open;
      localStorage.setItem(SIDEBAR_KEY, String(next));
      return next;
    });
  }, []);

  const toggleSection = useCallback((sectionId: NavSectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }, []);

  return {
    expandedSections,
    toggleSection,
    sidebarOpen,
    setSidebarOpen,
  };
}
