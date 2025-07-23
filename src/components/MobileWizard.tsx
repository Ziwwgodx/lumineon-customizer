import React from 'react';
import { Type, Palette, Zap, ShoppingCart, Sparkles, Settings, Eye, CreditCard } from 'lucide-react';
import { NeonConfig } from '../types';

interface MobileWizardProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  config: NeonConfig;
}

const MobileWizard: React.FC<MobileWizardProps> = ({ currentStep, onStepClick, config }) => {
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
    { id: 1, icon: Type, label: 'Texte', color: 'text-blue-400', bgColor: 'bg-blue-500', hoverColor: 'hover:bg-blue-600', shadowColor: 'shadow-blue-500/50', guide: 'Écrivez votre message', progressColor: '#3b82f6' },
    { id: 2, icon: Palette, label: 'Couleurs', color: 'text-pink-400', bgColor: 'bg-pink-500', hoverColor: 'hover:bg-pink-600', shadowColor: 'shadow-pink-500/50', guide: 'Choisissez vos couleurs', progressColor: '#ec4899' },
    { id: 3, icon: Zap, label: 'Style', color: 'text-yellow-400', bgColor: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600', shadowColor: 'shadow-yellow-500/50', guide: 'Personnalisez le style', progressColor: '#eab308' },
    { id: 4, icon: Settings, label: 'Options', color: 'text-cyan-400', bgColor: 'bg-cyan-500', hoverColor: 'hover:bg-cyan-600', shadowColor: 'shadow-cyan-500/50', guide: 'Ajustez les détails', progressColor: '#06b6d4' },
    { id: 5, icon: ShoppingCart, label: 'Support', color: 'text-green-400', bgColor: 'bg-green-500', hoverColor: 'hover:bg-green-600', shadowColor: 'shadow-green-500/50', guide: 'Type de support', progressColor: '#22c55e' },
    { id: 6, icon: Eye, label: 'Finition', color: 'text-indigo-400', bgColor: 'bg-indigo-500', hoverColor: 'hover:bg-indigo-600', shadowColor: 'shadow-indigo-500/50', guide: 'Finitions premium', progressColor: '#6366f1' },
    { id: 7, icon: Sparkles, label: 'Taille', color: 'text-purple-400', bgColor: 'bg-purple-500', hoverColor: 'hover:bg-purple-600', shadowColor: 'shadow-purple-500/50', guide: 'Dimensions parfaites', progressColor: '#a855f7' },
    { id: 8, icon: CreditCard, label: 'Commander', color: 'text-orange-400', bgColor: 'bg-orange-500', hoverColor: 'hover:bg-orange-600', shadowColor: 'shadow-orange-500/50', guide: 'Finaliser la commande', progressColor: '#f97316' }
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
    <div className="lg:hidden fixed left-3 top-1/2 transform -translate-y-1/2 z-30 w-12 flex flex-col">
      {/* Mini Preview */}
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-white/20 rounded-xl p-2 mb-3 shadow-xl transform hover:scale-105 transition-all duration-300 group">
        <div className="text-xs text-white/80 mb-1 text-center font-medium">
          Live
        </div>
        <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-600/50">
          <div className="absolute inset-0 bg-black/60"></div>
          <div 
            className="text-xs font-bold text-center relative z-10 group-hover:scale-110 transition-transform duration-300"
            style={getPreviewStyle()}
          >
            {safeConfig.multiline 
              ? safeConfig.lines.map((line, i) => (
                  <div key={i}>{line || 'LIGNE'}</div>
                ))
              : (safeConfig.text || 'NÉON')
            }
          </div>
        </div>
      </div>

      {/* Wizard Steps */}
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-1 relative overflow-hidden">
        {/* Barre de progression colorée */}
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-500" style={{ background: `linear-gradient(to bottom, ${steps.slice(0, currentStep).map(step => step.progressColor).join(', ')})`, width: `${Math.max(4, (currentStep / 8) * 100)}%` }}></div>
        
        <div className="flex flex-col gap-1 justify-center relative z-10 py-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative group flex items-center"
          >
            <button
              onClick={() => onStepClick(step.id)}
              className={`w-8 h-8 rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
                currentStep === step.id 
                  ? `${step.bgColor} shadow-lg scale-110 ring-1 ring-white/60` 
                  : currentStep > step.id
                  ? `${step.bgColor} opacity-60`
                  : `bg-gray-700/80 hover:${step.bgColor} hover:scale-110 active:scale-95`
              }`}
              title={step.guide}
            >
              <step.icon className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                currentStep === step.id ? 'text-white' : currentStep > step.id ? 'text-white' : 'text-gray-400 group-hover:text-white'
              }`}>
              </step.icon>
              
              {/* Indicateur actuel */}
              {currentStep === step.id && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
              
              {/* Indicateur complété */}
              {currentStep > step.id && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full" />
              )}
            </button>

            {/* Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/20">
              <div className="font-bold text-purple-200">{step.label}</div>
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-2 border-transparent border-r-gray-900/95" />
            </div>
          </div>
        ))}
        </div>
        
        {/* Compteur */}
        <div className="mt-1 text-center relative z-10">
          <span className="text-xs text-white/70 font-medium">
            {currentStep}/8
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileWizard;