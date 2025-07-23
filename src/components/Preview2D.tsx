import React from 'react';
import { NeonConfig } from '../types';
import NeonTextPreview from './NeonTextPreview';

interface Preview2DProps {
  config: NeonConfig;
  className?: string;
}

const Preview2D: React.FC<Preview2DProps> = ({ config, className = '' }) => {
  const getBackboardStyle = () => {
    const baseClasses = 'absolute inset-0 transition-all duration-300';
    
    switch (config.backboardStyle) {
      case 'rectangle':
        return `${baseClasses} bg-gray-800/60 rounded-lg backboard-rectangle`;
      
      case 'outline':
        return `${baseClasses} border-2 border-dashed border-white/60 bg-gray-800/30 rounded-lg backboard-outline`;
      
      case 'shape':
        return `${baseClasses} bg-gradient-to-br from-gray-800/60 to-gray-700/60 rounded-2xl backboard-shape`;
      
      case 'printed':
        return `${baseClasses} bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-pink-900/40 rounded-lg backboard-printed`;
      
      case 'none':
      default:
        return `${baseClasses} bg-transparent backboard-none`;
    }
  };

  return (
    <div className={`relative flex items-center justify-center p-8 min-h-[200px] ${className}`}>
      {/* Backboard/Fond */}
      <div className={getBackboardStyle()}></div>
      
      {/* Image de fond pour printed */}
      {config.backboardStyle === 'printed' && (
        <div 
          className="absolute inset-0 opacity-30 rounded-lg"
          style={{
            backgroundImage: 'url(/backing-printed.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      
      {/* Texte néon */}
      <div className="text-center relative z-10">
        <NeonTextPreview 
          text={config.text || 'MON NÉON'}
          color={config.color}
          font={config.font}
          effect={config.effect}
          multiline={config.multiline}
          lines={config.lines}
          useGradient={config.useGradient}
          gradientColors={config.gradientColors}
        />
      </div>
      
      {/* Effet de lueur ambiante */}
      <div 
        className="neon-ambient-glow"
        style={{
          color: config.useGradient && config.gradientColors ? config.gradientColors[0] : config.color
        }}
      />
    </div>
  );
};

export default Preview2D;