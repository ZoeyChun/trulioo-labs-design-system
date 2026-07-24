import { AlertTriangle, ShieldAlert, Eye, Globe } from 'lucide-react';
import type { RiskLevel } from '../../../types/graph';

interface RiskSignal {
  severity: RiskLevel;
  title: string;
  description: string;
  source: string;
}

const signals: RiskSignal[] = [
  {
    severity: 'critical',
    title: 'Sanctions List Match',
    description: 'Liu Wei (UBO via Silverline Capital) found on OFAC SDN list.',
    source: 'OFAC Screening — 2024-01-15',
  },
  {
    severity: 'high',
    title: 'PEP Connection',
    description: 'Elena Volkov identified as a Politically Exposed Person. Former government official.',
    source: 'PEP Database — 2023-06-10',
  },
  {
    severity: 'medium',
    title: 'Suspicious Address Sharing',
    description: 'Cascade Ventures and Zenith Property share a registered address in Zurich despite no declared relationship.',
    source: 'Address Analysis — 2024-03-22',
  },
  {
    severity: 'low',
    title: 'Cross-company Directorship',
    description: "Michael O'Brien serves as director on both Northstar Logistics and Pinnacle Trading.",
    source: 'Director Network Analysis',
  },
];

const severityConfig: Record<RiskLevel, { icon: typeof AlertTriangle; color: string; bg: string; border: string }> = {
  critical: { icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/8', border: 'border-red-500/15' },
  high: { icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/8', border: 'border-orange-500/15' },
  medium: { icon: Eye, color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/15' },
  low: { icon: Globe, color: 'text-indigo-400', bg: 'bg-indigo-500/8', border: 'border-indigo-500/15' },
};

export function RiskSignals() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {signals.map((signal, idx) => {
        const config = severityConfig[signal.severity];
        const Icon = config.icon;
        return (
          <div key={idx} className={`flex gap-3 p-3.5 rounded-xl border ${config.bg} ${config.border}`}>
            <Icon className={`w-4 h-4 ${config.color} shrink-0 mt-0.5`} strokeWidth={1.5} />
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${config.color} uppercase tracking-wide`}>{signal.severity}</span>
                <span className="text-sm font-medium text-text-primary">{signal.title}</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">{signal.description}</p>
              <span className="text-[10px] text-text-muted/70">{signal.source}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
