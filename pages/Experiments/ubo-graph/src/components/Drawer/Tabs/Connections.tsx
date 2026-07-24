import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { buildGraphFromPreset } from '../../../lib/buildGraphDataset';
import { useGraphStore } from '../../../store/graphStore';

interface ConnectionsProps {
  nodeId: string;
}

export function Connections({ nodeId }: ConnectionsProps) {
  const complexityPreset = useGraphStore((s) => s.complexityPreset);
  const { edges, nodes } = useMemo(
    () => buildGraphFromPreset(complexityPreset),
    [complexityPreset],
  );

  const connections = edges.filter(
    (e) => e.source === nodeId || e.target === nodeId,
  );

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-xs text-text-muted mb-1">{connections.length} connections</p>
      {connections.map((edge) => {
        const otherId = edge.source === nodeId ? edge.target : edge.source;
        const otherNode = nodeMap.get(otherId);
        const label = edge.data?.label ?? edge.data?.role ?? edge.data?.relationshipType;

        return (
          <div
            key={edge.id}
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-surface-overlay border border-border-subtle hover:border-border-default hover:bg-hover transition-all duration-200 cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5 text-text-muted shrink-0" strokeWidth={1.5} />
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-text-primary truncate">
                {otherNode?.data.label ?? otherId}
              </span>
              {label && (
                <span className="text-[10px] text-text-muted capitalize">{label}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
