import React from 'react';
import { Check, Circle } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  onStepClick?: (stepIndex: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps, onStepClick }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Configuration</h3>
        <span className="text-sm text-gray-400">
          Étape {currentStep + 1} sur {totalSteps}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onStepClick?.(index)}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${
                  index < currentStep
                    ? 'bg-green-500 border-green-500 text-white'
                    : index === currentStep
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <Check size={16} />
                ) : (
                  <Circle size={16} fill="currentColor" />
                )}
              </div>
              <span
                className={`text-xs mt-2 text-center max-w-20 ${
                  index <= currentStep ? 'text-white' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-600'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, ((currentStep + 1) / totalSteps) * 100)}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;