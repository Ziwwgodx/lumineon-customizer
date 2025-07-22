import React, { useState } from 'react';
import { Palette, Pipette, Gradient } from 'lucide-react';

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
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const presetColors = [
    '#ff0080', '#00ffff', '#00ff41', '#ff4500',
    '#8B5CF6', '#ffff00', '#ff1744', '#0099ff',
    '#ff6b35', '#f7931e', '#ffd700', '#32cd32',
    '#ff69b4', '#00ced1', '#9370db', '#ff4444'
  ];

  const gradientPresets = [
    ['#ff0080', '#8B5CF6'],
    ['#00ffff', '#0099ff'],
    ['#ff4500', '#ffff00'],
    ['#ff1744', '#ff69b4'],
    ['#32cd32', '#00ff41'],
    ['#9370db', '#ff6b35']
  ];

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const updateHSL = () => {
    const newColor = hslToHex(hue, saturation, lightness);
    onChange(newColor);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="text-pink-400" size={24} />
        <h3 className="text-xl font-semibold text-white">Couleurs Avancées</h3>
      </div>

      {/* Gradient Toggle */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-white font-medium">Mode Dégradé</span>
        <button
          onClick={() => onGradientToggle(!useGradient)}
          className={`relative w-12 h-6 rounded-full transition-all ${
            useGradient ? 'bg-pink-500' : 'bg-gray-600'
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              useGradient ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {useGradient ? (
        /* Gradient Mode */
        <div className="space-y-4">
          <div className="text-sm text-gray-300 mb-3">Dégradés Prédéfinis</div>
          <div className="grid grid-cols-3 gap-3">
            {gradientPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => onGradientChange(preset)}
                className="h-12 rounded-xl border-2 border-gray-600 hover:border-white transition-all"
                style={{
                  background: `linear-gradient(45deg, ${preset[0]}, ${preset[1]})`
                }}
              />
            ))}
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Couleur 1</label>
              <input
                type="color"
                value={gradientColors[0]}
                onChange={(e) => onGradientChange([e.target.value, gradientColors[1]])}
                className="w-full h-12 rounded-xl border border-gray-600 bg-transparent cursor-pointer"
                title="Première couleur du dégradé"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Couleur 2</label>
              <input
                type="color"
                value={gradientColors[1]}
                onChange={(e) => onGradientChange([gradientColors[0], e.target.value])}
                className="w-full h-12 rounded-xl border border-gray-600 bg-transparent cursor-pointer"
                title="Deuxième couleur du dégradé"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Single Color Mode */
        <div className="space-y-4">
          {/* Preset Colors */}
          <div className="grid grid-cols-8 gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => onChange(presetColor)}
                className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                  color === presetColor ? 'border-white shadow-lg' : 'border-gray-600'
                }`}
                style={{
                  backgroundColor: presetColor,
                  boxShadow: color === presetColor ? `0 0 20px ${presetColor}40` : 'none'
                }}
              />
            ))}
          </div>

          {/* Advanced HSL Controls */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-center gap-2 py-2 text-gray-300 hover:text-white transition-colors"
          >
            <Pipette size={16} />
            {showAdvanced ? 'Masquer' : 'Afficher'} les contrôles avancés
          </button>

          {showAdvanced && (
            <div className="space-y-4 pt-4 border-t border-gray-600">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Teinte</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hue}
                  onChange={(e) => {
                    setHue(Number(e.target.value));
                    updateHSL();
                  }}
                  className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Saturation</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={saturation}
                  onChange={(e) => {
                    setSaturation(Number(e.target.value));
                    updateHSL();
                  }}
                  className="w-full h-2 bg-gradient-to-r from-gray-500 to-current rounded-lg appearance-none cursor-pointer"
                  style={{ color: hslToHex(hue, 100, lightness) }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Luminosité</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightness}
                  onChange={(e) => {
                    setLightness(Number(e.target.value));
                    updateHSL();
                  }}
                  className="w-full h-2 bg-gradient-to-r from-black via-current to-white rounded-lg appearance-none cursor-pointer"
                  style={{ color: hslToHex(hue, saturation, 50) }}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-16 h-12 rounded-lg border border-gray-600 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono text-sm"
                  placeholder="#ff0080"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;