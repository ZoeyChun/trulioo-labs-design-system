import type {
  CanvasSlot,
  CanvasWire,
  GraphMode,
  LabsTreeNode,
  NodeIndexEntry,
  UboFilters,
  UboGraphState,
  UboLayout,
  UboLayoutNode,
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
  /* Smallest canvas box. Positions are computed per render, so this only keeps
     the framing stable when a pruned tree would otherwise collapse the canvas. */
  width: 1010,
  height: 662,
  nodeWidth: 242,
  nodeHeight: 64,
  wireRadius: 8,
  /** Horizontal gap between adjacent sibling subtrees. */
  columnGap: 12,
  /** Distance from one tier's top edge to the next. */
  tierPitch: 165,
  /** Top inset of the root card. */
  padTop: 174,
  /** Space kept clear below the deepest tier. */
  padBottom: 94,
  /** Drop of a "+N more" chip below its branch's bottom edge. */
  moreOffsetY: 52,
} as const;

export const UBO_ZOOM_MIN = 0.5;
export const UBO_ZOOM_MAX = 2.5;
/** Multiplicative step so each press moves the same perceived amount at any zoom level. */
export const UBO_ZOOM_STEP = 1.2;

export function clampUboZoom(zoom: number): number {
  if (!Number.isFinite(zoom)) return 1;
  return Math.min(UBO_ZOOM_MAX, Math.max(UBO_ZOOM_MIN, zoom));
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
        return option.label;
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

/**
 * Deepest tier the separation filter allows, or null when the group is untouched.
 * Checkboxes union, so the broadest selected option wins.
 */
export function uboSeparationDepthLimit(filters: UboFilters): number | null {
  const separation = filters.separation;
  if (separation.entireNetwork) return Number.POSITIVE_INFINITY;
  if (separation.level2) return 2;
  if (separation.level1) return 1;
  return null;
}

function uboNodeMatchesSeparationFilter(depth: number, filters: UboFilters): boolean {
  const limit = uboSeparationDepthLimit(filters);
  if (limit === null) return true;
  return depth <= limit;
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

/** The stored query is raw user input, so normalise only when comparing. */
export function uboMatchesSearch(node: LabsTreeNode, searchQuery: string): boolean {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;
  const haystack = `${node.name} ${node.subtitle || ""}`.toLowerCase();
  return haystack.includes(query);
}

export function uboShouldDimNode(
  node: LabsTreeNode,
  state: UboGraphState,
  index: Record<string, NodeIndexEntry>,
  mode: GraphMode
): boolean {
  if (!state.showBusiness && node.type === "business") return true;
  if (!state.showPerson && node.type === "person") return true;
  if (!uboMatchesSearch(node, state.searchQuery)) return true;
  // The selected card drives the drawer, so it stays prominent even when the
  // pointer happens to rest on an unrelated node.
  if (state.selectedId === node.id) return false;
  if (state.hoveredId) {
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

/**
 * Both toggles on (or both off) means "no type filter", which also keeps the
 * canvas from going blank if the toolbar's guard is ever bypassed.
 */
export function uboTypeAllowed(node: LabsTreeNode, state: UboGraphState): boolean {
  if (state.showBusiness === state.showPerson) return true;
  return node.type === "person" ? state.showPerson : state.showBusiness;
}

/** A collapsed entity is only worth counting if revealing it would show something. */
function uboSubtreeHasAllowed(node: LabsTreeNode, state: UboGraphState): boolean {
  if (uboTypeAllowed(node, state)) return true;
  return [...(node.children || []), ...(node.moreHidden || [])].some((child) =>
    uboSubtreeHasAllowed(child, state)
  );
}

export function uboShouldShowGrandchildren(
  branch: LabsTreeNode,
  state: UboGraphState,
  mode: GraphMode,
  tree: LabsTreeNode
): boolean {
  if (state.expandedChildren[branch.id]) return true;

  const depthLimit = uboSeparationDepthLimit(state.filters);
  if (depthLimit !== null) return depthLimit >= 2;

  if (state.selectedId) {
    const index = uboBuildNodeIndex(tree);
    const ancestors = uboGetAncestorIds(index, state.selectedId);
    if (ancestors.includes(branch.id)) return true;
    if (branch.id === state.selectedId) return true;
  }
  return false;
}

/** Overflow entities sit one tier below their branch, so they follow the same depth rules. */
export function uboShouldShowMoreHidden(
  branch: LabsTreeNode,
  state: UboGraphState,
  mode: GraphMode,
  tree: LabsTreeNode
): boolean {
  if (state.expandedMore[branch.id]) return true;
  return uboShouldShowGrandchildren(branch, state, mode, tree);
}

/**
 * The tree that is actually drawn: expansion rules decide which children are
 * revealed, then the entity-type filter prunes what is left.
 *
 * A node filtered out by type is only dropped when nothing visible sits beneath
 * it. Otherwise it is kept as a `structural` node, because removing an ancestor
 * would either orphan its descendants or, worse for a compliance view, imply an
 * ownership path that does not exist.
 */
interface UboVisibleNode {
  node: LabsTreeNode;
  children: UboVisibleNode[];
  structural: boolean;
  moreCount: number;
}

function uboBuildVisibleTree(
  node: LabsTreeNode,
  state: UboGraphState,
  mode: GraphMode,
  tree: LabsTreeNode,
  isRoot: boolean,
  removed: { count: number }
): UboVisibleNode | null {
  const childrenRevealed = isRoot || uboShouldShowGrandchildren(node, state, mode, tree);
  const moreRevealed = isRoot || uboShouldShowMoreHidden(node, state, mode, tree);

  const revealed: LabsTreeNode[] = [];
  if (childrenRevealed) revealed.push(...(node.children || []));
  if (moreRevealed) revealed.push(...(node.moreHidden || []));

  const children = revealed
    .map((child) => uboBuildVisibleTree(child, state, mode, tree, false, removed))
    .filter((child): child is UboVisibleNode => !!child);

  // The root is the subject of the report, so it is never filtered away, but it
  // is still marked as context when it does not match the type filter.
  const matchesType = uboTypeAllowed(node, state);
  if (!matchesType && !isRoot && !children.length) {
    removed.count += 1;
    return null;
  }

  let moreCount = 0;
  if (!childrenRevealed) {
    moreCount += (node.children || []).filter((child) => uboSubtreeHasAllowed(child, state)).length;
  }
  if (!moreRevealed) {
    moreCount += (node.moreHidden || []).filter((child) => uboSubtreeHasAllowed(child, state)).length;
  }

  return { node, children, structural: !matchesType, moreCount };
}

/** Bottom-up pass: a subtree is as wide as its children, or one card at minimum. */
function uboMeasureSubtree(visible: UboVisibleNode, widths: Map<UboVisibleNode, number>): number {
  const { nodeWidth, columnGap } = UBO_CANVAS;
  let width: number = nodeWidth;

  if (visible.children.length) {
    const childrenWidth = visible.children.reduce(
      (sum, child, i) => sum + uboMeasureSubtree(child, widths) + (i ? columnGap : 0),
      0
    );
    width = Math.max(nodeWidth, childrenWidth);
  }

  widths.set(visible, width);
  return width;
}

/** Top-down pass: centre each card over the span its children occupy. */
function uboPlaceSubtree(
  visible: UboVisibleNode,
  left: number,
  depth: number,
  widths: Map<UboVisibleNode, number>,
  out: Array<{ visible: UboVisibleNode; x: number; y: number; depth: number }>
) {
  const { nodeWidth, columnGap, tierPitch, padTop } = UBO_CANVAS;
  const width = widths.get(visible) ?? nodeWidth;

  out.push({
    visible,
    x: left + (width - nodeWidth) / 2,
    y: padTop + depth * tierPitch,
    depth,
  });

  if (!visible.children.length) return;

  const childrenWidth = visible.children.reduce(
    (sum, child, i) => sum + (widths.get(child) ?? nodeWidth) + (i ? columnGap : 0),
    0
  );

  let cursor = left + (width - childrenWidth) / 2;
  visible.children.forEach((child) => {
    uboPlaceSubtree(child, cursor, depth + 1, widths, out);
    cursor += (widths.get(child) ?? nodeWidth) + columnGap;
  });
}

/** Orthogonal connector with rounded corners, bending at `bendY`. */
function uboRoundedWirePath(fromX: number, fromY: number, toX: number, toY: number, bendY: number) {
  const r = UBO_CANVAS.wireRadius;
  if (Math.abs(fromX - toX) < 0.5) {
    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  }

  let path = `M ${fromX} ${fromY} L ${fromX} ${bendY - r}`;
  if (toX > fromX) {
    path += ` Q ${fromX} ${bendY} ${fromX + r} ${bendY}`;
    path += ` L ${toX - r} ${bendY}`;
  } else {
    path += ` Q ${fromX} ${bendY} ${fromX - r} ${bendY}`;
    path += ` L ${toX + r} ${bendY}`;
  }
  path += ` Q ${toX} ${bendY} ${toX} ${bendY + r}`;
  path += ` L ${toX} ${toY}`;
  return path;
}

export function buildUboLayout(
  tree: LabsTreeNode,
  state: UboGraphState,
  mode: GraphMode
): UboLayout {
  const { nodeWidth, nodeHeight, padTop, padBottom, tierPitch, moreOffsetY } = UBO_CANVAS;
  const removed = { count: 0 };
  const root = uboBuildVisibleTree(tree, state, mode, tree, true, removed);

  if (!root) {
    return {
      width: UBO_CANVAS.width,
      height: UBO_CANVAS.height,
      nodes: [],
      wires: [],
      slotById: {},
      removedByType: removed.count,
    };
  }

  const widths = new Map<UboVisibleNode, number>();
  const contentWidth = uboMeasureSubtree(root, widths);

  const width = Math.max(UBO_CANVAS.width, contentWidth);
  const placed: Array<{ visible: UboVisibleNode; x: number; y: number; depth: number }> = [];
  uboPlaceSubtree(root, (width - contentWidth) / 2, 0, widths, placed);

  const maxDepth = placed.reduce((deepest, item) => Math.max(deepest, item.depth), 0);
  const height = Math.max(
    UBO_CANVAS.height,
    padTop + maxDepth * tierPitch + nodeHeight + padBottom
  );

  const nodes: UboLayoutNode[] = placed.map(({ visible, x, y }) => ({
    node: visible.node,
    x,
    y,
    structural: visible.structural,
    moreCount: visible.moreCount,
    moreX: x + nodeWidth / 2,
    moreY: y + nodeHeight + moreOffsetY,
  }));

  const slotById: Record<string, CanvasSlot> = {};
  nodes.forEach((item) => {
    slotById[item.node.id] = { x: item.x, y: item.y };
  });

  // Wires come from the same placed tree as the cards, so a pruned node can
  // never leave a line hanging in empty space.
  const wires: CanvasWire[] = [];
  placed.forEach(({ visible, x, y }) => {
    const fromX = x + nodeWidth / 2;
    const fromY = y + nodeHeight;

    visible.children.forEach((child) => {
      const childSlot = slotById[child.node.id];
      if (!childSlot) return;
      const toX = childSlot.x + nodeWidth / 2;
      const toY = childSlot.y;
      wires.push({
        d: uboRoundedWirePath(fromX, fromY, toX, toY, Math.round((fromY + toY) / 2)),
        childId: child.node.id,
      });
    });

    if (visible.moreCount > 0) {
      const toY = y + nodeHeight + moreOffsetY;
      wires.push({
        // Keyed to the branch, not a synthetic "-more" id, so the wire's dim
        // state can be resolved from the node index like every other wire.
        d: uboRoundedWirePath(fromX, fromY, fromX, toY, Math.round((fromY + toY) / 2)),
        childId: visible.node.id,
      });
    }
  });

  return { width, height, nodes, wires, slotById, removedByType: removed.count };
}

export function uboFindParentId(tree: LabsTreeNode, nodeId: string): string | null {
  const index = uboBuildNodeIndex(tree);
  return index[nodeId]?.parentId ?? null;
}

type UboConnectedEntity = NonNullable<NonNullable<LabsTreeNode["details"]>["connected"]>[number];

/**
 * Authored connections win, but nodes without them fall back to their real tree
 * edges so the drawer can never disagree with the graph or come up empty.
 */
export function uboConnectedEntities(
  node: LabsTreeNode,
  index: Record<string, NodeIndexEntry>
): UboConnectedEntity[] {
  const authored = node.details?.connected;
  if (authored?.length) return authored;

  const related: LabsTreeNode[] = [...(node.children || []), ...(node.moreHidden || [])];
  const parentId = index[node.id]?.parentId;
  const parent = parentId ? index[parentId]?.node : null;
  if (parent) related.unshift(parent);

  return related.map((item) => ({
    id: item.id,
    type: item.type,
    role: item.subtitle || (item.type === "person" ? "Person" : "Business"),
    name: item.name,
  }));
}
