import React, { useState } from 'react';
import { Star, Crown, Zap } from 'lucide-react';
import { NeonTemplate, NeonConfig } from '../types';
import { neonTemplates, templateCategories } from '../data/templates';

interface TemplateGalleryProps {
  onSelectTemplate: (config: NeonConfig) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredTemplates = selectedCategory === 'Tous' 
    ? neonTemplates 
    : neonTemplates.filter(template => template.category === selectedCategory);

  const getNeonStyle = (color: string) => ({
    color,
    textShadow: `
      0 0 5px ${color},
      0 0 10px ${color},
      0 0 15px ${color},
      0 0 20px ${color}
    `,
    filter: `drop-shadow(0 0 8px ${color})`
  });

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-4 lg:mb-6">
        <Star className="text-yellow-400" size={20} />
        <h3 className="text-base lg:text-lg font-semibold text-white">Designs Populaires</h3>
        <div className="ml-auto text-xs lg:text-sm text-gray-400 hidden sm:block">Cliquez pour utiliser</div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3 lg:mb-4 overflow-x-auto pb-2">
        {templateCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group relative bg-gray-900/50 rounded-lg overflow-hidden border border-gray-600 hover:border-pink-400 transition-all cursor-pointer hover:scale-105 aspect-square"
            onClick={() => onSelectTemplate(template.config)}
          >
            {/* Background Image */}
            <div className="absolute inset-0 relative overflow-hidden">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all"></div>
              
              {/* Badges */}
              <div className="absolute top-1 left-1 lg:top-1.5 lg:left-1.5 flex gap-1">
                {template.popular && (
                  <span className="bg-yellow-500 text-black text-xs font-bold px-1 lg:px-1.5 py-0.5 rounded-full">
                    ⭐
                  </span>
                )}
                {template.config.premium && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-1 lg:px-1.5 py-0.5 rounded-full">
                    👑
                  </span>
                )}
              </div>

              {/* Neon Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="text-xs lg:text-sm font-bold transition-all duration-300 group-hover:scale-110 text-center px-1"
                  style={getNeonStyle(template.config.color)}
                >
                  {template.config.multiline 
                    ? template.config.lines.map((line, i) => (
                        <div key={i} className="text-center">{line}</div>
                      ))
                    : template.config.text
                  }
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center pb-1 lg:pb-2">
                <div className="bg-white/90 text-gray-900 font-semibold px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-xs flex items-center gap-1">
                  <Zap size={10} />
                  Utiliser
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;