import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, RotateCw } from 'lucide-react';
import { NeonConfig } from '../types';

interface SwipeablePreviewProps {
  config: NeonConfig;
  environments: Array<{
    id: string;
    name: string;
    bg: string;
    icon?: any;
  }>;
  onEnvironmentChange: (envId: string) => void;
  currentEnvironment: string;
}

const SwipeablePreview: React.FC<SwipeablePreviewProps> = ({
  config,
  environments,
  onEnvironmentChange,
  currentEnvironment
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = environments.findIndex(env => env.id === currentEnvironment);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentEnvironment, environments]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < environments.length - 1) {
      goToNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      goToPrevious();
    }
  };

  const goToNext = () => {
    const nextIndex = Math.min(currentIndex + 1, environments.length - 1);
    setCurrentIndex(nextIndex);
    onEnvironmentChange(environments[nextIndex].id);
  };

  const goToPrevious = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
    onEnvironmentChange(environments[prevIndex].id);
  };

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

  const getTextStyle = () => {
    const baseStyle = {
      fontFamily: getFontFamily(),
      fontWeight: 'bold',
      userSelect: 'none' as const,
      letterSpacing: '0.05em'
    };

    if (config.useGradient && config.gradientColors) {
      return {
        ...baseStyle,
        background: `linear-gradient(135deg, ${config.gradientColors[0]}, ${config.gradientColors[1]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: `0 0 3px ${config.gradientColors[0]}, 0 0 8px ${config.gradientColors[1]}`
      };
    }

    return {
      ...baseStyle,
      color: config.color,
      textShadow: `
        0 0 2px ${config.color},
        0 0 5px ${config.color},
        0 0 10px ${config.color},
        0 0 15px ${config.color}
      `
    };
  };

  const currentEnv = environments[currentIndex];

  return (
    <>
      {/* Preview principal */}
      <div 
        ref={containerRef}
        className="relative bg-gray-900 rounded-2xl overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image de fond */}
        <div 
          className="aspect-video bg-cover bg-center relative"
          style={{ backgroundImage: `url(${currentEnv?.bg})` }}
        >
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Contrôles */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFullscreen(true)}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-all"
            >
              <Maximize2 size={18} />
            </button>
          </div>

          {/* Navigation */}
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          {currentIndex < environments.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Texte néon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-4xl font-bold text-center"
              style={{
                ...getTextStyle(),
                animation: config.effect === 'pulse' ? 'neonPulse 2s infinite' : 
                          config.effect === 'blink' ? 'neonBlink 1.5s infinite' : 
                          config.effect === 'gradient' ? 'neonGlow 3s ease-in-out infinite alternate' : 'none'
              }}
            >
              {config.multiline 
                ? config.lines.map((line, i) => (
                    <div key={i}>{line || 'LIGNE'}</div>
                  ))
                : (config.text || 'MON NÉON')
              }
            </div>
          </div>

          {/* Indicateurs */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {environments.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  onEnvironmentChange(environments[index].id);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Nom de l'environnement */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentEnv?.name}
          </div>
        </div>
      </div>

      {/* Mode plein écran */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <RotateCw size={24} />
          </button>
          
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${currentEnv?.bg})` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Navigation plein écran */}
            {currentIndex > 0 && (
              <button
                onClick={goToPrevious}
                className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all"
              >
                <ChevronLeft size={32} />
              </button>
            )}
            
            {currentIndex < environments.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all"
              >
                <ChevronRight size={32} />
              </button>
            )}

            {/* Texte néon plein écran */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-6xl md:text-8xl font-bold text-center"
                style={{
                  ...getTextStyle(),
                  animation: config.effect === 'pulse' ? 'neonPulse 2s infinite' : 
                            config.effect === 'blink' ? 'neonBlink 1.5s infinite' : 
                            config.effect === 'gradient' ? 'neonGlow 3s ease-in-out infinite alternate' : 'none'
                }}
              >
                {config.multiline 
                  ? config.lines.map((line, i) => (
                      <div key={i}>{line || 'LIGNE'}</div>
                    ))
                  : (config.text || 'MON NÉON')
                }
              </div>
            </div>

            {/* Indicateurs plein écran */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
              {environments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    onEnvironmentChange(environments[index].id);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SwipeablePreview;