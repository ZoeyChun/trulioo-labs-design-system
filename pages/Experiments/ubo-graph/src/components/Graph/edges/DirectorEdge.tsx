import { getStraightPath, BaseEdge } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';
import { useGraphStore } from '../../../store/graphStore';

export function DirectorEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
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
      markerEnd={markerEnd}
      style={{
        stroke: 'var(--color-edge-director)',
        strokeWidth: isHighlighted ? 2 : 1,
        strokeDasharray: '6 4',
        opacity: isDimmed ? 0.1 : 0.55,
        transition: 'all 300ms ease',
      }}
    />
  );
}
