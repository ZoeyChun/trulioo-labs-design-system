import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildUboCanvasWirePaths,
  createEmptyUboFilters,
  createInitialGraphState,
  UBO_CANVAS,
  UBO_FILTER_GROUPS,
  uboBranchMoreCount,
  uboBuildNodeIndex,
  uboCollectCanvasNodes,
  uboCountSelectedFilters,
  uboFindParentId,
  uboFirstSelectedFilterLabel,
  uboHasActiveFilters,
  uboShouldDimNode,
} from "../ubo/logic";
import type { GraphMode, LabsTreeNode, NodeIndexEntry, RiskFilterMeta, UboGraphState } from "../ubo/types";
import {
  BuildingIcon,
  CloseIcon,
  FilterIcon,
  FullscreenEnterIcon,
  graphIcon,
  PersonIcon,
  SearchIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "./icons";
import { UboDrawer } from "./UboDrawer";

interface UboGraphProps {
  tree: LabsTreeNode;
  riskFilter?: RiskFilterMeta | null;
}

function getFullscreenRoot() {
  return document.getElementById("kyb-ubo-graph-fullscreen-root");
}

function isBrowserFullscreen() {
  const root = getFullscreenRoot();
  return !!(root && document.fullscreenElement === root);
}

function GraphNodeButton({
  node,
  state,
  index,
  mode,
  onSelect,
  onHover,
}: {
  node: LabsTreeNode;
  state: UboGraphState;
  index: Record<string, NodeIndexEntry>;
  mode: GraphMode;
  onSelect: (nodeId: string) => void;
  onHover: (nodeId: string | null) => void;
}) {
  const classes = ["kyb-ubo-node", "kyb-ubo-node--button"];
  if (state.selectedId === node.id) classes.push("kyb-ubo-node--selected");
  if (node.risk === "medium") classes.push("kyb-ubo-node--risk-medium");
  if (node.risk === "high") classes.push("kyb-ubo-node--risk-high");
  if (uboShouldDimNode(node, state, index, mode)) classes.push("kyb-ubo-node--dimmed");
  if (!state.showBusiness && node.type === "business") classes.push("kyb-ubo-node--hidden");
  if (!state.showPerson && node.type === "person") classes.push("kyb-ubo-node--hidden");

  return (
    <button
      type="button"
      className={classes.join(" ")}
      data-kyb-ubo-node
      data-kyb-ubo-node-id={node.id}
      aria-pressed={state.selectedId === node.id ? "true" : "false"}
      onClick={() => onSelect(node.id)}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      <span className={`kyb-ubo-node__icon kyb-ubo-node__icon--${node.type || "business"}`} aria-hidden="true">
        {graphIcon(node.type)}
      </span>
      <span className="kyb-ubo-node__copy">
        <span className="kyb-ubo-node__name">{node.name}</span>
        <span className="kyb-ubo-node__meta">{node.subtitle}</span>
      </span>
    </button>
  );
}

export function UboGraph({ tree, riskFilter }: UboGraphProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<UboGraphState>(createInitialGraphState);
  const [mode, setMode] = useState<GraphMode>("inline");
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originPanX: number;
    originPanY: number;
    moved: boolean;
  } | null>(null);

  const index = useMemo(() => uboBuildNodeIndex(tree), [tree]);
  const canvasNodes = useMemo(() => uboCollectCanvasNodes(tree, state, mode), [tree, state, mode]);
  const wirePaths = useMemo(() => buildUboCanvasWirePaths(tree, state, mode), [tree, state, mode]);
  const selectedNode = state.selectedId ? index[state.selectedId]?.node : null;
  const showDrawer = !!selectedNode;

  const filterCount = uboCountSelectedFilters(state.filters);
  const hasFilterSelection = uboHasActiveFilters(state.filters);
  const filterLabel = hasFilterSelection
    ? uboFirstSelectedFilterLabel(state.filters)
    : riskFilter?.label || "";
  const filterCounter =
    riskFilter?.count && riskFilter.count > 0
      ? `+${riskFilter.count}`
      : hasFilterSelection && filterCount > 1
        ? `+${filterCount - 1}`
        : "";

  const refreshMode = useCallback(() => {
    setMode(isBrowserFullscreen() ? "fullscreen" : "inline");
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", refreshMode);
    return () => document.removeEventListener("fullscreenchange", refreshMode);
  }, [refreshMode]);

  useEffect(() => {
 const surface = surfaceRef.current;
    if (!surface || !(window as Window & { TdsDropdownPanel?: { initMenus: (root: Element) => void } }).TdsDropdownPanel) {
      return;
    }
    (window as Window & { TdsDropdownPanel: { initMenus: (root: Element) => void } }).TdsDropdownPanel.initMenus(surface);
  }, [state.filters, mode]);

  const updateState = useCallback((patch: Partial<UboGraphState> | ((current: UboGraphState) => UboGraphState)) => {
    setState((current) => (typeof patch === "function" ? patch(current) : { ...current, ...patch }));
  }, []);

  const handleNodeSelect = useCallback(
    (nodeId: string) => {
      updateState((current) => ({
        ...current,
        selectedId: current.selectedId === nodeId ? null : nodeId,
      }));
    },
    [updateState]
  );

  const handleNodeHover = useCallback(
    (nodeId: string | null) => {
      updateState((current) => ({ ...current, hoveredId: nodeId }));
    },
    [updateState]
  );

  const handleMoreClick = useCallback(
    (branchId: string) => {
      const branch = (tree.children || []).find((item) => item.id === branchId);
      if (!branch) return;
      if (branch.moreHidden?.length) {
        updateState((current) => ({
          ...current,
          expandedMore: { ...current.expandedMore, [branchId]: true },
        }));
      } else {
        updateState((current) => ({
          ...current,
          expandedChildren: { ...current.expandedChildren, [branchId]: true },
        }));
      }
    },
    [tree, updateState]
  );

  const handleConnectedSelect = useCallback(
    (connectedId: string) => {
      const parentId = uboFindParentId(tree, connectedId);
      updateState((current) => ({
        ...current,
        selectedId: connectedId,
        expandedChildren: parentId
          ? { ...current.expandedChildren, [parentId]: true }
          : current.expandedChildren,
      }));
    },
    [tree, updateState]
  );

  const handleZoom = useCallback(
    (action: "in" | "out" | "fit") => {
      if (action === "in") {
        updateState((current) => ({ ...current, zoom: Math.min(1.4, current.zoom + 0.1) }));
      } else if (action === "out") {
        updateState((current) => ({ ...current, zoom: Math.max(0.75, current.zoom - 0.1) }));
      } else {
        updateState({ zoom: 1, panX: 0, panY: 0 });
      }
    },
    [updateState]
  );

  const openFullscreen = useCallback(() => {
    const root = getFullscreenRoot();
    const request = root?.requestFullscreen?.bind(root) || root?.webkitRequestFullscreen?.bind(root);
    request?.().catch(() => undefined);
  }, []);

  const closeFullscreen = useCallback(() => {
    const exit = document.exitFullscreen?.bind(document) || document.webkitExitFullscreen?.bind(document);
    updateState({ selectedId: null });
    exit?.().catch(() => undefined);
  }, [updateState]);

  const handleFilterChange = useCallback(
    (groupId: string, valueId: string, checked: boolean) => {
      updateState((current) => ({
        ...current,
        filters: {
          ...current.filters,
          [groupId]: {
            ...current.filters[groupId as keyof typeof current.filters],
            [valueId]: checked,
          },
        },
      }));
    },
    [updateState]
  );

  const clearFilters = useCallback(() => {
    updateState({ filters: createEmptyUboFilters() });
  }, [updateState]);

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const stage = stageRef.current;
    if (stage?.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
    stage?.classList.remove("kyb-ubo-graph__stage--dragging");
    dragRef.current = null;
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      const target = event.target as HTMLElement;
      if (
        target.closest(
          "input, label, a, button, .kyb-ubo-graph__toolbar-card, .kyb-ubo-graph__legend, .kyb-ubo-graph__zoom, .kyb-ubo-graph__filter-btn, .kyb-ubo-graph__entity-toggle, .kyb-ubo-graph__search, .kyb-ubo-canvas__more-btn, .kyb-ubo-drawer, [data-kyb-ubo-node-id]"
        )
      ) {
        return;
      }

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originPanX: state.panX,
        originPanY: state.panY,
        moved: false,
      };
      stageRef.current?.setPointerCapture(event.pointerId);
    },
    [state.panX, state.panY]
  );

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved) {
      if (Math.hypot(dx, dy) < 4) return;
      drag.moved = true;
      stageRef.current?.classList.add("kyb-ubo-graph__stage--dragging");
    }
    setState((current) => ({
      ...current,
      panX: drag.originPanX + dx,
      panY: drag.originPanY + dy,
    }));
    event.preventDefault();
  }, []);

  const moreTags = (tree.children || [])
    .map((branch) => {
      const moreCount = uboBranchMoreCount(branch, state, mode, tree);
      const tagSlot = (UBO_CANVAS.moreTags as Record<string, { x: number; y: number }>)[branch.id];
      if (!moreCount || !tagSlot) return null;
      return (
        <div
          key={branch.id}
          className="kyb-ubo-canvas__more-slot"
          style={{ left: `${tagSlot.x}px`, top: `${tagSlot.y}px` }}
        >
          <button
            type="button"
            className="tds-tag tds-tag--md tds-tag--default kyb-ubo-canvas__more-btn"
            data-kyb-ubo-more={branch.id}
            onClick={() => handleMoreClick(branch.id)}
          >
            +{moreCount} more
          </button>
        </div>
      );
    })
    .filter(Boolean);

  return (
    <div
      ref={surfaceRef}
      className={`kyb-ubo-graph__surface${showDrawer ? " kyb-ubo-graph--with-drawer" : ""}`}
      data-kyb-ubo-surface
      data-kyb-ubo-mode={mode}
    >
      {mode === "fullscreen" && (
        <div className="kyb-ubo-graph__dialog-header">
          <h2 className="kyb-ubo-graph__dialog-title">Ownership / UBO</h2>
          <button type="button" className="kyb-ubo-graph__dialog-close" aria-label="Close" onClick={closeFullscreen}>
            <CloseIcon />
          </button>
        </div>
      )}

      <div className="kyb-ubo-graph__toolbar-card">
        <label className="kyb-ubo-graph__search">
          <span className="kyb-ubo-graph__search-icon" aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            className="kyb-ubo-graph__search-input"
            type="search"
            placeholder="Search entities..."
            data-kyb-ubo-search
            aria-label="Search entities in ownership graph"
            value={state.searchQuery}
            onChange={(event) => updateState({ searchQuery: event.target.value.trim().toLowerCase() })}
          />
        </label>

        <div className="kyb-ubo-graph__entity-toggle" role="group" aria-label="Entity type visibility">
          <button
            type="button"
            className={`kyb-ubo-graph__entity-btn${state.showBusiness ? " kyb-ubo-graph__entity-btn--active" : ""}`}
            aria-pressed={state.showBusiness ? "true" : "false"}
            data-kyb-ubo-entity="business"
            aria-label="Show business entities"
            onClick={() => updateState({ showBusiness: !state.showBusiness })}
          >
            <BuildingIcon />
          </button>
          <button
            type="button"
            className={`kyb-ubo-graph__entity-btn${state.showPerson ? " kyb-ubo-graph__entity-btn--active" : ""}`}
            aria-pressed={state.showPerson ? "true" : "false"}
            data-kyb-ubo-entity="person"
            aria-label="Show person entities"
            onClick={() => updateState({ showPerson: !state.showPerson })}
          >
            <PersonIcon />
          </button>
        </div>

        <div
          className={`tds-filter-button kyb-ubo-graph__filter-btn${hasFilterSelection ? " tds-filter-button--selected" : ""}${hasFilterSelection && filterCount > 1 ? " tds-filter-button--multi" : ""}`}
          data-kyb-ubo-filter
        >
          <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary" aria-expanded="false" aria-haspopup="menu">
            <span className="tds-btn__leading-icon" aria-hidden="true">
              <FilterIcon />
            </span>
            <span className="tds-filter-button__trigger-default">Filter</span>
            <span className="tds-filter-button__trigger-value">{filterLabel}</span>
            {filterCounter && (
              <span className="tds-counter tds-counter--primary tds-counter--sm tds-filter-button__counter">
                {filterCounter}
              </span>
            )}
            <span
              className="tds-btn__trailing-icon tds-filter-button__clear"
              aria-hidden="true"
              onClick={(event) => {
                event.stopPropagation();
                clearFilters();
              }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </span>
          </button>
          <div className="tds-dropdown-panel tds-dropdown-panel--filter-menu kyb-ubo-graph__filter-menu" role="menu" hidden>
            {UBO_FILTER_GROUPS.map((group) => (
              <div key={group.id}>
                <div className="tds-dropdown-panel__header">{group.label}</div>
                {group.options.map((option) => (
                  <label key={option.id} className="tds-action-list-item">
                    <input
                      type="checkbox"
                      className="tds-checkbox"
                      data-kyb-ubo-filter-checkbox
                      data-kyb-ubo-filter-group={group.id}
                      data-kyb-ubo-filter-value={option.id}
                      checked={state.filters[group.id][option.id]}
                      onChange={(event) => handleFilterChange(group.id, option.id, event.target.checked)}
                    />
                    <span className="tds-action-list-item__label">{option.label}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="kyb-ubo-graph__toolbar kyb-ubo-graph__toolbar--right">
        <div className="kyb-ubo-graph__zoom" role="group" aria-label="Graph zoom controls">
          <button type="button" className="kyb-ubo-graph__zoom-btn" aria-label="Zoom in" onClick={() => handleZoom("in")}>
            <ZoomInIcon />
          </button>
          <button type="button" className="kyb-ubo-graph__zoom-btn" aria-label="Zoom out" onClick={() => handleZoom("out")}>
            <ZoomOutIcon />
          </button>
          {mode === "inline" && (
            <button type="button" className="kyb-ubo-graph__zoom-btn" aria-label="Enter fullscreen" onClick={openFullscreen}>
              <FullscreenEnterIcon />
            </button>
          )}
        </div>
      </div>

      <div className="kyb-ubo-graph__legend" aria-label="Risk legend">
        <div className="kyb-ubo-graph__legend-item">
          <span className="kyb-ubo-graph__legend-swatch kyb-ubo-graph__legend-swatch--high" aria-hidden="true" />
          <span className="kyb-ubo-graph__legend-label">High Risk</span>
        </div>
        <div className="kyb-ubo-graph__legend-item">
          <span className="kyb-ubo-graph__legend-swatch kyb-ubo-graph__legend-swatch--medium" aria-hidden="true" />
          <span className="kyb-ubo-graph__legend-label">Medium Risk</span>
        </div>
      </div>

      <div
        ref={stageRef}
        className="kyb-ubo-graph__stage"
        data-kyb-ubo-stage
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="kyb-ubo-canvas"
          style={{
            width: `${UBO_CANVAS.width}px`,
            height: `${UBO_CANVAS.height}px`,
            ["--kyb-ubo-zoom" as string]: String(state.zoom),
            ["--kyb-ubo-pan-x" as string]: `${state.panX}px`,
            ["--kyb-ubo-pan-y" as string]: `${state.panY}px`,
          }}
        >
          <svg
            className="kyb-ubo-canvas__wires"
            viewBox={`0 0 ${UBO_CANVAS.width} ${UBO_CANVAS.height}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {wirePaths.map((wire, i) => (
              <path
                key={i}
                d={wire.d}
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={(state.selectedId || state.hoveredId) && uboShouldDimNode(index[wire.childId]?.node || tree, state, index, mode) ? 0.35 : 1}
              />
            ))}
          </svg>
          <div className="kyb-ubo-canvas__nodes">
            {canvasNodes.map(({ node, slot }) => (
              <div
                key={node.id}
                className="kyb-ubo-canvas__slot"
                style={{ left: `${slot.x}px`, top: `${slot.y}px` }}
                data-kyb-ubo-slot={node.id}
              >
                <GraphNodeButton node={node} state={state} index={index} mode={mode} onSelect={handleNodeSelect} onHover={handleNodeHover} />
              </div>
            ))}
            {moreTags}
          </div>
        </div>
      </div>

      {showDrawer && selectedNode && (
        <UboDrawer node={selectedNode} onConnectedSelect={handleConnectedSelect} />
      )}
    </div>
  );
}
