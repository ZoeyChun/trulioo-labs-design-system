import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildUboLayout,
  clampUboZoom,
  createEmptyUboFilters,
  createInitialGraphState,
  UBO_CANVAS,
  UBO_FILTER_GROUPS,
  UBO_ZOOM_STEP,
  uboBuildNodeIndex,
  uboConnectedEntities,
  uboCountSelectedFilters,
  uboFindParentId,
  uboFirstSelectedFilterLabel,
  uboShouldDimNode,
} from "../ubo/logic";
import type { GraphMode, LabsTreeNode, NodeIndexEntry, RiskFilterMeta, UboGraphState } from "../ubo/types";
import {
  BuildingIcon,
  CloseIcon,
  FilterIcon,
  ResetViewIcon,
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

/** Breathing room left around a card when nudging it into the visible area. */
const UBO_FOCUS_MARGIN = 16;
/** Largest zoom change a single wheel event may apply. */
const UBO_WHEEL_ZOOM_CAP = 1.25;

function getFullscreenRoot() {
  return document.getElementById("kyb-ubo-graph-fullscreen-root");
}

function isBrowserFullscreen() {
  const root = getFullscreenRoot();
  return !!(root && document.fullscreenElement === root);
}

function GraphNodeButton({
  node,
  structural,
  state,
  index,
  mode,
  onSelect,
  onHover,
}: {
  node: LabsTreeNode;
  structural: boolean;
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
  if (structural) classes.push("kyb-ubo-node--structural");

  return (
    <button
      type="button"
      className={classes.join(" ")}
      data-kyb-ubo-node
      data-kyb-ubo-node-id={node.id}
      title={structural ? "Filtered out, but shown to keep the ownership path intact" : undefined}
      aria-pressed={state.selectedId === node.id ? "true" : "false"}
      onClick={() => onSelect(node.id)}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      // Keyboard users get the same connection highlight as pointer hover.
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
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

export function UboGraph({ tree }: UboGraphProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<UboGraphState>(createInitialGraphState);
  const [mode, setMode] = useState<GraphMode>("inline");
  const [filterOpen, setFilterOpen] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originPanX: number;
    originPanY: number;
    moved: boolean;
  } | null>(null);
  /** Live touch points, used to detect and track a two-finger pinch. */
  const touchesRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchDistanceRef = useRef<number | null>(null);
  const zoomIdleRef = useRef<number | null>(null);
  /** Last pan this component applied itself, so a user's own pan is never undone. */
  const autoPanRef = useRef<number | null>(null);

  const index = useMemo(() => uboBuildNodeIndex(tree), [tree]);
  const layout = useMemo(() => buildUboLayout(tree, state, mode), [tree, state, mode]);
  const selectedNode = state.selectedId ? index[state.selectedId]?.node : null;
  const showDrawer = !!selectedNode;
  /* Turning off the last enabled type would leave an empty canvas. */
  const lockBusinessToggle = state.showBusiness && !state.showPerson;
  const lockPersonToggle = state.showPerson && !state.showBusiness;

  const userFilterCount = uboCountSelectedFilters(state.filters);
  const isFilterActive = userFilterCount > 0;
  const filterLabel = isFilterActive ? uboFirstSelectedFilterLabel(state.filters) : "";
  const isFilterMulti = userFilterCount > 1;
  const filterCounter = isFilterMulti ? `+${userFilterCount - 1}` : "";

  const refreshMode = useCallback(() => {
    setMode(isBrowserFullscreen() ? "fullscreen" : "inline");
  }, []);

  const updateState = useCallback((patch: Partial<UboGraphState> | ((current: UboGraphState) => UboGraphState)) => {
    setState((current) => (typeof patch === "function" ? patch(current) : { ...current, ...patch }));
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", refreshMode);
    return () => document.removeEventListener("fullscreenchange", refreshMode);
  }, [refreshMode]);

  /* The drawer must never describe a card the filter just removed from the canvas. */
  useEffect(() => {
    if (state.selectedId && !layout.slotById[state.selectedId]) {
      updateState({ selectedId: null });
    }
  }, [layout, state.selectedId, updateState]);

  useEffect(() => {
    if (!filterOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && filterRef.current?.contains(target)) return;
      setFilterOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFilterOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [filterOpen]);

  const clearFilters = useCallback(() => {
    setFilterOpen(false);
    updateState((current) => ({ ...current, filters: createEmptyUboFilters() }));
  }, [updateState]);

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

  const cancelStageDrag = useCallback((event: React.PointerEvent) => {
    event.stopPropagation();
    const stage = stageRef.current;
    if (stage?.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
    stage?.classList.remove("kyb-ubo-graph__stage--dragging");
    dragRef.current = null;
  }, []);

  const handleMoreClick = useCallback(
    (branchId: string) => {
      const branch = index[branchId]?.node;
      if (!branch) return;
      updateState((current) => ({
        ...current,
        expandedMore: branch.moreHidden?.length
          ? { ...current.expandedMore, [branchId]: true }
          : current.expandedMore,
        expandedChildren: branch.children?.length
          ? { ...current.expandedChildren, [branchId]: true }
          : current.expandedChildren,
      }));
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

  /** Suspends the CSS transition so continuous gestures track the fingers instead of lagging. */
  const markGestureZoom = useCallback(() => {
    stageRef.current?.classList.add("kyb-ubo-graph__stage--zooming");
    if (zoomIdleRef.current) window.clearTimeout(zoomIdleRef.current);
    zoomIdleRef.current = window.setTimeout(() => {
      stageRef.current?.classList.remove("kyb-ubo-graph__stage--zooming");
      zoomIdleRef.current = null;
    }, 180);
  }, []);

  /**
   * Scales around a screen point so the content under the fingers stays put.
   * The canvas is scaled about its top-centre, so that origin's on-screen position
   * is derived from untransformed layout values (offsetLeft/offsetWidth) plus the pan.
   */
  const zoomByFactor = useCallback((factor: number, clientX: number, clientY: number) => {
    setState((current) => {
      const nextZoom = clampUboZoom(current.zoom * factor);
      if (nextZoom === current.zoom) return current;

      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) return { ...current, zoom: nextZoom };

      const stageRect = stage.getBoundingClientRect();
      const originX = stageRect.left + canvas.offsetLeft + canvas.offsetWidth / 2 + current.panX;
      const originY = stageRect.top + canvas.offsetTop + current.panY;
      const ratio = 1 - nextZoom / current.zoom;

      return {
        ...current,
        zoom: nextZoom,
        panX: current.panX + (clientX - originX) * ratio,
        panY: current.panY + (clientY - originY) * ratio,
      };
    });
  }, []);

  const resetView = useCallback(() => {
    updateState({ zoom: 1, panX: 0, panY: 0 });
  }, [updateState]);

  const handleZoom = useCallback(
    (action: "in" | "out") => {
      const stageRect = stageRef.current?.getBoundingClientRect();
      const centerX = stageRect ? stageRect.left + stageRect.width / 2 : 0;
      const centerY = stageRect ? stageRect.top + stageRect.height / 2 : 0;
      zoomByFactor(action === "in" ? UBO_ZOOM_STEP : 1 / UBO_ZOOM_STEP, centerX, centerY);
    },
    [updateState, zoomByFactor]
  );

  /**
   * Trackpad pinch arrives as a ctrl-flagged wheel event. Bound natively because React
   * registers wheel listeners as passive, which would forbid preventing browser page zoom.
   */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      markGestureZoom();
      // A trackpad pinch sends many small deltas, but a mouse notch sends ~120
      // at once, which would jump straight to the zoom limit. Cap per event.
      const factor = Math.exp(-event.deltaY / 100);
      const capped = Math.min(UBO_WHEEL_ZOOM_CAP, Math.max(1 / UBO_WHEEL_ZOOM_CAP, factor));
      zoomByFactor(capped, event.clientX, event.clientY);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [markGestureZoom, zoomByFactor]);

  useEffect(
    () => () => {
      if (zoomIdleRef.current) window.clearTimeout(zoomIdleRef.current);
    },
    []
  );

  /**
   * The drawer takes 400px off the stage, which is enough to push edge cards
   * (Steven, Patricia, Sarah) out of the clipped viewport and make them
   * unclickable. Nudge the canvas by the smallest amount that brings the
   * selected card fully into what's left, so surrounding context is kept, then
   * undo that nudge when the drawer closes.
   *
   * Deliberately keyed on the selection alone: zoom/pan are read from the
   * render that changed it, and re-running on every pan would fight dragging.
   */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (!state.selectedId) {
      if (autoPanRef.current !== null && state.panX === autoPanRef.current) {
        autoPanRef.current = null;
        updateState({ panX: 0 });
      }
      return;
    }

    const slot = layout.slotById[state.selectedId];
    if (!slot) return;

    const styles = getComputedStyle(stage);
    const available =
      stage.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
    if (!(available > 0)) return;

    // Card edges relative to the centre of the area the drawer leaves visible.
    const limit = available / 2 - UBO_FOCUS_MARGIN;
    const left = (slot.x - layout.width / 2) * state.zoom + state.panX;
    const right = (slot.x + UBO_CANVAS.nodeWidth - layout.width / 2) * state.zoom + state.panX;

    let panX = state.panX;
    if (left < -limit) panX += -limit - left;
    else if (right > limit) panX -= right - limit;
    if (panX === state.panX) return;

    autoPanRef.current = panX;
    updateState({ panX });
  }, [state.selectedId]);

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
        // Manual drill-downs would otherwise survive and contradict a new depth limit.
        expandedMore: groupId === "separation" ? {} : current.expandedMore,
        expandedChildren: groupId === "separation" ? {} : current.expandedChildren,
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

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      touchesRef.current.delete(event.pointerId);
      // Lifting one finger ends the pinch; the remaining finger must not inherit its span.
      if (touchesRef.current.size < 2) pinchDistanceRef.current = null;
    }

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
      // Track every touch, wherever it lands, so a pinch starting on a card still zooms.
      if (event.pointerType === "touch") {
        touchesRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
        if (touchesRef.current.size === 2) {
          const [a, b] = [...touchesRef.current.values()];
          pinchDistanceRef.current = Math.hypot(a.x - b.x, a.y - b.y);
          cancelStageDrag(event);
          return;
        }
        if (touchesRef.current.size > 2) return;
      }

      if (event.button !== 0) return;
      const target = event.target as HTMLElement;
      if (
        target.closest(
          "input, label, a, button, .kyb-ubo-graph__toolbar-card, .kyb-ubo-graph__legend, .kyb-ubo-graph__zoom, .kyb-ubo-graph__filter-btn, .kyb-ubo-graph__entity-toggle, .kyb-ubo-graph__search, .kyb-ubo-canvas__more-slot, .kyb-ubo-canvas__more-btn, .kyb-ubo-drawer, [data-kyb-ubo-node-id]"
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
    [cancelStageDrag, state.panX, state.panY]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch" && touchesRef.current.has(event.pointerId)) {
        touchesRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

        if (touchesRef.current.size >= 2) {
          const [a, b] = [...touchesRef.current.values()];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          const previous = pinchDistanceRef.current;
          if (previous && previous > 0 && distance > 0) {
            markGestureZoom();
            zoomByFactor(distance / previous, (a.x + b.x) / 2, (a.y + b.y) / 2);
          }
          pinchDistanceRef.current = distance;
          event.preventDefault();
          return;
        }
      }

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
    },
    [markGestureZoom, zoomByFactor]
  );

  const moreTags = layout.nodes
    .filter((item) => item.moreCount > 0)
    .map((item) => (
      <button
        key={item.node.id}
        type="button"
        className="kyb-ubo-canvas__more-slot tds-tag tds-tag--md tds-tag--default kyb-ubo-canvas__more-btn"
        style={{ left: `${item.moreX}px`, top: `${item.moreY}px` }}
        data-kyb-ubo-more={item.node.id}
        aria-label={`Show ${item.moreCount} more connected ${item.moreCount === 1 ? "entity" : "entities"}`}
        onPointerDown={cancelStageDrag}
        onClick={(event) => {
          event.stopPropagation();
          handleMoreClick(item.node.id);
        }}
      >
        +{item.moreCount} more
      </button>
    ));

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
            onChange={(event) => updateState({ searchQuery: event.target.value })}
          />
        </label>

        <div className="kyb-ubo-graph__entity-toggle" role="group" aria-label="Entity type visibility">
          <button
            type="button"
            className={`kyb-ubo-graph__entity-btn${state.showBusiness ? " kyb-ubo-graph__entity-btn--active" : ""}`}
            aria-pressed={state.showBusiness ? "true" : "false"}
            data-kyb-ubo-entity="business"
            aria-label="Show business entities"
            disabled={lockBusinessToggle}
            title={lockBusinessToggle ? "At least one entity type must stay visible" : undefined}
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
            disabled={lockPersonToggle}
            title={lockPersonToggle ? "At least one entity type must stay visible" : undefined}
            onClick={() => updateState({ showPerson: !state.showPerson })}
          >
            <PersonIcon />
          </button>
        </div>

        <div
          ref={filterRef}
          className={`tds-filter-button kyb-ubo-graph__filter-btn${isFilterActive ? " tds-filter-button--selected" : ""}${isFilterMulti ? " tds-filter-button--multi" : ""}${filterOpen ? " tds-filter-button--open" : ""}`}
          data-kyb-ubo-filter
          data-tds-dropdown-bound="1"
        >
          <button
            type="button"
            className="tds-btn tds-btn--md tds-btn--secondary"
            aria-expanded={filterOpen ? "true" : "false"}
            aria-haspopup="menu"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest(".tds-filter-button__clear")) {
                clearFilters();
                return;
              }
              setFilterOpen((open) => !open);
            }}
          >
            <span className="tds-btn__leading-icon" aria-hidden="true">
              <FilterIcon />
            </span>
            <span className="tds-filter-button__trigger-default">Filter</span>
            <span className="tds-filter-button__trigger-value">{filterLabel}</span>
            {isFilterMulti && (
              <span className="tds-counter tds-counter--primary tds-counter--sm tds-filter-button__counter">
                {filterCounter}
              </span>
            )}
            <span className="tds-btn__trailing-icon tds-filter-button__clear" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </span>
          </button>
          <div
            className="tds-dropdown-panel tds-dropdown-panel--filter-menu kyb-ubo-graph__filter-menu"
            role="menu"
            hidden={!filterOpen}
          >
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
                      onChange={(event) =>
                        handleFilterChange(group.id, option.id, event.target.checked)
                      }
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
          <button type="button" className="kyb-ubo-graph__zoom-btn" aria-label="Reset view" onClick={resetView}>
            <ResetViewIcon />
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
          ref={canvasRef}
          className="kyb-ubo-canvas"
          style={{
            width: `${layout.width}px`,
            height: `${layout.height}px`,
            ["--kyb-ubo-zoom" as string]: String(state.zoom),
            ["--kyb-ubo-pan-x" as string]: `${state.panX}px`,
            ["--kyb-ubo-pan-y" as string]: `${state.panY}px`,
          }}
        >
          <svg
            className="kyb-ubo-canvas__wires"
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {layout.wires.map((wire, i) => (
              <path
                key={i}
                d={wire.d}
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                // Not gated on selection/hover, so filters and search dim wires too.
                opacity={uboShouldDimNode(index[wire.childId]?.node || tree, state, index, mode) ? 0.35 : 1}
              />
            ))}
          </svg>
          <div className="kyb-ubo-canvas__nodes">
            {layout.nodes.map(({ node, x, y, structural }) => (
              <div
                key={node.id}
                className="kyb-ubo-canvas__slot"
                style={{ left: `${x}px`, top: `${y}px` }}
                data-kyb-ubo-slot={node.id}
              >
                <GraphNodeButton
                  node={node}
                  structural={structural}
                  state={state}
                  index={index}
                  mode={mode}
                  onSelect={handleNodeSelect}
                  onHover={handleNodeHover}
                />
              </div>
            ))}
            {moreTags}
          </div>
        </div>
      </div>

      {showDrawer && selectedNode && (
        <UboDrawer
          node={selectedNode}
          connected={uboConnectedEntities(selectedNode, index)}
          onConnectedSelect={handleConnectedSelect}
        />
      )}
    </div>
  );
}
