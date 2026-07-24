import { getStraightPath, EdgeLabelRenderer, BaseEdge } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';
import { useGraphStore } from '../../../store/graphStore';
import type { GraphEdgeData } from '../../../types/graph';

export function OwnershipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  markerEnd,
}: EdgeProps) {
  const edgeData = data as GraphEdgeData | undefined;
  const highlightedEdgeIds = useGraphStore((s) => s.highlightedEdgeIds);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const hoveredNodeId = useGraphStore((s) => s.hoveredNodeId);

  const hasActiveSelection = selectedNodeId !== null || hoveredNodeId !== null;
  const isHighlighted = highlightedEdgeIds.has(id);
  const isDimmed = hasActiveSelection && !isHighlighted;

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: 'var(--color-edge-ownership)',
          strokeWidth: isHighlighted ? 2.5 : 1.5,
          opacity: isDimmed ? 0.12 : 0.85,
          transition: 'all 300ms ease',
        }}
      />
      {edgeData?.label && !isDimmed && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'none',
            }}
            className="glass-panel text-[9px] font-semibold text-accent px-2 py-0.5 rounded-md"
          >
            {edgeData.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
