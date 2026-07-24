import type { NodeProps } from '@xyflow/react';
import { User, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useGraphStore } from '../../../store/graphStore';
import type { GraphNodeData, IndividualData } from '../../../types/graph';
import { NodeHandles } from './NodeHandles';

export function IndividualNode({ id, data }: NodeProps) {
  const nodeData = data as GraphNodeData;
  const individual = nodeData.entity as IndividualData;

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
      <div className="relative">
        <div
          className={`
            node-card-individual relative flex items-center justify-center
            w-[52px] h-[52px] rounded-full
            transition-all duration-300 cursor-pointer
            ${isSelected ? 'ring-2 ring-accent/40 ring-offset-2 ring-offset-surface' : ''}
          `}
        >
          <NodeHandles />
          <User className="w-5 h-5 text-node-individual-icon pointer-events-none" strokeWidth={1.5} />
        </div>
        {individual.pep && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-orange-500 shadow-sm pointer-events-none" title="Politically Exposed Person">
            <AlertTriangle className="w-2.5 h-2.5 text-white" />
          </div>
        )}
        {individual.sanctioned && (
          <div className="absolute -top-1 -left-1 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 shadow-sm pointer-events-none" title="Sanctions Match">
            <ShieldAlert className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>
      <span className="mt-2 text-[11px] font-medium text-text-primary max-w-[90px] text-center leading-tight pointer-events-none">
        {nodeData.label}
      </span>
      <span className="text-[9px] text-text-muted max-w-[90px] text-center pointer-events-none">
        {individual.role}
      </span>
    </div>
  );
}
