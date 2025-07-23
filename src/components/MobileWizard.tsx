import React from 'react';
import { Type, Palette, Zap, ShoppingCart, Sparkles } from 'lucide-react';
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
    { id: 1, icon: Type, label: 'Texte', color: 'text-blue-400', bgColor: 'bg-blue-500' },
    { id: 2, icon: Palette, label: 'Couleurs', color: 'text-pink-400', bgColor: 'bg-pink-500' },
    { id: 3, icon: Zap, label: 'Style', color: 'text-yellow-400', bgColor: 'bg-yellow-500' },
    { id: 4, icon: ShoppingCart, label: 'Taille', color: 'text-green-400', bgColor: 'bg-green-500' },
    { id: 5, icon: Sparkles, label: 'Finaliser', color: 'text-purple-400', bgColor: 'bg-purple-500' }
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
    <div className="lg:hidden fixed left-4 top-4 bottom-4 z-30 w-20 flex flex-col">
      {/* Mini Preview */}
      <div className="bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl p-3 mb-4 shadow-xl shadow-purple-500/20">
        <div className="text-xs text-gray-400 mb-2 text-center">Aperçu</div>
        <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/60"></div>
          <div 
            className="text-xs font-bold text-center relative z-10"
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
      <div className="bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-xl shadow-purple-500/20 p-2 flex-1">
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
                  ? `${step.bgColor} shadow-lg shadow-${step.bgColor.split('-')[1]}-500/50 scale-110` 
                  : 'bg-gray-800/50 hover:bg-gray-700/50 hover:scale-105'
              }`}
            >
              <step.icon 
                size={20} 
                className={`${
                  currentStep === step.id ? 'text-white' : 'text-gray-400'
                } transition-colors`}
              />
              
              {/* Progress indicator */}
              {currentStep === step.id && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
              )}
              
              {/* Completed indicator */}
              {currentStep > step.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              )}
            </button>

            {/* Hover tooltip */}
            <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-gray-700">
              {step.label}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-4 border-transparent border-r-gray-900" />
            </div>
          </div>
        ))}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 bg-gray-800/50 rounded-full h-1 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-pink-400 via-yellow-400 via-green-400 to-purple-400 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileWizard;