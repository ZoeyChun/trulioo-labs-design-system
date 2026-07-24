import { useCallback } from 'react';
import type { Node, NodeMouseHandler } from '@xyflow/react';
import { useGraphStore } from '../../../store/graphStore';
import type { GraphNodeData } from '../../../types/graph';

export function useGraphInteractions() {
  const selectNode = useGraphStore((s) => s.selectNode);
  const clearSelection = useGraphStore((s) => s.clearSelection);
  const hoverNode = useGraphStore((s) => s.hoverNode);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      selectNode(node.id, node.data as GraphNodeData);
    },
    [selectNode],
  );

  const onNodeMouseEnter: NodeMouseHandler = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      hoverNode(node.id);
    },
    [hoverNode],
  );

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    hoverNode(null);
  }, [hoverNode]);

  const onPaneClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  const onNodeDoubleClick: NodeMouseHandler = useCallback(
    (_event: React.MouseEvent, _node: Node) => {
      // Future: expand connected entities
    },
    [],
  );

  return {
    onNodeClick,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onPaneClick,
    onNodeDoubleClick,
  };
}
