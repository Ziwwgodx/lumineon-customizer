import React from 'react';
import { Type, Palette, Zap, ShoppingCart, Sparkles } from 'lucide-react';

interface MobileWizardProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const MobileWizard: React.FC<MobileWizardProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { id: 1, icon: Type, label: 'Texte', color: 'text-blue-400' },
    { id: 2, icon: Palette, label: 'Couleurs', color: 'text-pink-400' },
    { id: 3, icon: Zap, label: 'Style', color: 'text-yellow-400' },
    { id: 4, icon: ShoppingCart, label: 'Taille', color: 'text-green-400' },
    { id: 5, icon: Sparkles, label: 'Finaliser', color: 'text-purple-400' }
  ];

  return (
    <div className="lg:hidden sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-3 mb-4">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all hover:scale-110 ${
              currentStep === step.id 
                ? 'bg-gray-800 shadow-lg' 
                : 'hover:bg-gray-800/50'
            }`}
          >
            <step.icon 
              size={20} 
              className={`${
                currentStep === step.id ? step.color : 'text-gray-500'
              } transition-colors`}
            />
            <span className={`text-xs font-medium ${
              currentStep === step.id ? 'text-white' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
            {currentStep === step.id && (
              <div className={`w-1 h-1 rounded-full ${step.color.replace('text-', 'bg-')} animate-pulse`} />
            )}
          </button>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-3 bg-gray-700 rounded-full h-1 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default MobileWizard;