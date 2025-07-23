import React from 'react';
import { Shield } from 'lucide-react';
import PremiumOptions from '../PremiumOptions';

interface PremiumOptionsBlockProps {
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
}

const PremiumOptionsBlock: React.FC<PremiumOptionsBlockProps> = ({ 
  selectedOptions, 
  onToggleOption 
}) => {
  return (
    <div className="neon-card p-6 border-2 border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 shadow-lg shadow-emerald-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
          <Shield className="text-emerald-400 animate-pulse" size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-ping"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 neon-text">🛡️ OPTIONS PREMIUM</h2>
          <p className="text-emerald-300 text-sm">Améliorations professionnelles</p>
        </div>
      </div>

      <PremiumOptions
        selectedOptions={selectedOptions}
        onToggleOption={onToggleOption}
      />
    </div>
  );
};

export default PremiumOptionsBlock;