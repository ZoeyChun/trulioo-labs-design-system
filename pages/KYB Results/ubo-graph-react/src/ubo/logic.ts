import type {
  CanvasSlot,
  CanvasWire,
  GraphMode,
  LabsTreeNode,
  NodeIndexEntry,
  UboFilters,
  UboGraphState,
} from "./types";

export const UBO_FILTER_GROUPS = [
  {
    id: "risk",
    label: "Risk Signals",
    options: [
      { id: "high", label: "High" },
      { id: "medium", label: "Medium" },
      { id: "low", label: "Low" },
    ],
  },
  {
    id: "relationships",
    label: "Relationships",
    options: [
      { id: "ownership", label: "Ownership" },
      { id: "director", label: "Director" },
      { id: "shareholder", label: "Shareholder" },
      { id: "ubo", label: "UBO" },
    ],
  },
  {
    id: "separation",
    label: "Degree of Separation",
    options: [
      { id: "level1", label: "1st level" },
      { id: "level2", label: "2nd level" },
      { id: "entireNetwork", label: "Entire network" },
    ],
  },
] as const;

export const UBO_CANVAS = {
  width: 1010,
  height: 662,
  nodeWidth: 242,
  nodeHeight: 64,
  wireRadius: 8,
  slots: {
    root: { x: 472, y: 174 },
    steven: { x: 59, y: 339 },
    james: { x: 325, y: 339 },
    apex: { x: 615, y: 339 },
    walter: { x: 325, y: 470 },
    connie: { x: 500, y: 470 },
    sarah: { x: 758, y: 470 },
    patricia: { x: 59, y: 470 },
  },
  moreTags: {
    james: { x: 410, y: 455 },
    apex: { x: 702, y: 455 },
    steven: { x: 144, y: 455 },
  },
} as const;

export function createDefaultUboFilters(): UboFilters {
  return {
    risk: { high: true, medium: false, low: false },
    relationships: { ownership: true, director: true, shareholder: true, ubo: true },
    separation: { level1: true, level2: true, entireNetwork: false },
  };
}

export function createEmptyUboFilters(): UboFilters {
  return {
    risk: { high: false, medium: false, low: false },
    relationships: { ownership: false, director: false, shareholder: false, ubo: false },
    separation: { level1: false, level2: false, entireNetwork: false },
  };
}

export function createInitialGraphState(): UboGraphState {
  return {
    selectedId: null,
    hoveredId: null,
    expandedMore: {},
    expandedChildren: {},
    showBusiness: true,
    showPerson: true,
    searchQuery: "",
    zoom: 1,
    panX: 0,
    panY: 0,
    filters: createEmptyUboFilters(),
  };
}

export function uboCountSelectedFilters(filters: UboFilters): number {
  let count = 0;
  UBO_FILTER_GROUPS.forEach((group) => {
    group.options.forEach((option) => {
      if (filters[group.id][option.id]) count += 1;
    });
  });
  return count;
}

export function uboFirstSelectedFilterLabel(filters: UboFilters): string {
  for (const group of UBO_FILTER_GROUPS) {
    for (const option of group.options) {
      if (filters[group.id][option.id]) {
        return `${group.label}: ${option.label}`;
      }
    }
  }
  return "";
}

export function uboHasActiveFilters(filters: UboFilters): boolean {
  return uboCountSelectedFilters(filters) > 0;
}

function uboInferRelationship(node: LabsTreeNode): string {
  const subtitle = (node.subtitle || "").toLowerCase();
  if (subtitle.includes("ubo")) return "ubo";
  if (subtitle.includes("director")) return "director";
  if (subtitle.includes("shareholder")) return "shareholder";
  if (subtitle.includes("owns") || subtitle.includes("%")) return "ownership";
  if (subtitle.includes("subsidiary") || subtitle.includes("root")) return "ownership";
  return "ownership";
}

function uboNodeMatchesRiskFilter(node: LabsTreeNode, filters: UboFilters): boolean {
  const selected: string[] = [];
  if (filters.risk.high) selected.push("high");
  if (filters.risk.medium) selected.push("medium");
  if (filters.risk.low) selected.push("low");
  if (!selected.length) return true;
  const nodeRisk = node.risk || "low";
  return selected.includes(nodeRisk);
}

function uboNodeMatchesRelationshipFilter(node: LabsTreeNode, filters: UboFilters): boolean {
  const selected: string[] = [];
  if (filters.relationships.ownership) selected.push("ownership");
  if (filters.relationships.director) selected.push("director");
  if (filters.relationships.shareholder) selected.push("shareholder");
  if (filters.relationships.ubo) selected.push("ubo");
  if (!selected.length) return true;
  return selected.includes(uboInferRelationship(node));
}

