import { MapPin } from 'lucide-react';
import type { AddressData } from '../../types/graph';

interface AddressOverviewProps {
  entity: AddressData;
}

export function AddressOverview({ entity }: AddressOverviewProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-start gap-3 px-3 py-3 rounded-lg bg-surface-overlay/50 border border-border-subtle">
        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" strokeWidth={1.5} />
        <div className="flex flex-col">
          <span className="text-sm text-slate-200">{entity.line1}</span>
          {entity.line2 && <span className="text-sm text-slate-300">{entity.line2}</span>}
          <span className="text-sm text-slate-300">{entity.city}, {entity.country}</span>
          <span className="text-sm text-slate-400">{entity.postalCode}</span>
        </div>
      </div>
      <div>
        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Address Type</span>
        <p className="text-sm text-slate-200 mt-0.5 capitalize">{entity.addressType}</p>
      </div>
      <div>
        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Country</span>
        <p className="text-sm text-slate-200 mt-0.5">{entity.country}</p>
      </div>
    </div>
  );
}
