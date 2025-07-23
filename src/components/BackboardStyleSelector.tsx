import React from 'react';
import { Layers, Square, Hexagon, X, Image } from 'lucide-react';
import { NeonConfig } from '../types';
import Tooltip from './Tooltip';

interface BackboardStyleSelectorProps {
  config: NeonConfig;
  updateConfig: (updates: Partial<NeonConfig>) => void;
}

const BackboardStyleSelector: React.FC<BackboardStyleSelectorProps> = ({
  config,
  updateConfig
}) => {
  const backboardStyles = [
    {
      id: 'rectangle' as const,
      name: '🟫 Cut to Rectangle',
      description: 'Fond rectangulaire classique',
      icon: Square,
      preview: 'bg-gray-800/60 rounded-lg'
    },
    {
      id: 'outline' as const,
      name: '🔲 Cut to Outline',
      description: 'Contour suivant la forme du texte',
      icon: Hexagon,
      preview: 'border-2 border-dashed border-white/60 bg-gray-800/30 rounded-lg'
    },
    {
      id: 'shape' as const,
      name: '🧩 Cut to Shape',
      description: 'Forme personnalisée stylisée',
      icon: Layers,
      preview: 'bg-gradient-to-br from-gray-800/60 to-gray-700/60 rounded-2xl'
    },
    {
      id: 'none' as const,
      name: '🚫 No Backboard',
      description: 'Aucun fond, néon seul',
      icon: X,
      preview: 'bg-transparent'
    },
    {
      id: 'printed' as const,
      name: '🖼️ Lettres - Printed Backing',
      description: 'Fond imprimé avec motifs',
      icon: Image,
      preview: 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg'
    }
  ];

  const currentStyle = backboardStyles.find(style => style.id === config.backboardStyle) || backboardStyles[0];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Layers className="text-indigo-400" size={24} />
        <h3 className="text-xl font-semibold text-white">Style de Fond</h3>
        <Tooltip 
          content="Choisissez le style d'arrière-plan pour votre néon. Cela affecte l'apparence finale et le prix."
          variant="info"
        />
      </div>

      {/* Preview actuel */}
      <div className="mb-6 p-4 bg-gray-900/50 rounded-xl border border-gray-600">
        <div className="text-sm text-gray-400 mb-2">Aperçu du style sélectionné :</div>
        <div className="relative h-20 flex items-center justify-center">
          <div className={`absolute inset-2 ${currentStyle.preview} transition-all duration-300`}></div>
          <div 
            className="relative z-10 text-lg font-bold"
            style={{
              color: config.color,
              textShadow: `0 0 10px ${config.color}`,
              fontFamily: config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
            }}
          >
            {config.text || 'NÉON'}
          </div>
        </div>
        <div className="text-center text-sm text-gray-300 mt-2">
          {currentStyle.name}
        </div>
      </div>

      {/* Sélecteur de styles */}
      <div className="space-y-3">
        {backboardStyles.map((style) => {
          const IconComponent = style.icon;
          const isSelected = config.backboardStyle === style.id;
          
          return (
            <button
              key={style.id}
              onClick={() => updateConfig({ backboardStyle: style.id })}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                isSelected
                  ? 'border-indigo-400 bg-indigo-400/10 text-indigo-400'
                  : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
              }`}
            >
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-500/20' : 'bg-gray-600/50'}`}>
                <IconComponent size={20} className={isSelected ? 'text-indigo-400' : 'text-gray-400'} />
              </div>
              
              <div className="flex-1 text-left">
                <div className="font-semibold">{style.name}</div>
                <div className="text-sm text-gray-400">{style.description}</div>
              </div>
              
              {/* Mini preview */}
              <div className="w-12 h-8 relative border border-gray-500 rounded overflow-hidden">
                <div className={`absolute inset-0 ${style.preview}`}></div>
                <div 
                  className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                  style={{
                    color: config.color,
                    textShadow: `0 0 3px ${config.color}`
                  }}
                >
                  A
                </div>
              </div>
              
              {isSelected && (
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Info sur les prix */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="text-blue-400 mt-1">💰</div>
          <div>
            <div className="text-blue-400 font-medium text-sm">Impact sur le prix</div>
            <div className="text-blue-300 text-sm mt-1">
              • <strong>Rectangle/Outline</strong> : Prix standard<br/>
              • <strong>Shape/Printed</strong> : +15€ (découpe personnalisée)<br/>
              • <strong>No Backboard</strong> : -10€ (sans fond)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackboardStyleSelector;