import { Handle, Position } from '@xyflow/react';

const handleClass = '!w-1 !h-1 !min-w-0 !min-h-0 !border-0 !bg-transparent !opacity-0';

const sides = [
  { position: Position.Top, id: 'top' },
  { position: Position.Right, id: 'right' },
  { position: Position.Bottom, id: 'bottom' },
  { position: Position.Left, id: 'left' },
] as const;

/** Invisible handles on all four sides of the node body for clean edge attachment. */
export function NodeHandles() {
  return (
    <>
      {sides.map(({ position, id }) => (
        <Handle
          key={`source-${id}`}
          id={`source-${id}`}
          type="source"
          position={position}
          className={handleClass}
        />
      ))}
      {sides.map(({ position, id }) => (
        <Handle
          key={`target-${id}`}
          id={`target-${id}`}
          type="target"
          position={position}
          className={handleClass}
        />
      ))}
    </>
  );
}
