import React from 'react';
import { Grid, Magnet } from 'lucide-react';
import { GridSettings } from '../types';

interface GridOverlayProps {
  settings: GridSettings;
  onSettingsChange: (settings: GridSettings) => void;
  containerWidth: number;
  containerHeight: number;
}

const GridOverlay: React.FC<GridOverlayProps> = ({
  settings,
  onSettingsChange,
  containerWidth,
  containerHeight
}) => {
  const gridLines = [];
  
  if (settings.enabled) {
    // Vertical lines
    for (let x = 0; x <= containerWidth; x += settings.size) {
      gridLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={containerHeight}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
      );
    }
    
    // Horizontal lines
    for (let y = 0; y <= containerHeight; y += settings.size) {
      gridLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={containerWidth}
          y2={y}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
      );
    }
  }

  return (
    <>
      {/* Grid SVG Overlay */}
      {settings.enabled && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={containerWidth}
          height={containerHeight}
        >
          {gridLines}
        </svg>
      )}
      
      {/* Grid Controls */}
      <div className="absolute top-4 left-4 bg-black/50 rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSettingsChange({ ...settings, enabled: !settings.enabled })}
            className={`p-2 rounded-lg transition-all ${
              settings.enabled ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
            }`}
            title="Activer/Désactiver la grille"
          >
            <Grid size={16} />
          </button>
          
          <button
            onClick={() => onSettingsChange({ ...settings, snap: !settings.snap })}
            className={`p-2 rounded-lg transition-all ${
              settings.snap ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'
            }`}
            title="Activer/Désactiver l'aimantation"
          >
            <Magnet size={16} />
          </button>
        </div>
        
        {settings.enabled && (
          <div className="flex items-center gap-2">
            <span className="text-white text-xs">Taille:</span>
            <input
              type="range"
              min="10"
              max="50"
              value={settings.size}
              onChange={(e) => onSettingsChange({ ...settings, size: Number(e.target.value) })}
              className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white text-xs w-6">{settings.size}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default GridOverlay;