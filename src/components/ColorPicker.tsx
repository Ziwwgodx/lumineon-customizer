import React, { useState } from 'react';
import { Palette, Pipette, BadgeCent as Gradient } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  gradientColors?: string[];
  useGradient: boolean;
  onChange: (color: string) => void;
  onGradientChange: (colors: string[]) => void;
  onGradientToggle: (enabled: boolean) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  gradientColors = [color, '#8B5CF6'],
  useGradient,
  onChange,
  onGradientChange,
  onGradientToggle
}) => {

  const presetColors = [
    '#ff0080', '#00ffff', '#00ff41', '#ff4500',
    '#8B5CF6', '#ffff00', '#ff1744', '#0099ff',
    '#ff6b35', '#f7931e', '#ffd700', '#32cd32',
    '#ff69b4', '#00ced1', '#9370db', '#ff4444'
  ];


  return (
    <div className="space-y-6">
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h4 className="text-lg font-semibold text-white">Couleurs Populaires</h4>
        </div>
        
        {/* Preset Colors */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              onClick={() => onChange(presetColor)}
              className={`group relative aspect-square rounded-2xl border-2 transition-all hover:scale-110 shadow-lg hover:shadow-xl ${
                color === presetColor ? 'border-white shadow-white/30' : 'border-gray-600 hover:border-gray-400'
              }`}
              style={{
                backgroundColor: presetColor,
                boxShadow: color === presetColor ? `0 0 20px ${presetColor}40` : 'none'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500 rounded-2xl"></div>
              {color === presetColor && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Custom Color Picker */}
        <div className="mt-6 flex items-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-16 h-12 rounded-xl border-2 border-gray-600 bg-transparent cursor-pointer hover:border-gray-400 transition-all"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="#ff0080"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;