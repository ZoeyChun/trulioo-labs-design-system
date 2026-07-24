import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

export function useGraphLayout() {
  const { fitView, zoomIn, zoomOut, setViewport, getViewport } = useReactFlow();

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.15, duration: 400 });
  }, [fitView]);

  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 200 });
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 200 });
  }, [zoomOut]);

  const handleResetView = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 400 });
  }, [setViewport]);

  const handleGetZoom = useCallback(() => {
    return getViewport().zoom;
  }, [getViewport]);

  return {
    fitView: handleFitView,
    zoomIn: handleZoomIn,
    zoomOut: handleZoomOut,
    resetView: handleResetView,
    getZoom: handleGetZoom,
  };
}
