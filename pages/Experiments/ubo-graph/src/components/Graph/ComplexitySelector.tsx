import { Layers } from 'lucide-react';
import { COMPLEXITY_PRESETS } from '../../data/graphPresets';
import { useGraphStore } from '../../store/graphStore';
import type { ComplexityPresetId } from '../../types/graph';

export function ComplexitySelector() {
  const complexityPreset = useGraphStore((s) => s.complexityPreset);
  const setComplexityPreset = useGraphStore((s) => s.setComplexityPreset);

  const active = COMPLEXITY_PRESETS.find((p) => p.id === complexityPreset);

  return (
    <div className="glass-panel flex items-center gap-2 rounded-xl px-3 py-2">
      <Layers className="w-4 h-4 text-text-muted shrink-0" strokeWidth={1.5} />
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-medium uppercase tracking-widest text-text-muted leading-none">
          Complexity
        </span>
        <select
          value={complexityPreset}
          onChange={(e) => setComplexityPreset(e.target.value as ComplexityPresetId)}
          className="mt-1 bg-transparent text-sm font-medium text-text-primary outline-none cursor-pointer pr-6"
          title={active?.description}
        >
          {COMPLEXITY_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id} className="bg-surface-raised text-text-primary">
              {preset.label} · {preset.entityCount} entities
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
