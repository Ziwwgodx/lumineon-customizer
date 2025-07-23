import React from 'react';
import { Zap, Type } from 'lucide-react';
import { NeonConfig } from '../../types';
import AdvancedConfigurator from '../AdvancedConfigurator';

interface StyleGamingBlockProps {
  config: NeonConfig;
  updateConfig: (updates: Partial<NeonConfig>) => void;
  onResetPositions?: () => void;
}

const StyleGamingBlock: React.FC<StyleGamingBlockProps> = ({ 
  config, 
  updateConfig, 
  onResetPositions 
}) => {
  const effects = [
    { id: 'static', name: 'Statique', description: 'Éclairage constant', icon: '⚡' },
    { id: 'pulse', name: 'Pulsation', description: 'Battement lumineux', icon: '💓' },
    { id: 'blink', name: 'Clignotant', description: 'Flash intermittent', icon: '✨' },
    { id: 'gradient', name: 'Dégradé', description: 'Transition colorée', icon: '🌈' }
  ];

  const sizes = [
    { id: '50cm', name: '50cm', description: 'Compact et élégant', price: '120€' },
    { id: '100cm', name: '100cm', description: 'Grand format impact', price: '200€' }
  ];

  return (
    <div className="space-y-6">
      {/* Effets Lumineux */}
      <div className="neon-card p-6 border-2 border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 shadow-lg shadow-yellow-500/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-500/20 p-3 rounded-xl border border-yellow-400/30 shadow-lg shadow-yellow-500/20">
            <Zap className="text-yellow-400 animate-pulse" size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full animate-ping"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 neon-text">⚡ EFFETS GAMING</h2>
            <p className="text-yellow-300 text-sm">Animations lumineuses</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {effects.map((effect) => (
            <button
              key={effect.id}
              onClick={() => updateConfig({ effect: effect.id })}
              className={`p-4 rounded-xl border-2 transition-all hover:scale-[1.02] text-left ${
                config.effect === effect.id
                  ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                  : 'border-gray-600 bg-gray-700/30 text-white hover:border-yellow-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl">{effect.icon}</div>
                {config.effect === effect.id && (
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="font-semibold">{effect.name}</div>
              <div className="text-sm text-gray-400">{effect.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tailles */}
      <div className="neon-card p-6 border-2 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 shadow-lg shadow-orange-500/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-500/20 p-3 rounded-xl border border-orange-400/30 shadow-lg shadow-orange-500/20">
            <div className="text-orange-400 text-2xl">📏</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-400 neon-text">📏 TAILLES GAMING</h2>
            <p className="text-orange-300 text-sm">Format de votre néon</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => updateConfig({ size: size.id })}
              className={`p-4 rounded-xl border-2 transition-all hover:scale-[1.02] text-left ${
                config.size === size.id
                  ? 'border-orange-400 bg-orange-400/10 text-orange-400'
                  : 'border-gray-600 bg-gray-700/30 text-white hover:border-orange-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-lg">{size.name}</div>
                <div className="text-sm font-bold bg-gray-800/50 px-2 py-1 rounded">
                  {size.price}
                </div>
              </div>
              <div className="text-sm text-gray-400">{size.description}</div>
              {config.size === size.id && (
                <div className="mt-2 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Polices */}
      <div className="neon-card p-6 border-2 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-lg shadow-cyan-500/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-cyan-500/20 p-3 rounded-xl border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
            <Type className="text-cyan-400 animate-pulse" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 neon-text">🔤 POLICES GAMING</h2>
            <p className="text-cyan-300 text-sm">Style typographique</p>
          </div>
        </div>

        <AdvancedConfigurator
          config={config}
          updateConfig={updateConfig}
          onResetPositions={onResetPositions}
        />
      </div>
    </div>
  );
};

export default StyleGamingBlock;