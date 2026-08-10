import { useCallback, useState } from "react";

const SIDEBAR_KEY = "tds-preview-sidebar-open";

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
  const [sidebarOpen, setSidebarOpenState] = useState(() => {
    const stored = readSidebarOpen();
    return stored ?? initialSidebarOpen;
  });

  const setSidebarOpen = useCallback((open: boolean | ((prev: boolean) => boolean)) => {
    setSidebarOpenState((prev) => {
      const next = typeof open === "function" ? open(prev) : open;
      localStorage.setItem(SIDEBAR_KEY, String(next));
      return next;
    });
  }, []);

  return {
    sidebarOpen,
    setSidebarOpen,
  };
}