function uboNodeMatchesSeparationFilter(depth: number, filters: UboFilters): boolean {
  const separation = filters.separation;
  if (!separation.level1 && !separation.level2 && !separation.entireNetwork) return true;
  if (separation.entireNetwork) return true;
  if (separation.level2 && depth <= 2) return true;
  if (separation.level1 && depth <= 1) return true;
  return false;
}

function uboIndexNodes(
  node: LabsTreeNode,
  map: Record<string, NodeIndexEntry>,
  parentId: string | null,
  depth: number
) {
  map[node.id] = { node, parentId, depth };
  (node.children || []).forEach((child) => uboIndexNodes(child, map, node.id, depth + 1));
  (node.moreHidden || []).forEach((child) => uboIndexNodes(child, map, node.id, depth + 1));
}

export function uboBuildNodeIndex(tree: LabsTreeNode): Record<string, NodeIndexEntry> {
  const map: Record<string, NodeIndexEntry> = {};
  uboIndexNodes(tree, map, null, 0);
  return map;
}

export function uboGetAncestorIds(index: Record<string, NodeIndexEntry>, nodeId: string): string[] {
  const ids: string[] = [];
  let current = index[nodeId];
  while (current?.parentId) {
    ids.push(current.parentId);
    current = index[current.parentId];
  }
  return ids;
}

export function uboGetDescendantIds(node: LabsTreeNode, expandedMore: Record<string, boolean>): string[] {
  const ids: string[] = [];
  function walk(item: LabsTreeNode) {
    (item.children || []).forEach((child) => {
      ids.push(child.id);
      walk(child);
    });
    if (expandedMore[item.id]) {
      (item.moreHidden || []).forEach((hidden) => ids.push(hidden.id));
    }
  }
  walk(node);
  return ids;
}

function uboIsDirectConnection(
  nodeId: string,
  targetId: string,
  index: Record<string, NodeIndexEntry>
): boolean {
  if (nodeId === targetId) return true;
  if (index[targetId]?.parentId === nodeId) return true;
  if (index[nodeId]?.parentId === targetId) return true;
  return false;
}

export function uboShouldDimNode(
  node: LabsTreeNode,
  state: UboGraphState,
  index: Record<string, NodeIndexEntry>,
  mode: GraphMode
): boolean {
  if (!state.showBusiness && node.type === "business") return true;
  if (!state.showPerson && node.type === "person") return true;
  if (state.searchQuery && !node.name.toLowerCase().includes(state.searchQuery)) return true;
  if (state.hoveredId && !state.selectedId) {
    return !uboIsDirectConnection(node.id, state.hoveredId, index);
  }
  if (state.hoveredId && state.selectedId) {
    return !uboIsDirectConnection(node.id, state.hoveredId, index);
  }
  if (state.selectedId) {
    const focusNode = index[state.selectedId]?.node;
    if (!focusNode) return true;
    const focusIds = [
      state.selectedId,
      ...uboGetDescendantIds(focusNode, state.expandedMore),
    ];
    return !focusIds.includes(node.id);
  }
  if (uboHasActiveFilters(state.filters)) {
    const entry = index[node.id];
    const depth = entry ? entry.depth : 0;
    if (!uboNodeMatchesRiskFilter(node, state.filters)) return true;
    if (!uboNodeMatchesRelationshipFilter(node, state.filters)) return true;
    if (!uboNodeMatchesSeparationFilter(depth, state.filters)) return true;
  }
  return false;
}

export function uboGetSlot(nodeId: string): CanvasSlot | null {
  const slots = UBO_CANVAS.slots as Record<string, CanvasSlot>;
  return slots[nodeId] || null;
}

export function uboShouldShowGrandchildren(
  branch: LabsTreeNode,
  state: UboGraphState,
  mode: GraphMode,
  tree: LabsTreeNode
): boolean {
  if (state.expandedChildren[branch.id]) return true;
  if (state.selectedId === "root") return true;
  if (state.selectedId) {
    const index = uboBuildNodeIndex(tree);
    const ancestors = uboGetAncestorIds(index, state.selectedId);
    if (ancestors.includes(branch.id)) return true;
    if (branch.id === state.selectedId) return true;
  }
  return false;
}

export function uboBranchMoreCount(
  branch: LabsTreeNode,
  state: UboGraphState,
  mode: GraphMode,
  tree: LabsTreeNode
): number {
  if (uboShouldShowGrandchildren(branch, state, mode, tree)) return 0;
  if (branch.moreHidden?.length && !state.expandedMore[branch.id]) {
    return branch.moreHidden.length;
  }
  if (branch.children?.length) return branch.children.length;
  return 0;
}

