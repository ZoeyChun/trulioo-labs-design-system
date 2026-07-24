import { AlertTriangle, ShieldAlert } from 'lucide-react';
import type { IndividualData, RiskLevel } from '../../types/graph';

interface IndividualOverviewProps {
  entity: IndividualData;
}

const riskColors: Record<RiskLevel, string> = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-orange-400',
  critical: 'text-red-400',
};

export function IndividualOverview({ entity }: IndividualOverviewProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Role</span>
          <p className="text-sm text-slate-200 mt-0.5">{entity.role}</p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Nationality</span>
          <p className="text-sm text-slate-200 mt-0.5">{entity.nationality}</p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Date of Birth</span>
          <p className="text-sm text-slate-200 mt-0.5">{entity.dateOfBirth}</p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Risk Level</span>
          <p className={`text-sm font-semibold mt-0.5 capitalize ${riskColors[entity.riskLevel]}`}>
            {entity.riskLevel}
          </p>
        </div>
      </div>

      {(entity.pep || entity.sanctioned) && (
        <div className="flex flex-col gap-2 pt-3 border-t border-border-subtle">
          {entity.pep && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-950/50 border border-orange-900/50">
              <AlertTriangle className="w-4 h-4 text-orange-400" strokeWidth={1.5} />
              <span className="text-xs text-orange-300">Politically Exposed Person</span>
            </div>
          )}
          {entity.sanctioned && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-950/50 border border-red-900/50">
              <ShieldAlert className="w-4 h-4 text-red-400" strokeWidth={1.5} />
              <span className="text-xs text-red-300">Sanctions List Match</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
