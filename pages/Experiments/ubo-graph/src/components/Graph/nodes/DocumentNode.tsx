import type { NodeProps } from '@xyflow/react';
import { FileText } from 'lucide-react';
import { useGraphStore } from '../../../store/graphStore';
import type { GraphNodeData, DocumentData } from '../../../types/graph';
import { NodeHandles } from './NodeHandles';

const statusColors: Record<string, string> = {
  verified: 'text-emerald-500',
  pending: 'text-amber-500',
  expired: 'text-red-500',
};

const statusDotColors: Record<string, string> = {
  verified: 'bg-emerald-500',
  pending: 'bg-amber-500',
  expired: 'bg-red-500',
};

export function DocumentNode({ id, data }: NodeProps) {
  const nodeData = data as GraphNodeData;
  const doc = nodeData.entity as DocumentData;

  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const hoveredNodeId = useGraphStore((s) => s.hoveredNodeId);
  const highlightedNodeIds = useGraphStore((s) => s.highlightedNodeIds);

  const hasActiveSelection = selectedNodeId !== null || hoveredNodeId !== null;
  const isHighlighted = highlightedNodeIds.has(id);
  const isSelected = selectedNodeId === id;
  const isDimmed = hasActiveSelection && !isHighlighted;

  return (
    <div className={`transition-all duration-300 ${isDimmed ? 'opacity-25' : 'opacity-100'}`}>
      <div
        className={`
          node-card relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
          transition-all duration-300 cursor-pointer min-w-[100px]
          ${isSelected ? 'ring-2 ring-accent/40 ring-offset-2 ring-offset-surface' : ''}
          ${!isDimmed ? 'hover:border-border-default' : ''}
        `}
      >
        <NodeHandles />
        <FileText className="w-4 h-4 text-node-icon-muted shrink-0 pointer-events-none" strokeWidth={1.5} />
        <div className="flex flex-col min-w-0 pointer-events-none">
          <span className="text-[10px] font-medium text-text-primary truncate max-w-[100px]">
            {nodeData.label}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${statusDotColors[doc.status]}`} />
            <span className={`text-[8px] capitalize ${statusColors[doc.status]}`}>
              {doc.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
