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
    { id: 1, icon: Type, label: 'Texte', color: 'text-blue-400', bgColor: 'bg-blue-500', hoverColor: 'hover:bg-blue-600', shadowColor: 'shadow-blue-500/50' },
    { id: 2, icon: Palette, label: 'Couleurs', color: 'text-pink-400', bgColor: 'bg-pink-500', hoverColor: 'hover:bg-pink-600', shadowColor: 'shadow-pink-500/50' },
    { id: 3, icon: Zap, label: 'Style', color: 'text-yellow-400', bgColor: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600', shadowColor: 'shadow-yellow-500/50' },
    { id: 4, icon: Settings, label: 'Échange', color: 'text-cyan-400', bgColor: 'bg-cyan-500', hoverColor: 'hover:bg-cyan-600', shadowColor: 'shadow-cyan-500/50' },
    { id: 5, icon: ShoppingCart, label: 'Support', color: 'text-green-400', bgColor: 'bg-green-500', hoverColor: 'hover:bg-green-600', shadowColor: 'shadow-green-500/50' },
    { id: 6, icon: Eye, label: 'Finition', color: 'text-indigo-400', bgColor: 'bg-indigo-500', hoverColor: 'hover:bg-indigo-600', shadowColor: 'shadow-indigo-500/50' },
    { id: 7, icon: Sparkles, label: 'Taille', color: 'text-purple-400', bgColor: 'bg-purple-500', hoverColor: 'hover:bg-purple-600', shadowColor: 'shadow-purple-500/50' },
    { id: 8, icon: CreditCard, label: 'Finaliser', color: 'text-orange-400', bgColor: 'bg-orange-500', hoverColor: 'hover:bg-orange-600', shadowColor: 'shadow-orange-500/50' }
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
    <div className="lg:hidden fixed left-2 top-4 bottom-4 z-30 w-16 flex flex-col">
      {/* Mini Preview */}
      <div className="bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-xl p-2 mb-3 shadow-xl shadow-purple-500/20 transform hover:scale-105 transition-all duration-300">
        <div className="text-xs text-gray-400 mb-1 text-center font-medium">Live</div>
        <div className="aspect-video bg-gray-800 rounded-md flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/60"></div>
          <div 
            className="text-xs font-bold text-center relative z-10 animate-pulse"
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
      <div className="bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-xl shadow-xl shadow-purple-500/20 p-1.5 flex-1 transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex flex-col gap-2 h-full justify-center">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative group"
          >
            <button
              onClick={() => onStepClick(step.id)}
              className={`w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
                currentStep === step.id 
                  ? `${step.bgColor} ${step.shadowColor} shadow-lg scale-110 ring-2 ring-white/30` 
                  : `bg-gray-800/50 ${step.hoverColor} hover:scale-110 hover:shadow-md hover:${step.shadowColor} active:scale-95`
              }`}
            >
              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              
              <step.icon 
                size={18} 
                className={`relative z-10 ${
                  currentStep === step.id ? 'text-white drop-shadow-sm' : 'text-gray-400 group-hover:text-white'
                } transition-all duration-300`}
              />
              
              {/* Progress indicator */}
              {currentStep === step.id && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-sm" />
              )}
              
              {/* Completed indicator */}
              {currentStep > step.id && (
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                </div>
              )}
              
              {/* Numéro de l'étape */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white/80 bg-black/50 rounded-full w-4 h-4 flex items-center justify-center">
                {step.id}
              </div>
            </button>

            {/* Hover tooltip */}
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-gray-700 group-hover:translate-x-1">
              {step.label}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-2 border-transparent border-r-gray-900/95" />
            </div>
          </div>
        ))}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2 bg-gray-800/50 rounded-full h-1 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-pink-500 via-yellow-500 via-cyan-500 via-green-500 via-indigo-500 via-purple-500 to-orange-500 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
        
        {/* Mini indicateur d'étape */}
        <div className="mt-1 text-center">
          <span className="text-xs text-gray-400 font-medium">{currentStep}/8</span>
        </div>
      </div>
    </div>
  );
};

export default MobileWizard;