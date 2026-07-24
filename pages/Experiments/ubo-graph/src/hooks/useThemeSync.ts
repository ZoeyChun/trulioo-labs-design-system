import { useEffect } from 'react';
import { applyTheme, useThemeStore } from '../store/themeStore';

export function useThemeSync() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
}
