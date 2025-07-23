import React from 'react';
import { Palette, Sparkles } from 'lucide-react';
import { NeonConfig } from '../../types';
import ColorPicker from '../ColorPicker';
import TrendingColors from '../TrendingColors';

interface ColorsGamingBlockProps {
  config: NeonConfig;
  updateConfig: (updates: Partial<NeonConfig>) => void;
}

const ColorsGamingBlock: React.FC<ColorsGamingBlockProps> = ({ config, updateConfig }) => {
  return (
    <div className="space-y-6">
      {/* Couleurs Tendance */}
      <div className="neon-card p-6 border-2 border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 shadow-lg shadow-pink-500/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-pink-500/20 p-3 rounded-xl border border-pink-400/30 shadow-lg shadow-pink-500/20">
            <Sparkles className="text-pink-400 animate-pulse" size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-full animate-ping"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-pink-400 neon-text">🎨 COULEURS GAMING</h2>
            <p className="text-pink-300 text-sm">Choisissez votre palette néon</p>
          </div>
        </div>

        <TrendingColors
          onColorSelect={(color) => updateConfig({ color })}
          currentColor={config.color}
        />
      </div>

      {/* Sélecteur Avancé */}
      <div className="neon-card p-6 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 shadow-lg shadow-purple-500/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-400/30 shadow-lg shadow-purple-500/20">
            <Palette className="text-purple-400 animate-pulse" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-400 neon-text">⚡ COULEURS AVANCÉES</h2>
            <p className="text-purple-300 text-sm">Personnalisation complète</p>
          </div>
        </div>

        <ColorPicker
          color={config.color}
          gradientColors={config.gradientColors}
          useGradient={config.useGradient}
          onChange={(color) => updateConfig({ color })}
          onGradientChange={(colors) => updateConfig({ gradientColors: colors })}
          onGradientToggle={(enabled) => updateConfig({ useGradient: enabled })}
        />
      </div>
    </div>
  );
};

export default ColorsGamingBlock;