export function uboCollectCanvasNodes(
  tree: LabsTreeNode,
  state: UboGraphState,
  mode: GraphMode
): Array<{ node: LabsTreeNode; slot: CanvasSlot }> {
  const nodes: Array<{ node: LabsTreeNode; slot: CanvasSlot | null }> = [
    { node: tree, slot: uboGetSlot(tree.id) },
  ];

  (tree.children || []).forEach((branch) => {
    nodes.push({ node: branch, slot: uboGetSlot(branch.id) });
    if (state.expandedMore[branch.id] && branch.moreHidden) {
      branch.moreHidden.forEach((hidden) => {
        nodes.push({ node: hidden, slot: uboGetSlot(hidden.id) });
      });
    }
    if (uboShouldShowGrandchildren(branch, state, mode, tree) && branch.children) {
      branch.children.forEach((child) => {
        nodes.push({ node: child, slot: uboGetSlot(child.id) });
      });
    }
  });

  return nodes.filter((item): item is { node: LabsTreeNode; slot: CanvasSlot } => !!item.slot);
}

function uboNodeAnchor(slot: CanvasSlot, edge: "top" | "bottom") {
  const centerX = slot.x + UBO_CANVAS.nodeWidth / 2;
  if (edge === "top") return { x: centerX, y: slot.y };
  return { x: centerX, y: slot.y + UBO_CANVAS.nodeHeight };
}

function uboRoundedWirePath(fromX: number, fromY: number, toX: number, toY: number, bendY: number) {
  const r = UBO_CANVAS.wireRadius;
  if (Math.abs(fromX - toX) < 0.5) {
    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  }

  let path = `M ${fromX} ${fromY} L ${fromX} ${bendY - r}`;
  if (toX > fromX) {
    path += ` Q ${fromX} ${bendY} ${fromX + r} ${bendY}`;
    path += ` L ${toX - r} ${bendY}`;
    path += ` Q ${toX} ${bendY} ${toX} ${bendY + r}`;
  } else {
    path += ` Q ${fromX} ${bendY} ${fromX - r} ${bendY}`;
    path += ` L ${toX + r} ${bendY}`;
    path += ` Q ${toX} ${bendY} ${toX} ${bendY + r}`;
  }
  path += ` L ${toX} ${toY}`;
  return path;
}

export function buildUboCanvasWirePaths(
  tree: LabsTreeNode,
  state: UboGraphState,
  mode: GraphMode
): CanvasWire[] {
  const slots = UBO_CANVAS.slots;
  const root = uboNodeAnchor(slots.root, "bottom");
  const steven = uboNodeAnchor(slots.steven, "top");
  const james = uboNodeAnchor(slots.james, "top");
  const apex = uboNodeAnchor(slots.apex, "top");
  const childrenBendY = 288;

  const wires: CanvasWire[] = [
    { d: uboRoundedWirePath(root.x, root.y, steven.x, steven.y, childrenBendY), childId: "steven" },
    { d: uboRoundedWirePath(root.x, root.y, james.x, james.y, childrenBendY), childId: "james" },
    { d: uboRoundedWirePath(root.x, root.y, apex.x, apex.y, childrenBendY), childId: "apex" },
  ];

  let showJamesChild = false;
  let showApexChildren = false;
  (tree.children || []).forEach((branch) => {
    if (branch.id === "james" && uboShouldShowGrandchildren(branch, state, mode, tree)) {
      showJamesChild = true;
    }
    if (branch.id === "apex" && uboShouldShowGrandchildren(branch, state, mode, tree)) {
      showApexChildren = true;
    }
  });

  if (showJamesChild) {
    const jamesBottom = uboNodeAnchor(slots.james, "bottom");
    const walter = uboNodeAnchor(slots.walter, "top");
    wires.push({ d: uboRoundedWirePath(jamesBottom.x, jamesBottom.y, walter.x, walter.y, walter.y - 24), childId: "walter" });
  }

  if (showApexChildren) {
    const apexBottom = uboNodeAnchor(slots.apex, "bottom");
    const connie = uboNodeAnchor(slots.connie, "top");
    const sarah = uboNodeAnchor(slots.sarah, "top");
    const grandchildBendY = 436;
    wires.push({ d: uboRoundedWirePath(apexBottom.x, apexBottom.y, connie.x, connie.y, grandchildBendY), childId: "connie" });
    wires.push({ d: uboRoundedWirePath(apexBottom.x, apexBottom.y, sarah.x, sarah.y, grandchildBendY), childId: "sarah" });
  }

  return wires;
}

export function uboFindParentId(tree: LabsTreeNode, nodeId: string): string | null {
  const index = uboBuildNodeIndex(tree);
  return index[nodeId]?.parentId ?? null;
}
