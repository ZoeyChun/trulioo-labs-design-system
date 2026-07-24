import { MarkerType } from '@xyflow/react';
import type { GraphNode, GraphEdge } from '../types/graph';

/** Structured positions: hub company center, owners above, subsidiaries below, entities on sides. */
const POSITIONS: Record<string, { x: number; y: number }> = {
  'c-meridian': { x: 0, y: 0 },

  // Owners & upstream (above hub)
  'c-silverline': { x: -220, y: -340 },
  'i-chen': { x: -140, y: -520 },
  'i-volkov': { x: 140, y: -520 },
  'i-kim': { x: -400, y: -520 },
  'i-wei': { x: -220, y: -660 },
  'd-transfer': { x: -360, y: -660 },

  // Direct subsidiaries (below hub)
  'c-apex': { x: -360, y: 220 },
  'c-pinnacle': { x: 360, y: 220 },
  'c-northstar': { x: 540, y: 120 },
  'c-pacific': { x: -540, y: 120 },

  // Second-tier companies
  'c-cascade': { x: -620, y: 420 },
  'c-zenith': { x: 620, y: -200 },

  // Directors & individuals (clustered near related companies)
  'i-williams': { x: -240, y: 60 },
  'i-petrov': { x: 100, y: 60 },
  'i-nakamura': { x: 500, y: -60 },
  'i-obrien': { x: 660, y: 280 },
  'i-okafor': { x: -720, y: 320 },
  'i-alrashid': { x: -660, y: 320 },
  'i-johnson': { x: -520, y: 520 },
  'i-fischer': { x: 720, y: -340 },

  // Addresses (perimeter)
  'a-london': { x: -300, y: -160 },
  'a-singapore': { x: 300, y: -160 },
  'a-melbourne': { x: 720, y: 200 },
  'a-newyork': { x: -520, y: -160 },
  'a-hongkong': { x: -720, y: 120 },
  'a-zurich': { x: 520, y: -420 },

  // Documents (bottom band)
  'd-cert': { x: -200, y: 560 },
  'd-annual': { x: 0, y: 560 },
  'd-kyc': { x: 320, y: 560 },
};

export function applyGraphLayout(nodes: GraphNode[]): GraphNode[] {
  return nodes.map((node) => ({
    ...node,
    position: POSITIONS[node.id] ?? node.position,
  }));
}

type Side = 'top' | 'right' | 'bottom' | 'left';

function primarySide(
  source: GraphNode,
  target: GraphNode,
): { source: Side; target: Side } {
  const sx = source.position.x;
  const sy = source.position.y;
  const tx = target.position.x;
  const ty = target.position.y;
  const dx = tx - sx;
  const dy = ty - sy;

  if (Math.abs(dx) > Math.abs(dy) * 0.85) {
    return dx > 0
      ? { source: 'right', target: 'left' }
      : { source: 'left', target: 'right' };
  }

  return dy > 0
    ? { source: 'bottom', target: 'top' }
    : { source: 'top', target: 'bottom' };
}

const SIDE_ROTATION: Side[] = ['top', 'right', 'bottom', 'left'];

function rotateSide(side: Side, steps: number): Side {
  const index = SIDE_ROTATION.indexOf(side);
  return SIDE_ROTATION[(index + steps + 4) % 4];
}

/** Assign handles so edges connect on the nearest side and parallel edges don't fully overlap. */
export function assignEdgeHandles(nodes: GraphNode[], edges: GraphEdge[]): GraphEdge[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const pairCount = new Map<string, number>();

  return edges.map((edge) => {
    const source = nodeMap.get(edge.source);
    const target = nodeMap.get(edge.target);
    if (!source || !target) return edge;

    const pairKey = [edge.source, edge.target].sort().join('::');
    const index = pairCount.get(pairKey) ?? 0;
    pairCount.set(pairKey, index + 1);

    const base = primarySide(source, target);
    const offset = index % 4;

    const sourceSide = rotateSide(base.source, offset);
    const targetSide = rotateSide(base.target, offset);

    const withHandles = {
      ...edge,
      sourceHandle: `source-${sourceSide}`,
      targetHandle: `target-${targetSide}`,
    };

    if (edge.type === 'ownership') {
      return {
        ...withHandles,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 14,
          height: 14,
          color: 'var(--color-edge-ownership)',
        },
      };
    }

    if (edge.type === 'director') {
      return {
        ...withHandles,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 12,
          height: 12,
          color: 'var(--color-edge-director)',
        },
      };
    }

    return withHandles;
  });
}
