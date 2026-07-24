import { Building2, User, MapPin, FileText } from 'lucide-react';

const nodeTypes = [
  { icon: Building2, label: 'Company', iconColor: 'text-text-secondary' },
  { icon: User, label: 'Individual', iconColor: 'text-accent' },
  { icon: MapPin, label: 'Address', iconColor: 'text-text-muted' },
  { icon: FileText, label: 'Document', iconColor: 'text-text-muted' },
];

const edgeTypes = [
  { label: 'Ownership', color: 'bg-accent', style: '' },
  { label: 'Director', color: 'bg-edge-director', style: 'opacity-60' },
  { label: 'Shared Address', color: 'bg-edge-shared', style: 'opacity-40' },
  { label: 'Risk', color: 'bg-edge-risk', style: '' },
];

export function GraphLegend() {
  return (
    <div className="glass-panel absolute bottom-36 right-5 z-10 rounded-xl p-4 min-w-[148px]">
      <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2.5">Nodes</p>
      <div className="flex flex-col gap-2 mb-4">
        {nodeTypes.map(({ icon: Icon, label, iconColor }) => (
          <div key={label} className="flex items-center gap-2.5">
            <div className="node-card w-5 h-5 rounded-md flex items-center justify-center">
              <Icon className={`w-2.5 h-2.5 ${iconColor}`} strokeWidth={1.5} />
            </div>
            <span className="text-[11px] text-text-muted">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2.5">Edges</p>
      <div className="flex flex-col gap-2">
        {edgeTypes.map(({ label, color, style }) => (
          <div key={label} className="flex items-center gap-2.5">
            <div className={`w-5 h-px rounded-full ${color} ${style}`} />
            <span className="text-[11px] text-text-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
