import { useEffect, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import type { NodeTypes, EdgeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CompanyNode } from './nodes/CompanyNode';
import { IndividualNode } from './nodes/IndividualNode';
import { AddressNode } from './nodes/AddressNode';
import { DocumentNode } from './nodes/DocumentNode';

import { OwnershipEdge } from './edges/OwnershipEdge';
import { DirectorEdge } from './edges/DirectorEdge';
import { SharedAddressEdge } from './edges/SharedAddressEdge';
import { RiskEdge } from './edges/RiskEdge';

import { GraphControls } from './GraphControls';
import { GraphLegend } from './GraphLegend';
import { GraphToolbar } from './GraphToolbar';
import { useGraphInteractions } from './hooks/useGraphInteractions';
import { useGraphStore } from '../../store/graphStore';
import { useThemeStore } from '../../store/themeStore';
import { graphThemeConfig, getMinimapNodeColor } from '../../lib/graphTheme';
import { buildGraphFromPreset } from '../../lib/buildGraphDataset';
import { DEFAULT_COMPLEXITY_PRESET } from '../../data/graphPresets';
import type { GraphNode, GraphEdge } from '../../types/graph';

const { nodes: defaultNodes, edges: defaultEdges } = buildGraphFromPreset(DEFAULT_COMPLEXITY_PRESET);

const nodeTypes: NodeTypes = {
  company: CompanyNode,
  individual: IndividualNode,
  address: AddressNode,
  document: DocumentNode,
};

const edgeTypes: EdgeTypes = {
  ownership: OwnershipEdge,
  director: DirectorEdge,
  'shared-address': SharedAddressEdge,
  risk: RiskEdge,
};

const minimapNodeColor = (theme: 'light' | 'dark', node: GraphNode) =>
  getMinimapNodeColor(theme, node);

function GraphCanvas() {
  const complexityPreset = useGraphStore((s) => s.complexityPreset);
  const initializeGraph = useGraphStore((s) => s.initializeGraph);
  const filters = useGraphStore((s) => s.filters);
  const theme = useThemeStore((s) => s.theme);
  const graphTheme = graphThemeConfig[theme];
  const { fitView } = useReactFlow();

  const dataset = useMemo(
    () => buildGraphFromPreset(complexityPreset),
    [complexityPreset],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  const {
    onNodeClick,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onPaneClick,
    onNodeDoubleClick,
  } = useGraphInteractions();

  useEffect(() => {
    setNodes(dataset.nodes);
    setEdges(dataset.edges);
    initializeGraph(dataset.edges as GraphEdge[]);
    const timer = window.setTimeout(() => {
      fitView({ padding: 0.2, duration: 400 });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [dataset, setNodes, setEdges, initializeGraph, fitView]);

  const filteredNodes = useMemo(() => {
    return nodes.filter((node) => {
      switch (node.type) {
        case 'company': return filters.showCompanies;
        case 'individual': return filters.showIndividuals;
        case 'address': return filters.showAddresses;
        case 'document': return filters.showDocuments;
        default: return true;
      }
    });
  }, [nodes, filters]);

  const visibleNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return edges.filter(
      (edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target),
    );
  }, [edges, visibleNodeIds]);

  const handleMinimapNodeColor = useCallback(
    (node: GraphNode) => minimapNodeColor(theme, node),
    [theme],
  );

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={filteredNodes}
        edges={filteredEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onPaneClick={onPaneClick}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.15}
        maxZoom={2}
        nodesDraggable
        nodesConnectable={false}
        elevateEdgesOnSelect
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ animated: false }}
        className="graph-canvas"
      >
        <Background
          id="graph-dots"
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          color={graphTheme.dotColor}
          bgColor={graphTheme.canvasBg}
        />
        <MiniMap
          nodeColor={handleMinimapNodeColor}
          maskColor={graphTheme.minimapMask}
          nodeStrokeColor={graphTheme.minimapStroke}
          nodeBorderRadius={4}
          position="bottom-right"
          pannable
          zoomable
          style={{ width: 140, height: 100 }}
        />
      </ReactFlow>
      <GraphToolbar />
      <GraphControls />
      <GraphLegend />
    </div>
  );
}

export function RelationshipGraph() {
  return (
    <ReactFlowProvider>
      <GraphCanvas />
    </ReactFlowProvider>
  );
}
