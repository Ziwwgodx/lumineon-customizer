import React, { useState, useEffect } from 'react';
import { Type, Palette, Zap, Settings, ShoppingCart, Eye, Sparkles, CreditCard, Share2, Heart, Star, Save, Camera, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Upload, Shield, Layers } from 'lucide-react';
import { NeonConfig, CartItem, PremiumOption } from '../types';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';
import { useDesignHistory } from '../hooks/useDesignHistory';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import NeonPreview3D from './NeonPreview3D';
import ColorPicker from './ColorPicker';
import TrendingColors from './TrendingColors';
import TemplateGallery from './TemplateGallery';
import PremiumOptions from './PremiumOptions';
import CustomerReviews from './CustomerReviews';
import Cart from './Cart';
import OnePageCheckout from './OnePageCheckout';
import ARPopup from './ARPopup';
import SharePopup from './SharePopup';
import SharePopupGreen from './SharePopupGreen';
import ShareBottomPopup from './ShareBottomPopup';
import SaveDesignPopup from './SaveDesignPopup';
import GamingCheckoutPopup from './GamingCheckoutPopup';
import SaveHeartPopup from './SaveHeartPopup';
import FavoritesPopup from './FavoritesPopup';
import ProgressBar from './ProgressBar';
import MobileWizard from './MobileWizard';
import MobileOptimizedInput from './MobileOptimizedInput';
import CustomImageUpload from './CustomImageUpload';
import BackboardStyleSelector from './BackboardStyleSelector';
import AdvancedConfigurator from './AdvancedConfigurator';
import { premiumOptions } from '../data/premiumOptions';
import GamingCheckoutStep from './blocks/GamingCheckoutStep';

