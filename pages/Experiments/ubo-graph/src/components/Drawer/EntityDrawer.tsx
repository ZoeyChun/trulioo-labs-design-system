import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, User, MapPin, FileText } from 'lucide-react';
import { useGraphStore } from '../../store/graphStore';
import type { EntityType, RiskLevel } from '../../types/graph';
import { Overview } from './Tabs/Overview';
import { Connections } from './Tabs/Connections';
import { Timeline } from './Tabs/Timeline';
import { RiskSignals } from './Tabs/RiskSignals';
import { Documents } from './Tabs/Documents';
import { Ownership } from './Tabs/Ownership';

const entityIcons: Record<EntityType, typeof Building2> = {
  company: Building2,
  individual: User,
  address: MapPin,
  document: FileText,
};

const riskBadgeStyles: Record<RiskLevel, string> = {
  low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  critical: 'bg-red-500/10 text-red-500 border-red-500/20',
};

function getRiskLevel(nodeData: { entityType: string; entity: Record<string, unknown> }): RiskLevel | null {
  if ('riskLevel' in nodeData.entity) {
    return nodeData.entity.riskLevel as RiskLevel;
  }
  return null;
}

const tabsByEntityType: Record<EntityType, string[]> = {
  company: ['Overview', 'Connections', 'Ownership', 'Risk Signals', 'Timeline', 'Documents'],
  individual: ['Overview', 'Connections', 'Ownership', 'Risk Signals', 'Timeline'],
  address: ['Overview', 'Connections', 'Risk Signals'],
  document: ['Overview', 'Connections'],
};

export function EntityDrawer() {
  const drawerOpen = useGraphStore((s) => s.drawerOpen);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const selectedNodeData = useGraphStore((s) => s.selectedNodeData);
  const clearSelection = useGraphStore((s) => s.clearSelection);
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = useMemo(() => {
    if (!selectedNodeData) return [];
    return tabsByEntityType[selectedNodeData.entityType];
  }, [selectedNodeData]);

  const validTab = tabs.includes(activeTab) ? activeTab : tabs[0] ?? 'Overview';

  if (!selectedNodeData || !selectedNodeId) return null;

  const Icon = entityIcons[selectedNodeData.entityType];
  const riskLevel = getRiskLevel(selectedNodeData as { entityType: string; entity: Record<string, unknown> });

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.aside
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 420, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-[420px] bg-surface/95 backdrop-blur-xl border-l border-border-subtle z-50 flex flex-col shadow-[-8px_0_32px_var(--color-glass-shadow)]"
        >
          <div className="flex items-start gap-3.5 p-5 border-b border-border-subtle">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-overlay border border-border-subtle shrink-0">
              <Icon className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h2 className="text-base font-semibold text-text-primary truncate">{selectedNodeData.label}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-text-muted capitalize">{selectedNodeData.entityType}</span>
                {riskLevel && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wide ${riskBadgeStyles[riskLevel]}`}>
                    {riskLevel}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={clearSelection}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text-secondary hover:bg-hover transition-colors shrink-0"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex gap-0 border-b border-border-subtle px-5 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px
                  ${validTab === tab
                    ? 'text-text-primary border-accent'
                    : 'text-text-muted border-transparent hover:text-text-secondary'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {validTab === 'Overview' && <Overview nodeData={selectedNodeData} />}
            {validTab === 'Connections' && <Connections nodeId={selectedNodeId} />}
            {validTab === 'Ownership' && <Ownership nodeId={selectedNodeId} />}
            {validTab === 'Risk Signals' && <RiskSignals />}
            {validTab === 'Timeline' && <Timeline />}
            {validTab === 'Documents' && <Documents />}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
