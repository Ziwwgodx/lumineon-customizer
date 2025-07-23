import React from 'react';
import { Layers } from 'lucide-react';
import { NeonConfig } from '../../types';
import BackboardStyleSelector from '../BackboardStyleSelector';

interface BackboardStyleBlockProps {
  config: NeonConfig;
  updateConfig: (updates: Partial<NeonConfig>) => void;
}

const BackboardStyleBlock: React.FC<BackboardStyleBlockProps> = ({ config, updateConfig }) => {
  return (
    <div className="neon-card p-6 border-2 border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 shadow-lg shadow-indigo-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-400/30 shadow-lg shadow-indigo-500/20">
          <Layers className="text-indigo-400 animate-pulse" size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-ping"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-indigo-400 neon-text">🎨 STYLE DE FOND</h2>
          <p className="text-indigo-300 text-sm">Finition de votre néon</p>
        </div>
      </div>

      <BackboardStyleSelector
        config={config}
        updateConfig={updateConfig}
      />
    </div>
  );
};

export default BackboardStyleBlock;