import React from 'react';
import { Type, Palette, Zap, ShoppingCart, Sparkles, Settings, Wrench, Package } from 'lucide-react';

interface MobileWizardProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const MobileWizard: React.FC<MobileWizardProps> = ({ currentStep, onStepClick }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const steps = [
    { id: 1, icon: Type, label: 'Texte', color: 'text-blue-400' },
    { id: 2, icon: Palette, label: 'Couleurs', color: 'text-pink-400' },
    { id: 3, icon: Settings, label: 'Style', color: 'text-yellow-400' },
    { id: 4, icon: Zap, label: 'Éclairage', color: 'text-orange-400' },
    { id: 5, icon: Settings, label: 'Support', color: 'text-cyan-400' },
    { id: 6, icon: Wrench, label: 'Fixation', color: 'text-indigo-400' },
    { id: 7, icon: Package, label: 'Taille', color: 'text-green-400' },
    { id: 8, icon: Sparkles, label: 'Finaliser', color: 'text-purple-400' }
  ];

  const handleStepClick = (stepId: number) => {
    onStepClick(stepId);
    // Garder le menu ouvert brièvement après le clic
    setTimeout(() => setIsExpanded(false), 1000);
  };

  return (
    <div 
      className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out ${
        isExpanded 
          ? 'w-48 bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-r-2xl shadow-xl shadow-purple-500/20 p-3' 
          : 'w-12 bg-gray-900/90 backdrop-blur-sm border-r border-purple-500/30 rounded-r-xl shadow-lg p-1'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`flex ${isExpanded ? 'flex-col gap-2' : 'flex-col gap-1'} items-center`}>
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={(e) => {
              e.stopPropagation();
              handleStepClick(step.id);
            }}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all hover:scale-105 active:scale-95 w-full ${
              currentStep === step.id 
                ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 shadow-lg border border-purple-400/50' 
                : 'hover:bg-gray-800/50'
            }`}
          >
            <step.icon 
              size={isExpanded ? 18 : 14} 
              className={`${
                currentStep === step.id ? 'text-white drop-shadow-sm' : step.color
              } flex-shrink-0`}
            />
            {isExpanded && (
              <span className={`text-xs font-medium transition-all ${
                currentStep === step.id ? 'text-white' : 'text-gray-300'
              } whitespace-nowrap`}>
                {step.label}
              </span>
            )}
            {currentStep === step.id && !isExpanded && (
              <div className="absolute -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-sm" />
            )}
          </button>
        ))}
      </div>
      
      {/* Progress Bar */}
      {isExpanded && (
        <div className="mt-3 bg-gray-800/50 rounded-full h-1.5 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      )}
      
      {/* Indicateur compact */}
      {!isExpanded && (
        <div 
          className="mt-1 w-8 bg-gray-800/50 rounded-full h-0.5 overflow-hidden"
          style={{ width: `${(currentStep / 8) * 100}%` }}
        >
          <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
        </div>
      )}
      
      {/* Hint pour interaction */}
      {!isExpanded && (
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Cliquez pour ouvrir
        </div>
      )}
    </div>
  );
};

export default MobileWizard;