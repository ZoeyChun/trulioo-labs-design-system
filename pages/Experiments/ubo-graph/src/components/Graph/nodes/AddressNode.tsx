import type { NodeProps } from '@xyflow/react';
import { MapPin } from 'lucide-react';
import { useGraphStore } from '../../../store/graphStore';
import type { GraphNodeData } from '../../../types/graph';
import { NodeHandles } from './NodeHandles';

export function AddressNode({ id, data }: NodeProps) {
  const nodeData = data as GraphNodeData;

  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const hoveredNodeId = useGraphStore((s) => s.hoveredNodeId);
  const highlightedNodeIds = useGraphStore((s) => s.highlightedNodeIds);

  const hasActiveSelection = selectedNodeId !== null || hoveredNodeId !== null;
  const isHighlighted = highlightedNodeIds.has(id);
  const isSelected = selectedNodeId === id;
  const isDimmed = hasActiveSelection && !isHighlighted;

  return (
    <div
      className={`flex flex-col items-center transition-all duration-300 ${isDimmed ? 'opacity-25' : 'opacity-100'}`}
    >
      <div
        className={`
          node-card relative flex items-center justify-center
          w-[44px] h-[44px] rotate-45 rounded-md
          transition-all duration-300 cursor-pointer
          ${isSelected ? 'ring-2 ring-accent/30 ring-offset-2 ring-offset-surface' : ''}
          ${!isDimmed ? 'hover:border-border-default' : ''}
        `}
      >
        <NodeHandles />
        <MapPin className="w-4 h-4 text-node-icon-muted -rotate-45 pointer-events-none" strokeWidth={1.5} />
      </div>
      <span className="mt-3.5 text-[10px] text-text-muted max-w-[90px] text-center leading-tight pointer-events-none">
        {nodeData.label}
      </span>
    </div>
  );
}
