import React from 'react';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

type Props = {
  zoom: number;
  setZoom: (zoom: number) => void;
  onRotate: () => void;
};

export const CropControls: React.FC<Props> = ({ zoom, setZoom, onRotate }) => {
  const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 1));

  return (
    <div className="flex items-center justify-center gap-4 p-2">
      <button
        onClick={handleZoomOut}
        className="p-1.5 rounded-full hover:bg-gray-100"
        aria-label="Zoom out"
      >
        <ZoomOut className="h-4 w-4" />
      </button>
      
      <input
        type="range"
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        aria-label="Zoom"
        onChange={(e) => setZoom(Number(e.target.value))}
        className="w-24"
      />
      
      <button
        onClick={handleZoomIn}
        className="p-1.5 rounded-full hover:bg-gray-100"
        aria-label="Zoom in"
      >
        <ZoomIn className="h-4 w-4" />
      </button>

      <div className="w-px h-6 bg-gray-200" />

      <button
        onClick={onRotate}
        className="p-1.5 rounded-full hover:bg-gray-100"
        aria-label="Rotate 90 degrees"
      >
        <RotateCw className="h-4 w-4" />
      </button>
    </div>
  );
};