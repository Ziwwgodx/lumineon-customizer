import React, { useState } from 'react';
import { RotateCcw, Maximize2, Home, Coffee, Store, Move, RotateCw, ZoomIn, ZoomOut, Fullscreen, Type, Image } from 'lucide-react';
import { NeonConfig } from '../types';
import GridOverlay from './GridOverlay';
import { GridSettings } from '../types';
import BackgroundUpload from './BackgroundUpload';
import SwipeablePreview from './SwipeablePreview';

interface NeonPreview3DProps {
  config: NeonConfig;
  price: number;
  onUpdateConfig?: (updates: Partial<NeonConfig>) => void;
  onUpdateWordPosition?: (wordIndex: number, x: number, y: number) => void;
  wordPositions?: Array<{ x: number; y: number }>;
}

const NeonPreview3D: React.FC<NeonPreview3DProps> = ({ 
  config, 
  price, 
  onUpdateConfig,
  onUpdateWordPosition,
  wordPositions = []
}) => {
  const [environment, setEnvironment] = useState<'room' | 'cafe' | 'shop'>('room');
  const [viewScale, setViewScale] = useState(1); // Échelle d'aperçu seulement
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDraggingContainer, setIsDraggingContainer] = useState(false);
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 });
  const [containerDragStart, setContainerDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBackgroundUpload, setShowBackgroundUpload] = useState(false);
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  const [gridSettings, setGridSettings] = useState<GridSettings>({
    enabled: false,
    size: 20,
    snap: false
  });
  const [isMobile] = useState(window.innerWidth < 768);

  const environments = [
    { id: 'room' as const, name: 'Salon', icon: Home, bg: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'cafe' as const, name: 'Café', icon: Coffee, bg: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'shop' as const, name: 'Boutique', icon: Store, bg: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'custom' as const, name: 'Personnalisé', icon: Image, bg: customBackground || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ];

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
      letterSpacing: '0.05em',
      position: 'relative' as const,
      willChange: 'transform',
      backfaceVisibility: 'hidden' as const
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
        0 0 15px ${config.color}
      `
    };
  };

  const getWords = () => {
    if (config.multiline) {
      return config.lines.flatMap(line => line.split(' ').filter(word => word.trim()));
    }
    return config.text.split(' ').filter(word => word.trim());
  };

  const handleMouseDown = (e: React.MouseEvent, wordIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(wordIndex);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingContainer) {
      e.preventDefault();
      const deltaX = e.clientX - containerDragStart.x;
      const deltaY = e.clientY - containerDragStart.y;
      
      const newX = containerPosition.x + deltaX;
      const newY = containerPosition.y + deltaY;
      
      // Limites pour garder le container visible
      const maxX = containerWidth / 2 - 100;
      const minX = -containerWidth / 2 + 100;
      const maxY = containerHeight / 2 - 60;
      const minY = -containerHeight / 2 + 60;
      
      setContainerPosition({
        x: Math.max(minX, Math.min(maxX, newX)),
        y: Math.max(minY, Math.min(maxY, newY))
      });
      setContainerDragStart({ x: e.clientX, y: e.clientY });
    } else if (isDragging !== null && onUpdateWordPosition) {
      e.preventDefault();
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      const currentPos = wordPositions[isDragging] || { x: 0, y: 0 };
      const newX = currentPos.x + deltaX;
      const newY = currentPos.y + deltaY;
      
      // Déplacement libre sans contraintes
      onUpdateWordPosition(isDragging, newX, newY);
      setDragStart({ x: e.clientX, y: e.clientY });
      
      // Force re-render pour mettre à jour la validation en temps réel
      setIsDragging(isDragging);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setIsDraggingContainer(false);
  };

  const handleContainerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingContainer(true);
    setContainerDragStart({ x: e.clientX, y: e.clientY });
  };

  const calculateRealFontSize = () => {
    // Taille basée sur la dimension physique
    return config.size === '50cm' ? 32 : 48;
  };

  const calculateDisplayFontSize = () => {
    // Taille d'affichage
    const baseSize = calculateRealFontSize() * viewScale * (config.textScale || 1);
    // Augmenter la taille pour les grands néons
    return config.size === '100cm' ? baseSize * 1.3 : baseSize;
  };

  const getRealDimensions = () => {
    const realWidth = parseInt(config.size);
    const realHeight = Math.round(realWidth * 0.6);
    return { width: realWidth, height: realHeight };
  };

  const getSimulationBoxSize = () => {
    // Taille de la boîte de simulation en pixels (proportionnelle à la vraie taille)
    const baseWidth = config.size === '50cm' ? 300 : 450;
    const baseHeight = config.size === '50cm' ? 120 : 180;
    return {
      width: baseWidth * viewScale,
      height: baseHeight * viewScale
    };
  };

  const getDefaultWordPosition = (wordIndex: number, totalWords: number) => {
    // Positions initiales dans les limites de la boîte
    const boxSize = getSimulationBoxSize();
    const maxY = (boxSize.height / 2) - 30; // Marge de sécurité
    
    if (wordIndex === 0) return { x: 0, y: 0 }; // Mot 1 - centre
    if (wordIndex === 1) return { x: 0, y: -Math.min(40, maxY) }; // Mot 2 - haut mais dans la boîte
    if (wordIndex === 2) return { x: 0, y: Math.min(40, maxY) }; // Mot 3 - bas mais dans la boîte
    return { x: 0, y: 0 };
  };

  const snapToGrid = (value: number) => {
    if (gridSettings.snap && gridSettings.enabled) {
      return Math.round(value / gridSettings.size) * gridSettings.size;
    }
    return value;
  };

  const applyConstraints = (x: number, y: number) => {
    // Déplacement libre - pas de contraintes pendant le drag
    return {
      x: snapToGrid(x),
      y: snapToGrid(y)
    };
  };

  const validateWordsInBox = () => {
    const boxSize = getSimulationBoxSize();
    const wordWidth = 40; // Réduit pour être plus précis
    const wordHeight = 20; // Réduit pour être plus précis
    
    // Limites relatives au container (sans tenir compte de sa position)
    const maxX = (boxSize.width / 2) - wordWidth;
    const minX = -(boxSize.width / 2) + wordWidth;
    const maxY = (boxSize.height / 2) - wordHeight;
    const minY = -(boxSize.height / 2) + wordHeight;
    
    const words = getWords();
    const invalidWords = [];
    
    for (let i = 0; i < words.length; i++) {
      const position = wordPositions[i] || getDefaultWordPosition(i, words.length);
      
      if (position.x < minX || position.x > maxX || position.y < minY || position.y > maxY) {
        invalidWords.push(i + 1);
      }
    }
    
    return invalidWords;
  };

  const isWordOutsideBox = (position: { x: number; y: number }, wordIndex: number) => {
    const boxSize = getSimulationBoxSize();
    const wordWidth = 40; // Réduit pour être plus précis
    const wordHeight = 20; // Réduit pour être plus précis
    
    // Limites relatives au container
    const maxX = (boxSize.width / 2) - wordWidth;
    const minX = -(boxSize.width / 2) + wordWidth;
    const maxY = (boxSize.height / 2) - wordHeight;
    const minY = -(boxSize.height / 2) + wordHeight;
    
    return position.x < minX || position.x > maxX || position.y < minY || position.y > maxY;
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleBackgroundSelect = (background: string) => {
    setCustomBackground(background);
    setEnvironment('custom');
  };

  const zoomIn = () => {
    setViewScale(Math.min(3, viewScale + 0.2));
  };

  const zoomOut = () => {
    setViewScale(Math.max(0.3, viewScale - 0.2));
  };

  const currentEnv = environments.find(env => env.id === environment);
  const words = getWords();
  const containerHeight = isFullscreen ? window.innerHeight - 100 : 500;
  const containerWidth = isFullscreen ? window.innerWidth - 100 : 800;
  
  // Recalcule la validation à chaque render pour s'assurer de la mise à jour
  const invalidWordsCount = validateWordsInBox().length;

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50 bg-black p-8' : 'lg:sticky lg:top-8 lg:h-fit'}>
      {isMobile ? (
        /* Mobile: Swipeable Preview */
        <SwipeablePreview
          config={config}
          environments={environments}
          onEnvironmentChange={setEnvironment}
          currentEnvironment={environment}
        />
      ) : (
        <>
          {/* Desktop: Environment Selector */}
          <div className="mb-4 flex gap-2">
            {environments.map((env) => {
              const IconComponent = env.icon;
              return (
                <button
                  key={env.id}
                  onClick={() => {
                    if (env.id === 'custom') {
                      setShowBackgroundUpload(true);
                    } else {
                      setEnvironment(env.id);
                    }
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                    environment === env.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="hidden sm:inline">{env.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-semibold text-white">Aperçu 3D</h3>
            <button
              onClick={() => {
                // Simulation AR - Dans une vraie app, ça ouvrirait WebXR ou une app native
                if (navigator.share) {
                  navigator.share({
                    title: 'Voir mon néon en réalité augmentée',
                    text: 'Découvrez votre néon personnalisé dans votre espace !',
                    url: window.location.href + '?ar=true'
                  });
                } else {
                  // Fallback: ouvrir une nouvelle fenêtre avec simulation AR
                  const arUrl = `${window.location.href}?ar=true&config=${encodeURIComponent(JSON.stringify(config))}`;
                  window.open(arUrl, '_blank', 'width=400,height=600');
                }
              }}
              className="ml-auto group relative bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/50 hover:border-purple-500/50 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl"
              title="Voir en réalité augmentée"
            >
              <div className="relative">
                <div className="w-5 h-5 border-2 border-current rounded-lg opacity-60"></div>
                <div className="absolute inset-0 w-5 h-5 border-2 border-current rounded-lg transform rotate-12 opacity-40"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-current rounded-full animate-pulse"></div>
              </div>
              <span className="font-medium text-sm">AR</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
            </button>
          </div>

          {/* Desktop: 3D Preview */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
        <div 
          className="relative flex items-center justify-center"
          style={{
            height: containerHeight,
            backgroundColor: environment === 'custom' && customBackground ? 'transparent' : '#1a1a1a',
            backgroundImage: environment === 'custom' && customBackground ? `url(${customBackground})` : currentEnv?.bg ? `url(${currentEnv.bg})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Grid Overlay */}
          <GridOverlay
            settings={gridSettings}
            onSettingsChange={setGridSettings}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
          />
          
          {/* Neon Display */}
          <div 
            className="relative z-10 text-center perspective-1000 w-full h-full flex items-center justify-center p-8"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Simulation Box - Cage pour les mots */}
            <div 
              className={`absolute z-20 border-2 border-dashed backdrop-blur-sm rounded-lg simulation-box transition-all duration-300 ${
                invalidWordsCount > 0 
                  ? 'border-red-400 bg-red-400/10 shadow-red-400/50' 
                  : 'border-white/60 bg-white/5'
              } ${isDraggingContainer ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                width: `${getSimulationBoxSize().width}px`,
                height: `${getSimulationBoxSize().height}px`,
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${containerPosition.x}px), calc(-50% + ${containerPosition.y}px))`
              }}
              onMouseDown={handleContainerMouseDown}
            >
              {/* Corner markers */}
              <div className={`absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 transition-colors ${
                invalidWordsCount > 0 ? 'border-red-400' : 'border-white/80'
              }`}></div>
              <div className={`absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 transition-colors ${
                invalidWordsCount > 0 ? 'border-red-400' : 'border-white/80'
              }`}></div>
              <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 transition-colors ${
                invalidWordsCount > 0 ? 'border-red-400' : 'border-white/80'
              }`}></div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 transition-colors ${
                invalidWordsCount > 0 ? 'border-red-400' : 'border-white/80'
              }`}></div>
              
              {/* Size label */}
              <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded transition-all ${
                invalidWordsCount > 0 
                  ? 'bg-red-500/80 text-white animate-pulse' 
                  : 'bg-black/70 text-white'
              }`}>
                {invalidWordsCount > 0 
                  ? `⚠️ ${invalidWordsCount} mot(s) hors zone`
                  : `${getRealDimensions().width}cm × ${getRealDimensions().height}cm`
                }
                {isDraggingContainer && (
                  <div className="text-xs mt-1 text-blue-400">
                    📦 Déplacement du container
                  </div>
                )}
              </div>
              
              {/* Mots positionnés DANS la boîte */}
              {words.map((word, index) => {
                // Positions initiales différenciées mais dans la boîte
                const defaultPosition = getDefaultWordPosition(index, words.length);
                const position = wordPositions[index] || defaultPosition;
                
                return (
                  <div
                    key={index}
                    className={`absolute select-none font-bold transition-colors ${
                      isDragging === index 
                        ? 'cursor-grabbing word-dragging z-50' 
                        : 'cursor-grab word-draggable hover:brightness-110'
                    }`}
                    style={{
                      ...getTextStyle(),
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                      transform: 'translate(-50%, -50%)',
                      fontSize: `${calculateDisplayFontSize()}px`,
                      transition: isDragging === index ? 'none' : 'all 0.2s ease-out',
                      zIndex: isDragging === index ? 1000 : 50,
                      animation: config.effect === 'pulse' ? 'neonPulse 2s infinite' : 
                                config.effect === 'blink' ? 'neonBlink 1.5s infinite' : 
                                config.effect === 'gradient' ? 'neonGlow 3s ease-in-out infinite alternate' : 'none',
                    }}
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    onDragStart={(e) => e.preventDefault()}
                    title="Cliquez et glissez pour déplacer"
                  >
                    {word || 'MOT'}
                    
                    {isDragging === index && (
                      <div className="absolute -top-8 -right-8 bg-blue-500 text-white rounded-full p-1 shadow-lg animate-bounce pointer-events-none">
                        <Move size={16} />
                      </div>
                    )}
                  </div>
                );
              })}
              
              {words.length === 0 && (
                <div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold"
                  style={{
                    ...getTextStyle(),
                    fontSize: `${calculateDisplayFontSize()}px`
                  }}
                >
                  MON NÉON
                </div>
              )}
            </div>

            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-black/50 rounded-lg px-4 py-2 text-center">
                <p className="text-gray-300 text-sm">Aperçu 3D Temps Réel</p>
              </div>
            </div>
            
            {/* Enhanced lighting effects */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Ambient light reflection */}
              <div 
                className="absolute inset-0 opacity-30 animate-pulse"
                style={{
                  background: `radial-gradient(circle at center, ${config.color}30 0%, ${config.color}10 40%, transparent 80%)`
                }}
              />
              
              {/* Wall light diffusion */}
              <div 
                className="absolute top-0 left-0 right-0 h-40 opacity-40"
                style={{
                  background: `linear-gradient(to bottom, ${config.color}25, ${config.color}10, transparent)`
                }}
              />
              
              {/* Side wall reflections */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-32 opacity-25"
                style={{
                  background: `linear-gradient(to right, transparent, ${config.color}15, transparent)`
                }}
              />
              <div 
                className="absolute right-0 top-0 bottom-0 w-32 opacity-25"
                style={{
                  background: `linear-gradient(to left, transparent, ${config.color}15, transparent)`
                }}
              />
            </div>
            
            {/* Surface reflection */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-24 opacity-25 pointer-events-none z-10"
              style={{
                background: `
                  linear-gradient(to top, 
                    ${config.color}40 0%, 
                    ${config.color}25 20%, 
                    ${config.color}10 50%, 
                    transparent 100%
                  )
                `,
                transform: 'scaleY(-1)',
                filter: 'blur(3px)'
              }}
            />
            
            {/* Subtle background glow for better text visibility */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30 z-10"
              style={{
                background: `radial-gradient(ellipse at center, ${config.color}15 0%, ${config.color}08 30%, transparent 70%)`,
                filter: 'blur(20px)'
              }}
            />
          </div>

          {/* Enhanced floor reflection */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none opacity-60"
            style={{
              background: `
                linear-gradient(to top, 
                  ${config.color}20 0%, 
                  ${config.color}10 20%, 
                  ${config.color}05 40%, 
                  transparent 60%
                )
              `
            }}
          />
        </div>

        {!isFullscreen && (
          <>
            {/* Price Display */}
            <div className="p-6 bg-gray-900/90">
              <div className="mb-4 text-center">
                <div className="text-sm text-gray-400 mb-2">Dimensions estimées</div>
                <div className="text-white font-semibold">
                  Largeur: {getRealDimensions().width}cm • Hauteur: {getRealDimensions().height}cm
                </div>
              </div>
              
              {/* Beautiful Text Size Control */}
              <div className="mb-6 flex items-center justify-center">
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/50 shadow-xl">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-300 whitespace-nowrap">Taille du texte:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const currentScale = config.textScale || 1;
                          const newScale = Math.max(0.5, currentScale - 0.1);
                          onUpdateConfig?.({ textScale: newScale });
                        }}
                        disabled={(config.textScale || 1) <= 0.5}
                        className="group relative bg-gray-700/80 hover:bg-gray-600/80 disabled:bg-gray-800/50 text-white p-3 rounded-xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
                        title="Réduire la taille du texte"
                      >
                        <Type size={16} className="transition-transform group-hover:scale-110" />
                        <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">-</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          onUpdateConfig?.({ textScale: 1 });
                        }}
                        className="bg-gradient-to-r from-orange-500/80 to-red-600/80 hover:from-orange-600/80 hover:to-red-700/80 text-white px-4 py-3 rounded-xl transition-all hover:scale-105 font-bold text-sm min-w-[60px] shadow-lg hover:shadow-xl border border-orange-400/30"
                        title="Réinitialiser à 100%"
                      >
                        {Math.round((config.textScale || 1) * 100)}%
                      </button>
                      
                      <button
                        onClick={() => {
                          const currentScale = config.textScale || 1;
                          const newScale = Math.min(2.5, currentScale + 0.1);
                          onUpdateConfig?.({ textScale: newScale });
                        }}
                        disabled={(config.textScale || 1) >= 2.5}
                        className="group relative bg-gray-700/80 hover:bg-gray-600/80 disabled:bg-gray-800/50 text-white p-3 rounded-xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
                        title="Agrandir la taille du texte"
                      >
                        <Type size={20} className="transition-transform group-hover:scale-110" />
                        <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center">+</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Visual Scale Indicator */}
                  <div className="mt-3 flex items-center justify-center">
                    <div className="w-32 h-2 bg-gray-600/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-300 ease-out"
                        style={{ 
                          width: `${Math.min(100, ((config.textScale || 1) - 0.5) / 2 * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Scale Labels */}
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>50%</span>
                    <span className="text-orange-400 font-medium">
                      {config.textScale && config.textScale !== 1 ? `${Math.round(config.textScale * 100)}%` : 'Normal'}
                    </span>
                    <span>250%</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl px-8 py-4 border border-pink-500/30">
                  <div className="text-3xl font-bold text-white mb-1">{price}€</div>
                  <div className="text-sm text-gray-300">TTC, Livraison comprise</div>
                  {config.premium && (
                    <div className="text-xs text-purple-400 mt-1">Version Premium (+20€)</div>
                  )}
                </div>
              </div>
            </div>
            
              {invalidWordsCount > 0 ? (
                <div className="text-center">
                  <p className="text-red-400 font-semibold text-sm mb-2">
                    ⚠️ Attention: {invalidWordsCount} mot(s) en dehors de la zone de production
                  </p>
                  <p className="text-gray-400 text-xs">
                    Replacez les mots dans le rectangle blanc pour pouvoir commander
                  </p>
                </div>
              ) : (
                <p className="text-center text-sm text-gray-400">
                  💡 Glissez les mots • Grille d'alignement • Zoom • Plein écran • Raccourcis: Ctrl+Z/Y
                </p>
              )}
          </>
        )}
          </div>
        </>
      )}

      {!isFullscreen && (
        <>
          {/* Technical Specs */}
          <div className="mt-6 bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">📋 Spécifications</h4>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-400">Largeur:</span>
                <span className="text-white ml-2 font-semibold">{getRealDimensions().width}cm</span>
              </div>
              <div>
                <span className="text-gray-400">Hauteur:</span>
                <span className="text-white ml-2 font-semibold">{getRealDimensions().height}cm</span>
              </div>
              <div>
                <span className="text-gray-400">Police:</span>
                <span className="text-white ml-2 font-semibold" style={{ fontFamily: getFontFamily() }}>
                  {config.font}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Couleur:</span>
                {config.useGradient ? (
                  <div className="inline-block w-4 h-4 rounded-full ml-2 border border-gray-500" 
                       style={{ background: `linear-gradient(45deg, ${config.gradientColors?.[0]}, ${config.gradientColors?.[1]})` }} />
                ) : (
                  <div className="inline-block w-4 h-4 rounded-full ml-2 border border-gray-500" style={{ backgroundColor: config.color }}></div>
                )}
              </div>
              <div>
                <span className="text-gray-400">Bordure:</span>
                <span className="text-white ml-2 font-semibold">{config.border ? 'Oui' : 'Non'}</span>
              </div>
              <div>
                <span className="text-gray-400">Mots:</span>
                <span className="text-white ml-2 font-semibold">{words.length}</span>
              </div>
              <div>
                <span className="text-gray-400">Taille texte:</span>
                <span className="text-white ml-2 font-semibold">{Math.round((config.textScale || 1) * 100)}%</span>
              </div>
            </div>
            
            {/* Size Comparison */}
            <div className="pt-4 border-t border-gray-600">
              <div className="text-sm text-gray-300 mb-2">Comparaison des tailles :</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-3 border border-gray-500 rounded ${config.size === '50cm' ? 'bg-orange-500/30' : 'bg-gray-700'}`}></div>
                  <span className="text-xs text-gray-400">50cm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-12 h-5 border border-gray-500 rounded ${config.size === '100cm' ? 'bg-orange-500/30' : 'bg-gray-700'}`}></div>
                  <span className="text-xs text-gray-400">100cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Guarantees */}
          <div className="mt-6 bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">✨ Garanties Qualité</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                LED haute qualité, durée de vie 50 000h
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Résistant à l'eau (IP65)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Consommation ultra-basse (12V)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Fabrication 7-12j + Livraison 1-3j
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                Garantie 2 ans + SAV français
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Background Upload Modal */}
      <BackgroundUpload
        isOpen={showBackgroundUpload}
        onClose={() => setShowBackgroundUpload(false)}
        onSelectBackground={handleBackgroundSelect}
      />
    </div>
  );
};

export default NeonPreview3D;