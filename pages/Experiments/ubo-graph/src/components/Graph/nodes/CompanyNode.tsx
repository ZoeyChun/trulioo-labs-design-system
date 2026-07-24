import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Building2 } from 'lucide-react';
import { useGraphStore } from '../../../store/graphStore';
import type { GraphNodeData, CompanyData } from '../../../types/graph';
import { NodeHandles } from './NodeHandles';

const riskRingColors: Record<string, string> = {
  low: 'border-emerald-500/60',
  medium: 'border-amber-500/60',
  high: 'border-orange-500/60',
  critical: 'border-red-500/60',
};

export function CompanyNode({ id, data }: NodeProps) {
  const nodeData = data as GraphNodeData;
  const company = nodeData.entity as CompanyData;

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
            node-card relative flex items-center justify-center
            w-[72px] h-[72px] rounded-2xl
            ${riskRingColors[company.riskLevel]}
            transition-all duration-300 cursor-pointer
            ${isSelected ? 'ring-2 ring-accent/50 ring-offset-2 ring-offset-surface' : ''}
            ${!isDimmed ? 'hover:border-border-default' : ''}
          `}
        >
          <NodeHandles />
          <Building2 className="w-7 h-7 text-node-icon pointer-events-none" strokeWidth={1.5} />
        </div>
        {company.badgeCount !== undefined && company.badgeCount > 0 && (
          <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-accent text-[10px] font-semibold text-white shadow-lg pointer-events-none">
            {company.badgeCount}
          </div>
        )}
      </div>
      <span className="mt-2.5 text-[11px] font-medium text-text-primary max-w-[100px] text-center leading-tight pointer-events-none">
        {nodeData.label}
      </span>
    </div>
  );
}
