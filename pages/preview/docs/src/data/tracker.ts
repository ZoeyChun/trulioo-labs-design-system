import trackerData from "./component-tracker.json";

export type TrackerComponent = {
  id: string;
  name: string;
  category: string;
  figmaStatus: string;
  figmaVariants?: string;
  cssFile?: string;
  classPrefixes: string[];
  subComponents?: string;
  figmaNodeId?: string;
  notes?: string;
  cssStatus: string;
  usedInPreview: boolean;
  usedInBV: boolean;
  usedInDV: boolean;
};

export type TrackerPlanned = {
  name: string;
  category: string;
  priority: string;
  description?: string;
  dependsOn?: string;
  notes?: string;
};

export type TrackerSummary = {
  totalComponents: number;
  cssDone: number;
  cssPartial: number;
  cssNotStarted: number;
  figmaDone: number;
  figmaEligible: number;
  figmaDonePercent: number;
  adoption: {
    preview: { used: number; total: number; percent: number };
    bv: { used: number; total: number; percent: number };
    dv: { used: number; total: number; percent: number };
  };
};

export type ComponentTrackerData = {
  lastBuiltAt: string;
  summary: TrackerSummary;
  components: TrackerComponent[];
  planned: TrackerPlanned[];
  warnings: string[];
};

export const COMPONENT_TRACKER = trackerData as ComponentTrackerData;
