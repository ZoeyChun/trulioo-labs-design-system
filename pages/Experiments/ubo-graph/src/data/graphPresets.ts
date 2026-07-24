import type { ComplexityPresetId } from '../types/graph';

export interface ComplexityPreset {
  id: ComplexityPresetId;
  label: string;
  description: string;
  entityCount: number;
  nodeIds: readonly string[];
}

/** Low → high complexity presets built from the Meridian Holdings investigation dataset. */
export const COMPLEXITY_PRESETS: ComplexityPreset[] = [
  {
    id: 'simple',
    label: 'Simple',
    description: 'Single company, one owner, one subsidiary',
    entityCount: 5,
    nodeIds: ['c-meridian', 'i-chen', 'c-apex', 'a-london', 'd-cert'],
  },
  {
    id: 'moderate',
    label: 'Moderate',
    description: 'Hub company with two subsidiaries and directors',
    entityCount: 9,
    nodeIds: [
      'c-meridian',
      'i-chen',
      'i-williams',
      'c-apex',
      'c-pinnacle',
      'a-london',
      'a-singapore',
      'd-cert',
      'd-annual',
    ],
  },
  {
    id: 'standard',
    label: 'Standard',
    description: 'Multi-subsidiary group with UBOs and addresses',
    entityCount: 14,
    nodeIds: [
      'c-meridian',
      'i-chen',
      'i-williams',
      'i-volkov',
      'i-petrov',
      'c-apex',
      'c-pinnacle',
      'c-northstar',
      'c-pacific',
      'a-london',
      'a-singapore',
      'a-melbourne',
      'd-cert',
      'd-annual',
    ],
  },
  {
    id: 'complex',
    label: 'Complex',
    description: 'Cross-border structure with risk flags and documents',
    entityCount: 22,
    nodeIds: [
      'c-meridian',
      'c-silverline',
      'c-apex',
      'c-pinnacle',
      'c-northstar',
      'c-pacific',
      'c-cascade',
      'c-zenith',
      'i-chen',
      'i-williams',
      'i-volkov',
      'i-kim',
      'i-wei',
      'i-nakamura',
      'i-obrien',
      'i-petrov',
      'a-london',
      'a-singapore',
      'a-newyork',
      'a-zurich',
      'd-cert',
      'd-kyc',
    ],
  },
  {
    id: 'full',
    label: 'Full',
    description: 'Complete network — all entities and relationships',
    entityCount: 30,
    nodeIds: [], // resolved at runtime to include all nodes
  },
];

export const DEFAULT_COMPLEXITY_PRESET: ComplexityPresetId = 'standard';

export function getPresetById(id: ComplexityPresetId): ComplexityPreset {
  return COMPLEXITY_PRESETS.find((p) => p.id === id) ?? COMPLEXITY_PRESETS[2];
}
