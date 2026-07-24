import type { Theme } from '../store/themeStore';
import type { GraphNode } from '../types/graph';

export const graphThemeConfig = {
  dark: {
    dotColor: 'rgba(255, 255, 255, 0.14)',
    canvasBg: '#09090b',
    minimapMask: 'rgba(9, 9, 11, 0.85)',
    minimapStroke: 'rgba(255, 255, 255, 0.08)',
    glowGradient: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99, 102, 241, 0.08), transparent)',
    nodeColors: {
      company: '#27272a',
      individual: '#312e81',
      address: '#3f3f46',
      document: '#27272a',
      default: '#3f3f46',
    } satisfies Record<string, string>,
  },
  light: {
    dotColor: 'rgba(0, 0, 0, 0.14)',
    canvasBg: '#f4f4f5',
    minimapMask: 'rgba(244, 244, 245, 0.9)',
    minimapStroke: 'rgba(0, 0, 0, 0.08)',
    glowGradient: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99, 102, 241, 0.06), transparent)',
    nodeColors: {
      company: '#e4e4e7',
      individual: '#e0e7ff',
      address: '#d4d4d8',
      document: '#e4e4e7',
      default: '#d4d4d8',
    } satisfies Record<string, string>,
  },
} as const;

export function getMinimapNodeColor(theme: Theme, node: GraphNode): string {
  const colors = graphThemeConfig[theme].nodeColors;
  const type = node.type ?? 'default';
  if (type in colors) {
    return colors[type as keyof typeof colors];
  }
  return colors.default;
}
