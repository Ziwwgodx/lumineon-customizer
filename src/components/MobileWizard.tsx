import React from 'react';
import { Type, Palette, Zap, ShoppingCart, Sparkles } from 'lucide-react';

interface MobileWizardProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  isScrolled?: boolean;
}

const MobileWizard: React.FC<MobileWizardProps> = ({ 
  currentStep, 
  onStepClick, 
  isScrolled = false 
}) => {
  const steps = [
    { id: 1, icon: Type, label: 'Texte', color: 'text-blue-400' },
    { id: 2, icon: Palette, label: 'Couleurs', color: 'text-pink-400' },
    { id: 3, icon: Zap, label: 'Style', color: 'text-yellow-400' },
    { id: 4, icon: Zap, label: 'Éclairage', color: 'text-orange-400' },
    { id: 5, icon: Zap, label: 'Support', color: 'text-cyan-400' },
    { id: 6, icon: Zap, label: 'Fixation', color: 'text-indigo-400' },
    { id: 7, icon: ShoppingCart, label: 'Taille', color: 'text-green-400' },
    { id: 8, icon: Sparkles, label: 'Finaliser', color: 'text-purple-400' }
  ];

  return (
    <div className={`lg:hidden fixed left-0 top-0 z-30 transition-all duration-300 ${
      isScrolled 
        ? 'left-2 top-4 bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-xl shadow-purple-500/20 p-2' 
        : 'w-full bg-gradient-to-r from-gray-900/95 via-purple-900/20 to-gray-900/95 backdrop-blur-md border-b border-purple-500/30 shadow-lg shadow-purple-500/10 py-2 px-3'
    }`}>
      <div className={`flex items-center ${
        isScrolled ? 'flex-col gap-1' : 'gap-1 justify-center overflow-x-auto'
      }`}>
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`flex ${isScrolled ? 'flex-row w-full' : 'flex-col'} items-center gap-0.5 p-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 flex-shrink-0 ${
              currentStep === step.id 
                ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 shadow-lg border border-purple-400/50' 
                : 'hover:bg-gray-800/30'
            }`}
          >
            <step.icon 
              size={isScrolled ? 16 : 14} 
              className={`${
                currentStep === step.id ? `${step.color} drop-shadow-sm` : 'text-gray-500'
              }`}
            />
            {isScrolled ? (
              <span className={`text-xs font-medium ${
                currentStep === step.id ? 'text-white' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            ) : (
              <span className={`text-xs font-medium leading-tight ${
                currentStep === step.id ? 'text-white drop-shadow-sm' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            )}
            {currentStep === step.id && (
              <div className={`w-1 h-1 rounded-full ${step.color.replace('text-', 'bg-')} animate-pulse shadow-sm`} />
            )}
          </button>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className={`bg-gray-800/50 rounded-full h-1 overflow-hidden shadow-inner ${
        isScrolled ? 'mt-2 mx-2' : 'mt-2'
      }`}>
        <div 
          className="h-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${(currentStep / 8) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default MobileWizard;
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