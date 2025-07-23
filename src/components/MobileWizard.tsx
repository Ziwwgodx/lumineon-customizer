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
    { id: 7, icon: CreditCard, label: 'Finaliser', color: 'text-orange-400', bgColor: 'bg-orange-500', hoverColor: 'hover:bg-orange-600', shadowColor: 'shadow-orange-500/50' }
  ];

  const getPreviewStyle = () => ({
    color: safeConfig.color,
    textShadow: `
      0 0 3px ${safeConfig.color},
      0 0 6px ${safeConfig.color},
      0 0 9px ${safeConfig.color}
    `,
    fontFamily: getFontFamily(safeConfig.font)
  });

  const getFontFamily = (fontId: string) => {
    const fontMap = {
      'tilt-neon': '"Tilt Neon", cursive',
      'orbitron': '"Orbitron", monospace',
      'audiowide': '"Audiowide", cursive',
      'electrolize': '"Electrolize", sans-serif',
      'modern': 'system-ui, sans-serif',
      'script': 'Georgia, serif',
      'bebas-neue': '"Bebas Neue", cursive',
      'righteous': '"Righteous", cursive',
      'russo-one': '"Russo One", sans-serif',
      'bungee': '"Bungee", cursive',
      'monoton': '"Monoton", cursive',
      'creepster': '"Creepster", cursive'
    };
    return fontMap[fontId as keyof typeof fontMap] || '"Tilt Neon", cursive';
  };

  const getDisplayText = () => {
    if (safeConfig.multiline && safeConfig.lines.length > 0) {
      return safeConfig.lines.filter(line => line.trim()).join(' ') || 'NÉON';
    }
    return safeConfig.text || 'NÉON';
  };

  return (
    <div className="lg:hidden fixed left-1 top-4 z-30 w-10 flex flex-col">
      {/* Wizard Steps */}
      <div className="bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-lg shadow-xl shadow-purple-500/20 p-1 transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex flex-col gap-1">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative group"
          >
            <button
              onClick={() => onStepClick(step.id)}
              className={`w-8 h-8 rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
                currentStep === step.id 
                  ? `${step.bgColor} ${step.shadowColor} shadow-md scale-105 ring-1 ring-white/30` 
                  : `bg-gray-800/50 ${step.hoverColor} hover:scale-105 hover:shadow-sm hover:${step.shadowColor} active:scale-95`
              }`}
            >
              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              
              <step.icon 
                size={12} 
                className={`relative z-10 ${
                  currentStep === step.id ? 'text-white drop-shadow-sm' : 'text-gray-400 group-hover:text-white'
                } transition-all duration-300`}
              />
              
              {/* Progress indicator */}
              {currentStep === step.id && (
                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-sm" />
              )}
              
              {/* Completed indicator */}
              {currentStep > step.id && (
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
                </div>
              )}
              
              {/* Numéro de l'étape */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white/80 bg-black/50 rounded-full w-3 h-3 flex items-center justify-center">
                {step.id}
              </div>
            </button>

            {/* Hover tooltip */}
            <div className="absolute left-full ml-1 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-gray-700 group-hover:translate-x-1">
              {step.label}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border border-transparent border-r-gray-900/95" />
            </div>
          </div>
        ))}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-1 bg-gray-800/50 rounded-full h-0.5 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-pink-500 via-yellow-500 via-cyan-500 via-green-500 via-indigo-500 to-orange-500 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
        
        {/* Mini indicateur d'étape */}
        <div className="mt-0.5 text-center">
          <span className="text-xs text-gray-400 font-medium">{currentStep}/7</span>
        </div>
      </div>
    </div>
  );
};

export default MobileWizard;