const NeonCustomizer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<NeonConfig>({
    text: 'MON NÉON',
    color: '#ff0080',
    gradientColors: ['#ff0080', '#8B5CF6'],
    useGradient: false,
    font: 'tilt-neon',
    size: '50cm',
    effect: 'static',
    multiline: false,
    lines: ['MON NÉON'],
    shape: 'text',
    haloIntensity: 15,
    glowRadius: 8,
    textScale: 1,
    lightingEffect: 'standard',
    acrylicSupport: 'clear',
    mountingSystem: 'wall',
    backboardStyle: 'rectangle'
  });

  const [selectedPremiumOptions, setSelectedPremiumOptions] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showSaveDesign, setShowSaveDesign] = useState(false);
  const [showSaveHeart, setShowSaveHeart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCustomImage, setShowCustomImage] = useState(false);
  const [showCustomImageUpload, setShowCustomImageUpload] = useState(false);
  const [wordPositions, setWordPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [isReady, setIsReady] = useState(false);
  
  // Nouveaux états pour les menus déroulants
  const [showTrendingColors, setShowTrendingColors] = useState(false);
  const [showAdvancedColors, setShowAdvancedColors] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [showAdvancedFonts, setShowAdvancedFonts] = useState(false);

  const { items, addItem, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { theme, toggleMode } = useTheme();
  const { addToHistory, undo, redo, canUndo, canRedo, favorites, addToFavorites } = useDesignHistory();

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      addToHistory(config);
    }
  }, [config, addToHistory, isReady]);

  useKeyboardShortcuts({
    onUndo: () => {
      const previousConfig = undo();
      if (previousConfig) {
        setConfig(previousConfig);
      }
    },
    onRedo: () => {
      const nextConfig = redo();
      if (nextConfig) {
        setConfig(nextConfig);
      }
    },
    onSave: () => setShowSaveDesign(true)
  });

  const updateConfig = (updates: Partial<NeonConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const calculatePrice = () => {
    let basePrice = config.size === '50cm' ? 120 : 200;
    const premiumPrice = selectedPremiumOptions.reduce((total, optionId) => {
      const option = premiumOptions.find(opt => opt.id === optionId);
      return total + (option?.price || 0);
    }, 0);
    
    // Ajustement prix selon le style de fond
    let backboardAdjustment = 0;
    if (config.backboardStyle === 'shape' || config.backboardStyle === 'printed') {
      backboardAdjustment = 15;
    } else if (config.backboardStyle === 'none') {
      backboardAdjustment = -10;
    }
    
    return basePrice + premiumPrice + backboardAdjustment;
  };

  const handleAddToCart = () => {
    const price = calculatePrice();
    addItem(config, price);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = (orderData: any) => {
    console.log('Commande complétée:', orderData);
    clearCart();
    setShowCheckout(false);
    alert('🎉 Commande confirmée ! Vous recevrez un email de confirmation.');
  };

  const handleCustomImageSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/custom-logo', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`✅ Demande envoyée ! ID: ${result.requestId}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'envoi');
    }
  };

  const updateWordPosition = (wordIndex: number, x: number, y: number) => {
    setWordPositions(prev => {
      const newPositions = [...prev];
      newPositions[wordIndex] = { x, y };
      return newPositions;
    });
  };

  const resetWordPositions = () => {
    setWordPositions([]);
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    'Texte',
    'Couleurs', 
    'Style',
    'Échange',
    'Support',
    'Fond',
    'Taille',
    'Finaliser'
  ];

  const fonts = [
    { id: 'tilt-neon', name: '✨ Tilt Neon', description: 'Police néon authentique' },
    { id: 'orbitron', name: '🚀 Orbitron', description: 'Futuriste et moderne' },
    { id: 'audiowide', name: '🎮 Audiowide', description: 'Style rétro gaming' },
    { id: 'electrolize', name: '⚡ Electrolize', description: 'Électronique minimaliste' },
    { id: 'modern', name: '🔤 Sans-Serif', description: 'Clean et lisible' },
    { id: 'script', name: '✍️ Script', description: 'Élégant et cursif' },
    { id: 'bebas-neue', name: '💪 Bebas Neue', description: 'Impact et modernité' },
    { id: 'righteous', name: '😊 Righteous', description: 'Arrondi et fun' },
    { id: 'russo-one', name: '🏭 Russo One', description: 'Industriel robuste' },
    { id: 'bungee', name: '🎨 Bungee', description: 'Street art moderne' },
    { id: 'monoton', name: '🤖 Monoton', description: 'Rétro futuriste' },
    { id: 'creepster', name: '👻 Creepster', description: 'Halloween spooky' },
    { id: 'comic-relief', name: '🎭 Comic Relief', description: 'Fun et décontracté' },
    { id: 'fredoka-one', name: '😊 Fredoka One', description: 'Rond et joyeux' },
    { id: 'bangers', name: '💥 Bangers', description: 'Comic book style' },
    { id: 'permanent-marker', name: '✏️ Permanent Marker', description: 'Marqueur authentique' }
  ];

  const effects = [
    { id: 'static', name: '💡 Statique', description: 'Éclairage constant' },
    { id: 'pulse', name: '💓 Pulsation', description: 'Battement lumineux' },
    { id: 'blink', name: '⚡ Clignotant', description: 'Clignotement rythmé' },
    { id: 'gradient', name: '🌈 Dégradé', description: 'Transition colorée' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="neon-card neon-card-hover rounded-2xl p-8 shadow-2xl border-2 border-cyan-500/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl border border-cyan-500/50 shadow-lg shadow-cyan-500/25">
                  <Type className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold" style={{ color: '#00ffff', textShadow: '0 0 2px currentColor, 0 0 5px currentColor' }}>⚡ TEXTE GAMING</h3>
                  <p className="text-cyan-300 text-sm font-medium">Configurez votre message néon</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full animate-pulse"></span>
                    <span className="neon-text" style={{ color: '#ff0080' }}>VOTRE MESSAGE</span>
                  </label>
                  <MobileOptimizedInput
                    value={config.text}
                    onChange={(value) => updateConfig({ text: value })}
                    placeholder="MON NÉON"
                    maxLength={30}
                  />
                </div>

                <div className="flex items-center justify-between p-4 neon-card border border-purple-500/30 rounded-xl">
                  <span className="text-white font-bold flex items-center gap-3">
                    <span className="text-purple-400">📝</span>
                    <span className="neon-text" style={{ color: '#8B5CF6' }}>MODE MULTI-LIGNES</span>
                  </span>
                  <button
                    onClick={() => {
                      if (!config.multiline) {
                        const lines = config.text.split('\n').filter(line => line.trim());
                        updateConfig({ 
                          multiline: true, 
                          lines: lines.length > 0 ? lines : [config.text] 
                        });
                      } else {
                        updateConfig({ 
                          multiline: false, 
                          text: config.lines.join(' ') 
                        });
                      }
                    }}
                    className={`relative w-16 h-8 rounded-full transition-all shadow-lg border ${
                      config.multiline 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/50 border-purple-400' 
                        : 'bg-gray-800 border-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md border ${
                        config.multiline ? 'translate-x-9 border-purple-300' : 'translate-x-1 border-gray-300'
                      }`}
                    />
                  </button>
                </div>

                {config.multiline && (
                  <div className="space-y-4 neon-card p-6 rounded-2xl border border-green-500/30">
                    <div className="text-lg text-white font-bold flex items-center gap-3 mb-4">
                      <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></span>
                      <span className="neon-text" style={{ color: '#00ff41' }}>LIGNES DE TEXTE</span>
                    </div>
                    {config.lines.map((line, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => {
                            const newLines = [...config.lines];
                            newLines[index] = e.target.value;
                            updateConfig({ 
                              lines: newLines,
                              text: newLines.join('\n')
                            });
                          }}
                          className="flex-1 px-4 py-3 neon-card border border-green-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400/50 transition-all"
                          placeholder={`Ligne ${index + 1}`}
                          maxLength={20}
                        />
                        {config.lines.length > 1 && (
                          <button
                            onClick={() => {
                              if (config.lines.length > 1) {
                                const newLines = config.lines.filter((_, i) => i !== index);
                                updateConfig({ 
                                  lines: newLines,
                                  text: newLines.join('\n')
                                });
                              }
                            }}
                            className="px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all hover:scale-105 shadow-lg shadow-red-500/25 border border-red-400/50"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    {config.lines.length < 4 && (
                      <button
                        onClick={() => {
                          const newLines = [...config.lines, ''];
                          updateConfig({ 
                            lines: newLines,
                            text: newLines.join('\n')
                          });
                        }}
                        className="w-full py-4 border-2 border-dashed border-green-500/30 hover:border-green-400 text-gray-300 hover:text-green-400 rounded-xl transition-all hover:bg-green-500/10 font-bold neon-button"
                      >
                        <span className="neon-text" style={{ color: '#00ff41' }}>⚡ AJOUTER LIGNE</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <TemplateGallery onSelectTemplate={(templateConfig) => setConfig(templateConfig)} />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="neon-card neon-card-hover rounded-2xl p-8 shadow-2xl border-2 border-pink-500/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl border border-pink-500/50 shadow-lg shadow-pink-500/25">
                  <Palette className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold" style={{ color: '#ff0080', textShadow: '0 0 2px currentColor, 0 0 5px currentColor' }}>🎨 PALETTE GAMING</h3>
                  <p className="text-pink-300 text-sm font-medium">Couleurs néon haute intensité</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Sélecteur principal */}
                <div>
                  <label className="block text-lg font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></span>
                    <span className="neon-text" style={{ color: '#ff0080' }}>COULEUR PRINCIPALE</span>
                  </label>
                  <div className="flex items-center gap-4 p-4 neon-card border border-pink-500/30 rounded-xl">
                    <input
                      type="color"
                      value={config.color}
                      onChange={(e) => updateConfig({ color: e.target.value })}
                      className="w-24 h-16 rounded-2xl border-2 border-pink-500/50 bg-transparent cursor-pointer shadow-lg hover:scale-105 transition-all"
                    />
                    <input
                      type="text"
                      value={config.color}
                      onChange={(e) => updateConfig({ color: e.target.value })}
                      className="flex-1 px-4 py-4 neon-card border border-pink-500/30 rounded-xl text-white font-mono text-lg font-bold focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400/50 transition-all"
                      placeholder="#ff0080"
                    />
                  </div>
                </div>

                {/* Toggle dégradé */}
                <div className="flex items-center justify-between p-4 neon-card border border-purple-500/30 rounded-xl">
                  <span className="text-white font-bold flex items-center gap-3">
                    <span className="text-purple-400">🌈</span>
                    <span className="neon-text" style={{ color: '#8B5CF6' }}>MODE DÉGRADÉ</span>
                  </span>
                  <button
                    onClick={() => updateConfig({ useGradient: !config.useGradient })}
                    className={`relative w-16 h-8 rounded-full transition-all shadow-lg border ${
                      config.useGradient 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-pink-500/50 border-pink-400' 
                        : 'bg-gray-800 border-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md border ${
                        config.useGradient ? 'translate-x-9 border-pink-300' : 'translate-x-1 border-gray-300'
                      }`}
                    />
                  </button>
                </div>

                {/* Dégradé */}
                {config.useGradient && (
                  <div className="space-y-6 neon-card p-6 rounded-2xl border border-purple-500/30">
                    <div>
                      <label className="block text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <span className="text-purple-400">🎯</span>
                        <span className="neon-text" style={{ color: '#8B5CF6' }}>COULEUR 1</span>
                      </label>
                      <input
                        type="color"
                        value={config.gradientColors[0]}
                        onChange={(e) => updateConfig({ 
                          gradientColors: [e.target.value, config.gradientColors[1]] 
                        })}
                        className="w-full h-16 rounded-2xl border-2 border-purple-500/50 bg-transparent cursor-pointer shadow-lg hover:scale-105 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <span className="text-pink-400">🎯</span>
                        <span className="neon-text" style={{ color: '#ff0080' }}>COULEUR 2</span>
                      </label>
                      <input
                        type="color"
                        value={config.gradientColors[1]}
                        onChange={(e) => updateConfig({ 
                          gradientColors: [config.gradientColors[0], e.target.value] 
                        })}
                        className="w-full h-16 rounded-2xl border-2 border-pink-500/50 bg-transparent cursor-pointer shadow-lg hover:scale-105 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Menu Couleurs Tendance */}
                <div className="neon-card border border-green-500/30 rounded-2xl overflow-hidden shadow-lg">
                  <button
                    onClick={() => setShowTrendingColors(!showTrendingColors)}
                    className="w-full flex items-center justify-between p-6 hover:bg-green-500/10 transition-all neon-button"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/50 shadow-lg shadow-green-500/25">
                        <span className="text-green-400 text-xl">🌈</span>
                      </div>
                      <span className="text-white font-bold text-lg neon-text" style={{ color: '#00ff41' }}>COULEURS TENDANCE</span>
                    </div>
                    <div className={`transition-transform ${showTrendingColors ? 'rotate-180' : ''} text-green-400`}>
                      <ChevronDown size={24} />
                    </div>
                  </button>
                  {showTrendingColors && (
                    <div className="p-6 border-t border-green-500/30 bg-green-500/5">
                      <TrendingColors 
                        onColorSelect={(color) => updateConfig({ color })}
                        currentColor={config.color}
                      />
                    </div>
                  )}
                </div>

                {/* Menu Couleurs Avancées */}
                <div className="neon-card border border-purple-500/30 rounded-2xl overflow-hidden shadow-lg">
                  <button
                    onClick={() => setShowAdvancedColors(!showAdvancedColors)}
                    className="w-full flex items-center justify-between p-6 hover:bg-purple-500/10 transition-all neon-button"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/25">
                        <span className="text-purple-400 text-xl">🎨</span>
                      </div>
                      <span className="text-white font-bold text-lg neon-text" style={{ color: '#8B5CF6' }}>COULEURS AVANCÉES</span>
                    </div>
                    <div className={`transition-transform ${showAdvancedColors ? 'rotate-180' : ''} text-purple-400`}>
                      <ChevronDown size={24} />
                    </div>
                  </button>
                  {showAdvancedColors && (
                    <div className="p-6 border-t border-purple-500/30 bg-purple-500/5">
                      <ColorPicker
                        color={config.color}
                        gradientColors={config.gradientColors}
                        useGradient={config.useGradient}
                        onChange={(color) => updateConfig({ color })}
                        onGradientChange={(colors) => updateConfig({ gradientColors: colors })}
                        onGradientToggle={(enabled) => updateConfig({ useGradient: enabled })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="neon-card p-8 border-2 border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-500 shadow-2xl shadow-yellow-500/20 relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl blur-xl animate-pulse"></div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="bg-gradient-to-br from-yellow-500/30 to-orange-600/30 p-4 rounded-2xl border-2 border-yellow-400/50 shadow-2xl shadow-yellow-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                <Zap className="text-yellow-400 animate-pulse drop-shadow-lg" size={32} />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full animate-ping shadow-lg"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-yellow-400" style={{textShadow: '0 0 2px currentColor, 0 0 5px currentColor'}} className="flex items-center gap-3">
                  ⚡ STYLE & POLICE GAMING
                  <div className="text-lg bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent animate-pulse">PREMIUM</div>
                </h2>
                <p className="text-yellow-300/80 text-lg font-medium">Personnalisation avancée de votre néon</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="space-y-6">
                {/* Sélecteur de police principal */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Police de caractères
                  </label>
                  <select
                    value={config.font}
                    onChange={(e) => updateConfig({ font: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    {fonts.slice(0, 6).map(font => (
                      <option key={font.id} value={font.id}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sélecteur d'effet */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Effet lumineux
                  </label>
                  <select
                    value={config.effect}
                    onChange={(e) => updateConfig({ effect: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    {effects.map(effect => (
                      <option key={effect.id} value={effect.id}>
                        {effect.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Menu Effets Avancés */}
                <div className="border border-gray-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowEffects(!showEffects)}
                    className="w-full flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-yellow-400">⚡</div>
                      <span className="text-white font-medium">Effets Avancés</span>
                    </div>
                    {showEffects ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {showEffects && (
                    <div className="p-4 border-t border-gray-600">
                      <div className="grid grid-cols-2 gap-3">
                        {effects.map(effect => (
                          <button
                            key={effect.id}
                            onClick={() => updateConfig({ effect: effect.id })}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              config.effect === effect.id
                                ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                                : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                            }`}
                          >
                            <div className="font-medium">{effect.name}</div>
                            <div className="text-xs text-gray-400">{effect.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Menu Polices Avancées */}
                <div className="border border-gray-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowAdvancedFonts(!showAdvancedFonts)}
                    className="w-full flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-blue-400">🔧</div>
                      <span className="text-white font-medium">Polices Avancées</span>
                    </div>
                    {showAdvancedFonts ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {showAdvancedFonts && (
                    <div className="p-4 border-t border-gray-600">
                      <AdvancedConfigurator
                        config={config}
                        updateConfig={updateConfig}
                        onResetPositions={resetWordPositions}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="neon-card p-8 border-2 border-cyan-500/40 hover:border-cyan-400/60 transition-all duration-500 shadow-2xl shadow-cyan-500/20 relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 animate-pulse"></div>
              <div className="gaming-grid"></div>
            </div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="bg-gradient-to-br from-cyan-500/30 to-blue-600/30 p-4 rounded-2xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                <div className="relative">
                  <div className="w-8 h-8 border-2 border-cyan-400 rounded-lg opacity-60 animate-pulse"></div>
                  <div className="absolute inset-0 w-8 h-8 border-2 border-blue-400 rounded-lg transform rotate-12 opacity-40"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-ping shadow-lg"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-cyan-400" style={{textShadow: '0 0 2px currentColor, 0 0 5px currentColor'}} className="flex items-center gap-3">
                  🎮 APERÇU 3D GAMING
                  <div className="text-lg bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent animate-pulse">TEMPS RÉEL</div>
                </h2>
                <p className="text-cyan-300/80 text-lg font-medium">Visualisation immersive de votre néon</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-cyan-500/30">
                <div className="text-center text-cyan-300 mb-4">
                  <div className="text-lg font-semibold mb-2">🚀 Aperçu 3D Interactif</div>
                  <div className="text-sm opacity-80">Déplacez les mots • Changez l'environnement • Zoom temps réel</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3">
                    <div className="text-cyan-400 font-bold">🎯 Précision</div>
                    <div className="text-cyan-300">Pixel Perfect</div>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                    <div className="text-blue-400 font-bold">⚡ Temps Réel</div>
                    <div className="text-blue-300">60 FPS</div>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                    <div className="text-purple-400 font-bold">🎮 Interactif</div>
                    <div className="text-purple-300">Drag & Drop</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="neon-card p-8 border-2 border-emerald-500/40 hover:border-emerald-400/60 transition-all duration-500 shadow-2xl shadow-emerald-500/20 relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
            {/* Premium pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-500/20 animate-pulse"></div>
            </div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="bg-gradient-to-br from-emerald-500/30 to-green-600/30 p-4 rounded-2xl border-2 border-emerald-400/50 shadow-2xl shadow-emerald-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                <Shield className="text-emerald-400 animate-pulse drop-shadow-lg" size={32} />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-ping shadow-lg"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-emerald-400" style={{textShadow: '0 0 2px currentColor, 0 0 5px currentColor'}} className="flex items-center gap-3">
                  🛡️ SUPPORT & FIXATION PRO
                  <div className="text-lg bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent animate-pulse">PREMIUM</div>
                </h2>
                <p className="text-emerald-300/80 text-lg font-medium">Options professionnelles et installation</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Support acrylique
                  </label>
                  <select
                    value={config.acrylicSupport}
                    onChange={(e) => updateConfig({ acrylicSupport: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="clear">Transparent</option>
                    <option value="frosted">Dépoli</option>
                    <option value="colored">Coloré</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Système de fixation
                  </label>
                  <select
                    value={config.mountingSystem}
                    onChange={(e) => updateConfig({ mountingSystem: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="wall">Fixation murale</option>
                    <option value="hanging">Suspension</option>
                    <option value="standing">Sur pied</option>
                  </select>
                </div>
              </div>

              <PremiumOptions
                selectedOptions={selectedPremiumOptions}
                onToggleOption={(optionId) => {
                  setSelectedPremiumOptions(prev =>
                    prev.includes(optionId)
                      ? prev.filter(id => id !== optionId)
                      : [...prev, optionId]
                  );
                }}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="neon-card p-8 border-2 border-indigo-500/40 hover:border-indigo-400/60 transition-all duration-500 shadow-2xl shadow-indigo-500/20 relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
            {/* Artistic pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 animate-pulse"></div>
            </div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="bg-gradient-to-br from-indigo-500/30 to-purple-600/30 p-4 rounded-2xl border-2 border-indigo-400/50 shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                <Layers className="text-indigo-400 animate-pulse drop-shadow-lg" size={32} />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-ping shadow-lg"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-indigo-400" style={{textShadow: '0 0 2px currentColor, 0 0 5px currentColor'}} className="flex items-center gap-3">
                  🎨 STYLE DE FOND GAMING
                  <div className="text-lg bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent animate-pulse">ARTISTIQUE</div>
                </h2>
                <p className="text-indigo-300/80 text-lg font-medium">Finition et style de votre néon</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <BackboardStyleSelector
                config={config}
                updateConfig={updateConfig}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8">
            {/* Taille du Néon */}
            <div className="neon-card p-8 border-2 border-orange-500/40 hover:border-orange-400/60 transition-all duration-500 shadow-2xl shadow-orange-500/20 relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 animate-pulse"></div>
              </div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="bg-gradient-to-br from-orange-500/30 to-red-600/30 p-4 rounded-2xl border-2 border-orange-400/50 shadow-2xl shadow-orange-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                  <div className="text-orange-400 text-3xl animate-pulse">📏</div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full animate-ping shadow-lg"></div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-orange-400" style={{textShadow: '0 0 2px currentColor, 0 0 5px currentColor'}} className="flex items-center gap-3">
                    📏 TAILLE DU NÉON GAMING
                    <div className="text-lg bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent animate-pulse">IMPACT</div>
                  </h2>
                  <p className="text-orange-300/80 text-lg font-medium">Choisissez la dimension parfaite</p>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { id: '50cm', name: '50cm', description: 'Compact et élégant', price: '120€', impact: 'COSY' },
                    { id: '100cm', name: '100cm', description: 'Grand format impact', price: '200€', impact: 'POWER' }
                  ].map((size) => (
                    <button
                      key={size.id}
                      onClick={() => updateConfig({ size: size.id })}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] text-left relative overflow-hidden ${
                        config.size === size.id
                          ? 'border-orange-400 bg-gradient-to-br from-orange-400/20 to-red-600/20 text-orange-400 shadow-2xl shadow-orange-500/30'
                          : 'border-gray-600 bg-gray-700/30 text-white hover:border-orange-500/50 hover:bg-orange-500/10'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-pulse"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-bold text-2xl">{size.name}</div>
                          <div className="text-sm font-bold bg-gray-800/50 px-3 py-1 rounded-full border border-gray-600">
                            {size.price}
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 mb-3">{size.description}</div>
                        <div className="flex items-center justify-between">
                          <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                            size.impact === 'COSY' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {size.impact}
                          </div>
                          {config.size === size.id && (
                            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/30 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-orange-400 mt-1">💡</div>
                    <div>
                      <div className="text-orange-400 font-medium text-sm">Guide des Tailles Gaming</div>
                      <div className="text-orange-300 text-sm mt-1">
                        • <strong>50cm</strong> : Parfait pour bureau, chambre, petit commerce<br/>
                        • <strong>100cm</strong> : Idéal pour salon, restaurant, grande vitrine
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Finaliser la Commande */}
            <div className="neon-card p-8 border-2 border-green-500/40 hover:border-green-400/60 transition-all duration-500 shadow-2xl shadow-green-500/20 relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 animate-pulse"></div>
              </div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="bg-gradient-to-br from-green-500/30 to-emerald-600/30 p-4 rounded-2xl border-2 border-green-400/50 shadow-2xl shadow-green-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                  <ShoppingCart className="text-green-400 animate-pulse drop-shadow-lg" size={32} />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-ping shadow-lg"></div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-green-400" style={{textShadow: '0 0 2px currentColor, 0 0 5px currentColor'}} className="flex items-center gap-3">
                    🚀 FINALISER LA COMMANDE
                    <div className="text-lg bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">GAMING</div>
                  </h2>
                  <p className="text-green-300/80 text-lg font-medium">Votre néon gaming est prêt !</p>
                </div>
              </div>
              
              <div className="relative z-10 space-y-6">
                {/* Résumé de commande */}
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    📋 Résumé Gaming
                    <div className="text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full">PREMIUM</div>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Texte:</span>
                      <span className="text-white ml-2 font-semibold">{config.text || 'MON NÉON'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Taille:</span>
                      <span className="text-white ml-2 font-semibold">{config.size}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Police:</span>
                      <span className="text-white ml-2 font-semibold">{config.font}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Effet:</span>
                      <span className="text-white ml-2 font-semibold">{config.effect}</span>
                    </div>
                  </div>
                </div>
                
                {/* Prix et CTA */}
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-green-400 neon-text">
                    {calculatePrice()}€
                  </div>
                  <div className="text-green-300 text-sm">
                    TTC • Livraison gratuite • Garantie 2 ans
                  </div>
                  
                  <button
                    onClick={() => addItem(config, calculatePrice())}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6 px-8 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-4 shadow-2xl hover:shadow-green-500/30 text-xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    <ShoppingCart size={28} />
                    <span>🎮 COMMANDER MON NÉON GAMING</span>
                    <div className="text-2xl">⚡</div>
                  </button>
                </div>
                
                {/* Garanties Gaming */}
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                    <div className="text-blue-400 font-bold">⚡ 7-12j</div>
                    <div className="text-blue-300">Production</div>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                    <div className="text-purple-400 font-bold">🛡️ 2 ans</div>
                    <div className="text-purple-300">Garantie</div>
                  </div>
                  <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3">
                    <div className="text-cyan-400 font-bold">🚚 Gratuit</div>
                    <div className="text-cyan-300">Livraison</div>
                  </div>
                </div>
              </div>
            </div>
            
            <CustomerReviews />
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            {/* Logo Personnalisé - Toujours visible sous Texte Gaming */}
            <div className="neon-card-gaming border-purple-500/30 hover:border-purple-400/50 hover:shadow-purple-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-2xl border border-purple-400/30 shadow-lg shadow-purple-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl animate-pulse"></div>
                  <Upload className="text-purple-400 animate-pulse relative z-10" size={28} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 neon-text-gaming">
                    🎨 Logo Personnalisé
                  </h3>
                  <p className="text-purple-300 text-sm">Transformez votre logo en néon unique</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 animate-pulse"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="text-center">
                    <div className="text-purple-300 font-semibold mb-2">✨ Service Premium Exclusif</div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Envoyez-nous votre logo et notre équipe de designers créera un néon sur-mesure 
                      avec un aperçu 3D personnalisé sous 24h !
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/20">
                      <div className="text-purple-400 font-bold text-lg">24h</div>
                      <div className="text-xs text-gray-400">Réponse</div>
                    </div>
                    <div className="bg-pink-500/10 rounded-xl p-3 border border-pink-500/20">
                      <div className="text-pink-400 font-bold text-lg">3D</div>
                      <div className="text-xs text-gray-400">Aperçu</div>
                    </div>
                    <div className="bg-cyan-500/10 rounded-xl p-3 border border-cyan-500/20">
                      <div className="text-cyan-400 font-bold text-lg">Pro</div>
                      <div className="text-xs text-gray-400">Qualité</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowCustomImageUpload(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    <Upload size={24} className="relative z-10" />
                    <span className="relative z-10">🚀 Demander un Devis Gratuit</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-orange-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Finaliser la Commande</h3>
              </div>

              <CustomerReviews />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden gaming-grid">
      
      {/* Header avec marque */}
      <header className="neon-card border-b border-pink-500/30 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et marque */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 rounded-xl flex items-center justify-center relative overflow-hidden border border-pink-500/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                  <div className="text-white font-bold text-2xl relative z-10 neon-text" style={{ color: '#00ffff' }}>L</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold font-tilt-neon">
                  <span className="neon-text" style={{ color: '#ff0080' }}>
                    LumiNéon
                  </span>
                </h1>
                <p className="text-sm font-medium" style={{ color: '#00ffff' }}>⚡ Créez Votre Néon Gaming</p>
              </div>
            </div>

            {/* Actions header */}
            <div className="flex items-center gap-3">
              {/* Bouton thème */}
              <button
                onClick={toggleMode}
                className="p-3 neon-button text-gray-300 hover:text-cyan-400 rounded-xl transition-all hover:scale-110"
                title="Changer le thème"
              >
                {theme.mode === 'dark' ? '🌙' : '☀️'}
              </button>

              {/* Boutons d'historique */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const previousConfig = undo();
                    if (previousConfig) {
                      setConfig(previousConfig);
                    }
                  }}
                  disabled={!canUndo}
                  className="p-3 neon-button disabled:opacity-50 text-gray-300 hover:text-pink-400 disabled:text-gray-600 rounded-xl transition-all disabled:cursor-not-allowed hover:scale-110"
                  title="Annuler (Ctrl+Z)"
                >
                  ↶
                </button>
                <button
                  onClick={() => {
                    const nextConfig = redo();
                    if (nextConfig) {
                      setConfig(nextConfig);
                    }
                  }}
                  disabled={!canRedo}
                  className="p-3 neon-button disabled:opacity-50 text-gray-300 hover:text-purple-400 disabled:text-gray-600 rounded-xl transition-all disabled:cursor-not-allowed hover:scale-110"
                  title="Refaire (Ctrl+Y)"
                >
                  ↷
                </button>
              </div>

              {/* Prix actuel */}
              <div className="hidden sm:block neon-card border border-orange-500/50 rounded-2xl px-6 py-3 shadow-lg shadow-orange-500/20">
                <div className="text-orange-400 font-bold text-lg neon-text">
                  {calculatePrice()}€
                </div>
                <div className="text-orange-300 text-xs">Prix actuel</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Mobile Wizard */}
        <MobileWizard
          currentStep={currentStep}
          onStepClick={handleStepClick}
          config={config}
        />

        {/* Desktop Progress Bar */}
        <div className="hidden lg:block">
          <ProgressBar
            currentStep={currentStep - 1}
            totalSteps={8}
            steps={steps}
            onStepClick={(stepIndex) => setCurrentStep(stepIndex + 1)}
          />
        </div>
            <GamingCheckoutStep 
              config={config} 
              price={price} 
              onCheckout={() => setShowCheckout(true)}
            />

            {/* Step Content */}
            {renderStepContent()}
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <NeonPreview3D
              config={config}
              price={calculatePrice()}
              onUpdateConfig={updateConfig}
              onShowAR={() => setShowAR(true)}
              onUpdateWordPosition={updateWordPosition}
              wordPositions={wordPositions}
              isReady={isReady}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <Cart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        totalPrice={getTotalPrice()}
        onCheckout={handleCheckout}
      />

      <OnePageCheckout
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={items}
        totalPrice={getTotalPrice()}
        onOrderComplete={handleOrderComplete}
      />

      <ARPopup
        isOpen={showAR}
        onClose={() => setShowAR(false)}
        config={config}
      />

      <ShareBottomPopup
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        config={config}
      />

      <SaveDesignPopup
        isOpen={showSaveDesign}
        onClose={() => setShowSaveDesign(false)}
        config={config}
      />
      
      <GamingCheckoutPopup
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        config={config}
        price={price}
        onOrderComplete={(orderData) => {
          console.log('Commande finalisée:', orderData);
          alert(`🎮 Commande ${orderData.id} confirmée ! Vous recevrez un email de confirmation.`);
        }}
      />

      <SaveHeartPopup
        isOpen={showSaveHeart}
        onClose={() => setShowSaveHeart(false)}
        config={config}
      />

      <FavoritesPopup
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        config={config}
      />

      <CustomImageUpload
        isOpen={showCustomImage}
        onClose={() => setShowCustomImage(false)}
        onSubmit={handleCustomImageSubmit}
      />

      {/* Cart Button */}
      {getTotalItems() > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-5 rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-110 z-40 btn-premium"
        >
          <div className="relative">
            <ShoppingCart size={24} />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse shadow-lg">
              {getTotalItems()}
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default NeonCustomizer;