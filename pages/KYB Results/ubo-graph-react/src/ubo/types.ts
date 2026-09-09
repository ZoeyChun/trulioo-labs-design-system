export interface LabsTreeNode {
  id: string;
  type?: "business" | "person";
  name: string;
  subtitle?: string;
  risk?: string;
  details?: {
    status?: string;
    statusTone?: string;
    fields?: Array<{ label: string; value: string }>;
    truai?: string;
    prompt?: string;
    findings?: string[];
    connected?: Array<{
      id?: string;
      role?: string;
      type?: "business" | "person";
      name: string;
      pct?: string;
      address?: string;
    }>;
  };
  children?: LabsTreeNode[];
  moreHidden?: LabsTreeNode[];
}

export interface RiskFilterMeta {
  label?: string;
  count?: number;
}

export interface UboGraphData {
  tree: LabsTreeNode;
  riskFilter?: RiskFilterMeta | null;
}

export interface FilterOptionState {
  [key: string]: boolean;
}

export interface UboFilters {
  risk: FilterOptionState;
  relationships: FilterOptionState;
  separation: FilterOptionState;
}

export interface UboGraphState {
  selectedId: string | null;
  hoveredId: string | null;
  expandedMore: Record<string, boolean>;
  expandedChildren: Record<string, boolean>;
  showBusiness: boolean;
  showPerson: boolean;
  searchQuery: string;
  zoom: number;
  panX: number;
  panY: number;
  filters: UboFilters;
}

export interface NodeIndexEntry {
  node: LabsTreeNode;
  parentId: string | null;
  depth: number;
}

export type GraphMode = "inline" | "fullscreen";

export interface CanvasSlot {
  x: number;
  y: number;
}

export interface CanvasWire {
  d: string;
  childId: string;
}

export interface UboLayoutNode {
  node: LabsTreeNode;
  x: number;
  y: number;
  /**
   * Filtered out by the entity-type toggle, but kept because visible
   * descendants would otherwise be orphaned from the hierarchy.
   */
  structural: boolean;
  /** Collapsed entities under this node that the type filter would let through. */
  moreCount: number;
  /** Centre of this node's "+N more" chip, when it has one. */
  moreX: number;
  moreY: number;
}

export interface UboLayout {
  width: number;
  height: number;
  nodes: UboLayoutNode[];
  wires: CanvasWire[];
  slotById: Record<string, CanvasSlot>;
  /** Entities the type toggle removed outright, for the toolbar hint. */
  removedByType: number;
}
