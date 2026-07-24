import { mockNodes, mockEdges } from '../data/mockGraph';
import { getPresetById } from '../data/graphPresets';
import { applyGraphLayout, assignEdgeHandles } from './graphLayout';
import type { ComplexityPresetId, GraphEdge, GraphNode } from '../types/graph';

export function buildGraphFromPreset(presetId: ComplexityPresetId): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const preset = getPresetById(presetId);

  const nodeIdSet =
    preset.id === 'full'
      ? new Set(mockNodes.map((n) => n.id))
      : new Set(preset.nodeIds);

  const nodes = mockNodes.filter((n) => nodeIdSet.has(n.id));
  const edges = mockEdges.filter(
    (e) => nodeIdSet.has(e.source) && nodeIdSet.has(e.target),
  ) as GraphEdge[];

  const layoutedNodes = applyGraphLayout(nodes);
  const layoutedEdges = assignEdgeHandles(layoutedNodes, edges);

  return { nodes: layoutedNodes, edges: layoutedEdges };
}
