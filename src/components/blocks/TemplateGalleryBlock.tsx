import React from 'react';
import { Star } from 'lucide-react';
import { NeonConfig } from '../../types';
import TemplateGallery from '../TemplateGallery';

interface TemplateGalleryBlockProps {
  onSelectTemplate: (config: NeonConfig) => void;
}

const TemplateGalleryBlock: React.FC<TemplateGalleryBlockProps> = ({ onSelectTemplate }) => {
  return (
    <div className="neon-card p-6 border-2 border-green-500/30 hover:border-green-400/50 transition-all duration-300 shadow-lg shadow-green-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-500/20 p-3 rounded-xl border border-green-400/30 shadow-lg shadow-green-500/20">
          <Star className="text-green-400 animate-pulse" size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-ping"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-400 neon-text">⭐ TEMPLATES GAMING</h2>
          <p className="text-green-300 text-sm">Designs prêts à l'emploi</p>
        </div>
      </div>

      <TemplateGallery onSelectTemplate={onSelectTemplate} />
    </div>
  );
};

export default TemplateGalleryBlock;