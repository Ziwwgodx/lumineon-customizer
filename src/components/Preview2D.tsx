import React from 'react';
import { NeonConfig } from '../types';

interface Preview2DProps {
  config: NeonConfig;
  className?: string;
}

const Preview2D: React.FC<Preview2DProps> = ({ config, className = '' }) => {
  const getFontFamily = () => {
    const fontMap = {
      'tilt-neon': '"Tilt Neon", cursive',
      'orbitron': '"Orbitron", monospace',
      'audiowide': '"Audiowide", cursive',
      'electrolize': '"Electrolize", sans-serif',
      'modern': 'system-ui, sans-serif',
      'script': 'Georgia, serif',
      'bebas-neue': '"Bebas Neue", cursive',
      'righteous': '"Righteous", cursive',
      'russo-one': '"Russo One", sans-serif',
      'bungee': '"Bungee", cursive',
      'monoton': '"Monoton", cursive',
      'creepster': '"Creepster", cursive'
    };
    return fontMap[config.font as keyof typeof fontMap] || '"Tilt Neon", cursive';
  };

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

  const getTextStyle = () => {
    const baseStyle = {
      fontFamily: getFontFamily(),
      fontWeight: 'bold',
      letterSpacing: '0.05em',
      position: 'relative' as const,
      zIndex: 10
    };

    if (config.useGradient && config.gradientColors) {
      return {
        ...baseStyle,
        background: `linear-gradient(135deg, ${config.gradientColors[0]}, ${config.gradientColors[1]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: `
          0 0 3px ${config.gradientColors[0]},
          0 0 8px ${config.gradientColors[0]},
          0 0 15px ${config.gradientColors[1]}
        `
      };
    }

    return {
      ...baseStyle,
      color: config.color,
      textShadow: `
        0 0 2px ${config.color},
        0 0 5px ${config.color},
        0 0 10px ${config.color},
        0 0 15px ${config.color},
        0 2px 4px rgba(0,0,0,0.5)
      `
    };
  };

  const renderText = () => {
    if (config.multiline && config.lines.length > 0) {
      return config.lines.map((line, index) => (
        <div key={index} className="block">
          {line || 'LIGNE'}
        </div>
      ));
    }
    return config.text || 'MON NÉON';
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
      <div
        className="text-center text-2xl md:text-4xl font-bold leading-tight"
        style={{
          ...getTextStyle(),
          animation: config.effect === 'pulse' ? 'neonPulse 2s infinite' : 
                    config.effect === 'blink' ? 'neonBlink 1.5s infinite' : 
                    config.effect === 'gradient' ? 'neonGlow 3s ease-in-out infinite alternate' : 'none'
        }}
      >
        {renderText()}
      </div>
      
      {/* Effet de lueur ambiante */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, ${config.color}30 0%, ${config.color}10 40%, transparent 70%)`,
          filter: 'blur(20px)'
        }}
      />
    </div>
  );
};

export default Preview2D;