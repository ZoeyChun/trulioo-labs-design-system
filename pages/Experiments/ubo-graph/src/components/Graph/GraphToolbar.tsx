import { Search, Filter, Building2, User, MapPin, FileText } from 'lucide-react';
import { useGraphStore } from '../../store/graphStore';
import { ThemeToggle } from '../ThemeToggle';
import { ComplexitySelector } from './ComplexitySelector';

const filterButtons = [
  { key: 'showCompanies' as const, icon: Building2, label: 'Companies' },
  { key: 'showIndividuals' as const, icon: User, label: 'Individuals' },
  { key: 'showAddresses' as const, icon: MapPin, label: 'Addresses' },
  { key: 'showDocuments' as const, icon: FileText, label: 'Documents' },
];

export function GraphToolbar() {
  const filters = useGraphStore((s) => s.filters);
  const setFilters = useGraphStore((s) => s.setFilters);

  return (
    <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
      <div className="glass-panel flex items-center gap-2.5 rounded-xl px-3.5 py-2.5">
        <Search className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search entities..."
          className="bg-transparent text-sm text-text-primary placeholder-text-muted outline-none w-48"
        />
      </div>

      <div className="glass-panel flex items-center gap-1 rounded-xl p-1">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-text-muted">
          <Filter className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium uppercase tracking-widest">Filter</span>
        </div>
        <div className="h-4 w-px bg-divider" />
        {filterButtons.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setFilters({ [key]: !filters[key] })}
            title={label}
            className={`
              flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
              ${filters[key]
                ? 'bg-accent/15 text-accent'
                : 'text-text-muted hover:text-text-secondary hover:bg-hover'}
            `}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        ))}
      </div>

      <ComplexitySelector />

      <div className="glass-panel rounded-xl p-1">
        <ThemeToggle />
      </div>
    </div>
  );
}
