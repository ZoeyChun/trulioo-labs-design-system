import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';
import { useGraphLayout } from './hooks/useGraphLayout';

export function GraphControls() {
  const { fitView, zoomIn, zoomOut, resetView } = useGraphLayout();

  const buttons = [
    { icon: ZoomIn, label: 'Zoom in', onClick: zoomIn },
    { icon: ZoomOut, label: 'Zoom out', onClick: zoomOut },
    { icon: Maximize2, label: 'Fit view', onClick: fitView },
    { icon: RotateCcw, label: 'Reset view', onClick: resetView },
  ];

  return (
    <div className="glass-panel absolute bottom-5 left-5 z-10 flex flex-col gap-0.5 rounded-xl p-1">
      {buttons.map(({ icon: Icon, label, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          title={label}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:text-text-primary hover:bg-hover transition-all duration-200"
        >
          <Icon className="w-4 h-4" strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}
