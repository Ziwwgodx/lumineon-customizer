import React, { useState } from 'react';
import { Type, Palette, Zap, ShoppingCart, Sparkles, Settings, Eye, Crown } from 'lucide-react';
import { NeonConfig } from '../types';

interface MobileWizardProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  config: NeonConfig;
}

const MobileWizard: React.FC<MobileWizardProps> = ({ currentStep, onStepClick, config }) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Provide default config values to prevent undefined errors
  const safeConfig = {
    color: '#ff0080',
    font: 'tilt-neon',
    multiline: false,
    lines: ['NÉON'],
    text: 'NÉON',
    ...config
  };

  const steps = [
    { id: 1, icon: Type, label: 'Texte', color: 'text-blue-400', bgColor: 'bg-blue-500', emoji: '✏️' },
    { id: 2, icon: Palette, label: 'Couleurs', color: 'text-pink-400', bgColor: 'bg-pink-500', emoji: '🎨' },
    { id: 3, icon: Zap, label: 'Style', color: 'text-yellow-400', bgColor: 'bg-yellow-500', emoji: '⚡' },
    { id: 4, icon: Settings, label: 'Éclairage', color: 'text-purple-400', bgColor: 'bg-purple-500', emoji: '💡' },
    { id: 5, icon: ShoppingCart, label: 'Taille', color: 'text-green-400', bgColor: 'bg-green-500', emoji: '📏' },
    { id: 6, icon: Crown, label: 'Support', color: 'text-orange-400', bgColor: 'bg-orange-500', emoji: '🏆' },
    { id: 7, icon: Eye, label: 'Fixation', color: 'text-cyan-400', bgColor: 'bg-cyan-500', emoji: '🔧' },
    { id: 8, icon: Sparkles, label: 'Finaliser', color: 'text-indigo-400', bgColor: 'bg-indigo-500', emoji: '✨' }
  ];

  const getPreviewStyle = () => ({
    color: safeConfig.color,
    textShadow: `
      0 0 3px ${safeConfig.color},
      0 0 6px ${safeConfig.color},
      0 0 9px ${safeConfig.color}
    `,
    fontFamily: safeConfig.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
  });

  return (
    <>
      {/* Mini Preview - Collé au-dessus de l'étape 1 */}
      <div className="lg:hidden mb-4 bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl p-4 shadow-xl shadow-purple-500/20">
        <div className="text-xs text-gray-400 mb-2 text-center flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          Aperçu temps réel
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-700">
          <div className="absolute inset-0 bg-black/60"></div>
          <div 
            className="text-sm font-bold text-center relative z-10 animate-pulse"
            style={getPreviewStyle()}
          >
            {safeConfig.multiline 
              ? safeConfig.lines.map((line, i) => (
                  <div key={i}>{line || 'LIGNE'}</div>
                ))
              : (safeConfig.text || 'NÉON')
            }
          </div>
          {/* Effet de reflet */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-6 opacity-30 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${safeConfig.color}40, transparent)`
            }}
          />
        </div>
        <div className="text-center mt-2">
          <div className="text-xs text-gray-500">
            {safeConfig.size || '50cm'} • Étape {currentStep}/8
          </div>
        </div>
      </div>

      {/* Wizard Compact - 8 étapes */}
      <div className="lg:hidden mb-6 bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-xl shadow-purple-500/20 p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-semibold text-white">Configuration</h3>
          </div>
          <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
            {currentStep}/8
          </span>
        </div>
        
        {/* Grid 4x2 pour les 8 étapes */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isHovered = hoveredStep === step.id;
            
            return (
              <div
                key={step.id}
                className="relative group"
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <button
                  onClick={() => onStepClick(step.id)}
                  className={`w-full aspect-square rounded-xl transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden text-xs font-medium ${
                    isActive 
                      ? `${step.bgColor} shadow-lg shadow-${step.bgColor.split('-')[1]}-500/50 scale-110 border-2 border-white/30` 
                      : isCompleted
                      ? 'bg-green-600/80 shadow-md shadow-green-500/30 border border-green-400/50'
                      : 'bg-gray-800/50 hover:bg-gray-700/50 hover:scale-105 border border-gray-600/50'
                  } ${isHovered ? 'scale-105' : ''}`}
                >
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Emoji principal */}
                  <div className="text-lg mb-1 relative z-10">
                    {step.emoji}
                  </div>
                  
                  {/* Label */}
                  <div className={`text-xs font-medium relative z-10 ${
                    isActive ? 'text-white' : isCompleted ? 'text-green-100' : 'text-gray-300'
                  }`}>
                    {step.label}
                  </div>
                  
                  {/* Indicateur d'état */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse border border-gray-800"></div>
                  )}
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>

                {/* Tooltip au hover */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-gray-700">
                    {step.emoji} {step.label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Barre de progression avec 8 couleurs */}
        <div className="bg-gray-800/50 rounded-full h-2 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-pink-400 via-yellow-400 via-purple-400 via-green-400 via-orange-400 via-cyan-400 to-indigo-400 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
        
        {/* Indicateur textuel */}
        <div className="text-center mt-2">
          <div className="text-xs text-gray-400">
            {currentStep < 8 ? `Étape suivante: ${steps[currentStep]?.label}` : 'Configuration terminée ! 🎉'}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileWizard;