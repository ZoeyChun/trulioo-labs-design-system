import { create } from 'zustand';
import { DEFAULT_COMPLEXITY_PRESET } from '../data/graphPresets';
import type { GraphStore, GraphEdge, GraphNodeData, ComplexityPresetId } from '../types/graph';

function buildAdjacency(edges: GraphEdge[]) {
  const adjacencyMap = new Map<string, Set<string>>();
  const edgeIndex = new Map<string, Set<string>>();

  for (const edge of edges) {
    if (!adjacencyMap.has(edge.source)) adjacencyMap.set(edge.source, new Set());
    if (!adjacencyMap.has(edge.target)) adjacencyMap.set(edge.target, new Set());
    adjacencyMap.get(edge.source)!.add(edge.target);
    adjacencyMap.get(edge.target)!.add(edge.source);

    if (!edgeIndex.has(edge.source)) edgeIndex.set(edge.source, new Set());
    if (!edgeIndex.has(edge.target)) edgeIndex.set(edge.target, new Set());
    edgeIndex.get(edge.source)!.add(edge.id);
    edgeIndex.get(edge.target)!.add(edge.id);
  }

  return { adjacencyMap, edgeIndex };
}

function computeHighlights(
  nodeId: string | null,
  adjacencyMap: Map<string, Set<string>>,
  edgeIndex: Map<string, Set<string>>,
) {
  if (!nodeId) {
    return {
      highlightedNodeIds: new Set<string>(),
      highlightedEdgeIds: new Set<string>(),
    };
  }

  const connectedNodes = adjacencyMap.get(nodeId) ?? new Set<string>();
  const connectedEdges = edgeIndex.get(nodeId) ?? new Set<string>();

  return {
    highlightedNodeIds: new Set([nodeId, ...connectedNodes]),
    highlightedEdgeIds: new Set(connectedEdges),
  };
}

export const useGraphStore = create<GraphStore>((set, get) => ({
  selectedNodeId: null,
  selectedNodeData: null,
  hoveredNodeId: null,
  highlightedNodeIds: new Set<string>(),
  highlightedEdgeIds: new Set<string>(),
  drawerOpen: false,
  filters: {
    showCompanies: true,
    showIndividuals: true,
    showAddresses: true,
    showDocuments: true,
    riskLevels: ['low', 'medium', 'high', 'critical'],
  },
  layoutMode: 'force',
  complexityPreset: DEFAULT_COMPLEXITY_PRESET,
  adjacencyMap: new Map(),
  edgeIndex: new Map(),

  initializeGraph: (edges) => {
    const { adjacencyMap, edgeIndex } = buildAdjacency(edges);
    set({ adjacencyMap, edgeIndex });
  },

  selectNode: (nodeId, nodeData) => {
    const state = get();
    if (state.selectedNodeId === nodeId) {
      set({
        selectedNodeId: null,
        selectedNodeData: null,
        drawerOpen: false,
        ...computeHighlights(null, state.adjacencyMap, state.edgeIndex),
      });
      return;
    }

    set({
      selectedNodeId: nodeId,
      selectedNodeData: nodeData,
      drawerOpen: true,
      hoveredNodeId: null,
      ...computeHighlights(nodeId, state.adjacencyMap, state.edgeIndex),
    });
  },

  clearSelection: () => {
    const state = get();
    set({
      selectedNodeId: null,
      selectedNodeData: null,
      drawerOpen: false,
      hoveredNodeId: null,
      ...computeHighlights(null, state.adjacencyMap, state.edgeIndex),
    });
  },

  hoverNode: (nodeId) => {
    const state = get();
    const activeId = nodeId ?? state.selectedNodeId;

    set({
      hoveredNodeId: nodeId,
      ...computeHighlights(activeId, state.adjacencyMap, state.edgeIndex),
    });
  },

  toggleDrawer: (open) => {
    set((state) => ({ drawerOpen: open ?? !state.drawerOpen }));
  },

  setFilters: (filters) => {
    set((state) => ({ filters: { ...state.filters, ...filters } }));
  },

  setLayoutMode: (mode) => {
    set({ layoutMode: mode });
  },

  setComplexityPreset: (preset: ComplexityPresetId) => {
    const state = get();
    set({
      complexityPreset: preset,
      selectedNodeId: null,
      selectedNodeData: null,
      drawerOpen: false,
      hoveredNodeId: null,
      ...computeHighlights(null, state.adjacencyMap, state.edgeIndex),
    });
  },
}));
