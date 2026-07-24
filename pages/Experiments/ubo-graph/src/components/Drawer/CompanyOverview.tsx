import type { CompanyData, RiskLevel } from '../../types/graph';

interface CompanyOverviewProps {
  entity: CompanyData;
}

const riskColors: Record<RiskLevel, string> = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-orange-400',
  critical: 'text-red-400',
};

export function CompanyOverview({ entity }: CompanyOverviewProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Jurisdiction</span>
          <p className="text-sm text-slate-200 mt-0.5">{entity.jurisdiction}</p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Registration</span>
          <p className="text-sm text-slate-200 mt-0.5 font-mono">{entity.registrationNumber}</p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Incorporated</span>
          <p className="text-sm text-slate-200 mt-0.5">{entity.incorporationDate}</p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Status</span>
          <p className="text-sm text-slate-200 mt-0.5 capitalize">{entity.status}</p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Company Type</span>
          <p className="text-sm text-slate-200 mt-0.5">{entity.companyType}</p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Industry</span>
          <p className="text-sm text-slate-200 mt-0.5">{entity.industry}</p>
        </div>
      </div>
      <div className="pt-3 border-t border-border-subtle">
        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Risk Level</span>
        <p className={`text-sm font-semibold mt-0.5 capitalize ${riskColors[entity.riskLevel]}`}>
          {entity.riskLevel}
        </p>
      </div>
    </div>
  );
}
