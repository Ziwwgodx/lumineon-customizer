import React from 'react';

interface NeonTextPreviewProps {
  text: string;
  color: string;
  font: string;
  effect?: string;
  multiline?: boolean;
  lines?: string[];
  useGradient?: boolean;
  gradientColors?: string[];
}

const getFontFamily = (fontId: string) => {
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
  return fontMap[fontId as keyof typeof fontMap] || '"Tilt Neon", cursive';
};

const NeonTextPreview: React.FC<NeonTextPreviewProps> = ({ 
  text, 
  color, 
  font, 
  effect = 'static',
  multiline = false,
  lines = [],
  useGradient = false,
  gradientColors = []
}) => {
  const displayText = multiline && lines.length > 0 ? lines.join(' ') : text;

  const getTextStyle = () => {
    const baseStyle = {
      fontFamily: getFontFamily(font),
      fontWeight: 'bold' as const,
      letterSpacing: '0.05em',
      position: 'relative' as const,
      textTransform: 'uppercase' as const,
      fontSize: '56px',
      lineHeight: '1.2'
    };

    if (useGradient && gradientColors.length >= 2) {
      return {
        ...baseStyle,
        background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: `
          0 0 3px ${gradientColors[0]},
          0 0 6px ${gradientColors[0]},
          0 0 10px ${gradientColors[0]},
          0 0 20px ${gradientColors[1]},
          0 0 30px ${gradientColors[1]},
          0 0 40px ${gradientColors[1]},
          0 0 60px ${gradientColors[1]}
        `
      };
    }

    return {
      ...baseStyle,
      color: color,
      textShadow: `
        0 0 3px #fff,
        0 0 6px #fff,
        0 0 10px ${color},
        0 0 20px ${color},
        0 0 30px ${color},
        0 0 40px ${color},
        0 0 60px ${color}
      `
    };
  };

  const getAnimationClass = () => {
    switch (effect) {
      case 'pulse':
        return 'neon-pulse-animation';
      case 'blink':
        return 'neon-blink-animation';
      case 'gradient':
        return 'neon-gradient-animation';
      default:
        return '';
    }
  };

  const renderText = () => {
    if (multiline && lines.length > 0) {
      return lines.map((line, index) => (
        <div key={index} className="block">
          {line || 'LIGNE'}
        </div>
      ));
    }
    return displayText || 'MON NÉON';
  };

  return (
    <div className="relative inline-block">
      {/* Glow background layer */}
      <div
        className="absolute inset-0 opacity-30 blur-lg"
        style={{
          color: useGradient && gradientColors.length >= 2 ? gradientColors[0] : color,
          ...getTextStyle(),
          filter: 'blur(8px)',
          zIndex: -2
        }}
      >
        {renderText()}
      </div>
      
      {/* Main neon text */}
      <div
        className={`neon-text-realistic ${getAnimationClass()}`}
        data-text={displayText}
        style={getTextStyle()}
      >
        {renderText()}
      </div>
      
      {/* Inner glow layer */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          ...getTextStyle(),
          color: '#ffffff',
          filter: 'blur(1px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        {renderText()}
      </div>
    </div>
  );
};

export default NeonTextPreview;