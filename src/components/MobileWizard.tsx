import React from 'react';
import { Type, Palette, Zap, ShoppingCart, Sparkles } from 'lucide-react';

interface MobileWizardProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

interface MobileWizardProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  isScrolled?: boolean;
}

const MobileWizard: React.FC<MobileWizardProps> = ({ currentStep, onStepClick, isScrolled = false }) => {
  const steps = [
    { id: 1, icon: Type, label: 'Texte', color: 'text-blue-400' },
    { id: 2, icon: Palette, label: 'Couleurs', color: 'text-pink-400' },
    { id: 3, icon: Zap, label: 'Style', color: 'text-yellow-400' },
    { id: 4, icon: ShoppingCart, label: 'Taille', color: 'text-green-400' },
    { id: 5, icon: Sparkles, label: 'Finaliser', color: 'text-purple-400' }
  ];

  return (
    <div className={`lg:hidden fixed top-4 left-4 z-30 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-xl shadow-purple-500/20 p-2' 
        : 'bg-gradient-to-r from-gray-900/95 via-purple-900/20 to-gray-900/95 backdrop-blur-md border-b border-purple-500/30 shadow-lg shadow-purple-500/10 py-2 px-3 w-full left-0 top-0 rounded-none'
    }`}>
      <div className={`flex items-center gap-1 ${
        isScrolled ? 'flex-col' : 'justify-center max-w-xs mx-auto'
      }`}>
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`flex ${isScrolled ? 'flex-row' : 'flex-col'} items-center gap-0.5 p-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 ${
              currentStep === step.id 
                ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 shadow-lg border border-purple-400/50' 
                : 'hover:bg-gray-800/30'
            }`}
          >
            <step.icon 
              size={isScrolled ? 14 : 16} 
              className={`${
                currentStep === step.id ? `${step.color} drop-shadow-sm` : 'text-gray-500'
              }`}
            />
            {!isScrolled && (
              <span className={`text-xs font-medium leading-tight ${
                currentStep === step.id ? 'text-white drop-shadow-sm' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            )}
            {currentStep === step.id && (
              <div className={`w-1 h-1 rounded-full ${step.color.replace('text-', 'bg-')} animate-pulse shadow-sm ${
                isScrolled ? 'ml-1' : ''
              }`} />
            )}
          </button>
        ))}
      </div>
      
      {/* Progress Bar */}
      {!isScrolled && (
        <div className="mt-2 bg-gray-800/50 rounded-full h-1 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default MobileWizard;