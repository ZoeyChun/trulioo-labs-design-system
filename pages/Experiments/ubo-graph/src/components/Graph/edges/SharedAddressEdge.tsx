import { getStraightPath, BaseEdge } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';
import { useGraphStore } from '../../../store/graphStore';

export function SharedAddressEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const highlightedEdgeIds = useGraphStore((s) => s.highlightedEdgeIds);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const hoveredNodeId = useGraphStore((s) => s.hoveredNodeId);

  const hasActiveSelection = selectedNodeId !== null || hoveredNodeId !== null;
  const isHighlighted = highlightedEdgeIds.has(id);
  const isDimmed = hasActiveSelection && !isHighlighted;

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: 'var(--color-edge-shared)',
        strokeWidth: isHighlighted ? 1.5 : 0.75,
        strokeDasharray: '3 3',
        opacity: isDimmed ? 0.08 : 0.4,
        transition: 'all 300ms ease',
      }}
    />
  );
}
