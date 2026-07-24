import type { Node, Edge } from '@xyflow/react';

export type EntityType = 'company' | 'individual' | 'address' | 'document';

export type RelationshipType = 'ownership' | 'director' | 'shared-address' | 'risk';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type LayoutMode = 'force' | 'radial' | 'hierarchical';

export type ComplexityPresetId = 'simple' | 'moderate' | 'standard' | 'complex' | 'full';

export interface CompanyData {
  name: string;
  jurisdiction: string;
  registrationNumber: string;
  incorporationDate: string;
  status: 'active' | 'inactive' | 'dissolved';
  riskLevel: RiskLevel;
  companyType: string;
  industry: string;
  badgeCount?: number;
}

export interface IndividualData {
  name: string;
  role: string;
  nationality: string;
  dateOfBirth: string;
  riskLevel: RiskLevel;
  pep: boolean;
  sanctioned: boolean;
}

export interface AddressData {
  line1: string;
  line2?: string;
  city: string;
  country: string;
  postalCode: string;
  addressType: 'registered' | 'trading' | 'residential';
}

export interface DocumentData {
  title: string;
  documentType: string;
  date: string;
  status: 'verified' | 'pending' | 'expired';
}

export type CompanyNodeData = {
  entityType: 'company';
  entity: CompanyData;
  label: string;
};

export type IndividualNodeData = {
  entityType: 'individual';
  entity: IndividualData;
  label: string;
};

export type AddressNodeData = {
  entityType: 'address';
  entity: AddressData;
  label: string;
};

export type DocumentNodeData = {
  entityType: 'document';
  entity: DocumentData;
  label: string;
};

export type GraphNodeData =
  | CompanyNodeData
  | IndividualNodeData
  | AddressNodeData
  | DocumentNodeData;

export type GraphNode = Node<GraphNodeData>;

export type GraphEdgeData = {
  relationshipType: RelationshipType;
  label?: string;
  percentage?: number;
  role?: string;
  riskLevel?: RiskLevel;
} & Record<string, unknown>;

export type GraphEdge = Edge<GraphEdgeData>;

export interface FilterState {
  showCompanies: boolean;
  showIndividuals: boolean;
  showAddresses: boolean;
  showDocuments: boolean;
  riskLevels: RiskLevel[];
}

export interface GraphStoreState {
  selectedNodeId: string | null;
  selectedNodeData: GraphNodeData | null;
  hoveredNodeId: string | null;
  highlightedNodeIds: Set<string>;
  highlightedEdgeIds: Set<string>;
  drawerOpen: boolean;
  filters: FilterState;
  layoutMode: LayoutMode;
  complexityPreset: ComplexityPresetId;
  adjacencyMap: Map<string, Set<string>>;
  edgeIndex: Map<string, Set<string>>;
}

export interface GraphStoreActions {
  initializeGraph: (edges: GraphEdge[]) => void;
  selectNode: (nodeId: string, nodeData: GraphNodeData) => void;
  clearSelection: () => void;
  hoverNode: (nodeId: string | null) => void;
  toggleDrawer: (open?: boolean) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setLayoutMode: (mode: LayoutMode) => void;
  setComplexityPreset: (preset: ComplexityPresetId) => void;
}

export type GraphStore = GraphStoreState & GraphStoreActions;
