import { useMemo } from 'react';
import { buildGraphFromPreset } from '../../../lib/buildGraphDataset';
import { useGraphStore } from '../../../store/graphStore';

interface OwnershipProps {
  nodeId: string;
}

export function Ownership({ nodeId }: OwnershipProps) {
  const complexityPreset = useGraphStore((s) => s.complexityPreset);
  const { edges, nodes } = useMemo(
    () => buildGraphFromPreset(complexityPreset),
    [complexityPreset],
  );

  const ownershipEdges = edges.filter(
    (e) =>
      e.data?.relationshipType === 'ownership' &&
      (e.source === nodeId || e.target === nodeId),
  );

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const ownedBy = ownershipEdges
    .filter((e) => e.target === nodeId)
    .map((e) => ({ node: nodeMap.get(e.source), percentage: e.data?.percentage }));

  const owns = ownershipEdges
    .filter((e) => e.source === nodeId)
    .map((e) => ({ node: nodeMap.get(e.target), percentage: e.data?.percentage }));

  return (
    <div className="flex flex-col gap-5 p-4">
      {ownedBy.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2">Owned By</p>
          <div className="flex flex-col gap-2">
            {ownedBy.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-surface-overlay border border-border-subtle">
                <span className="text-sm text-text-primary">{item.node?.data.label ?? 'Unknown'}</span>
                {item.percentage !== undefined && (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-border-default overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-accent w-8 text-right">{item.percentage}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {owns.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2">Owns</p>
          <div className="flex flex-col gap-2">
            {owns.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-surface-overlay border border-border-subtle">
                <span className="text-sm text-text-primary">{item.node?.data.label ?? 'Unknown'}</span>
                {item.percentage !== undefined && (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-border-default overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-accent w-8 text-right">{item.percentage}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {ownedBy.length === 0 && owns.length === 0 && (
        <p className="text-sm text-text-muted py-4 text-center">No ownership relationships found.</p>
      )}
    </div>
  );
}
