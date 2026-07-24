import type { Theme } from './themeStore';

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  try {
    const stored = localStorage.getItem('ubo-graph-theme');
    if (stored) {
      const parsed = JSON.parse(stored) as { state?: { theme?: Theme } };
      if (parsed.state?.theme === 'light' || parsed.state?.theme === 'dark') {
        return parsed.state.theme;
      }
    }
  } catch {
    // ignore
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
