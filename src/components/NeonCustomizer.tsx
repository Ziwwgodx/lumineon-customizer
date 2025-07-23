import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Heart, Share2, Eye, Palette, Type, Zap, Ruler, Sparkles, Save, Star, Download, Upload, Image, Grid, Move, RotateCcw, ZoomIn, ZoomOut, Fullscreen, Sun, Moon, Layers, Check, ChevronRight, Settings } from 'lucide-react';
import { NeonConfig, CartItem, PremiumOption } from '../types';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';
import { useDesignHistory } from '../hooks/useDesignHistory';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import NeonPreview3D from './NeonPreview3D';
import ColorPicker from './ColorPicker';
import PremiumOptions from './PremiumOptions';
import Cart from './Cart';
import ARPopup from './ARPopup';
import SharePopup from './SharePopup';
import SharePopupGreen from './SharePopupGreen';
import ShareBottomPopup from './ShareBottomPopup';
import SaveDesignPopup from './SaveDesignPopup';
import SaveHeartPopup from './SaveHeartPopup';
import FavoritesPopup from './FavoritesPopup';
import OnePageCheckout from './OnePageCheckout';
import TemplateGallery from './TemplateGallery';
import CustomerReviews from './CustomerReviews';
import TrendingColors from './TrendingColors';
import ProgressBar from './ProgressBar';
import MobileWizard from './MobileWizard';
import MobileOptimizedInput from './MobileOptimizedInput';
import AdvancedConfigurator from './AdvancedConfigurator';
import CustomImageUpload from './CustomImageUpload';
import BackgroundUpload from './BackgroundUpload';

const NeonCustomizer: React.FC = () => {
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
    lightingEffect: 'fixe',
    acrylicSupport: 'decoupe',
    mountingSystem: 'trous'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPremiumOptions, setSelectedPremiumOptions] = useState<string[]>([]);
  const [showARPopup, setShowARPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showShareGreenPopup, setShowShareGreenPopup] = useState(false);
  const [showShareBottomPopup, setShowShareBottomPopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showSaveHeartPopup, setShowSaveHeartPopup] = useState(false);
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [showCustomImageUpload, setShowCustomImageUpload] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [wordPositions, setWordPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const { theme, toggleMode } = useTheme();
  const { addToHistory, undo, redo, canUndo, canRedo, favorites, addToFavorites } = useDesignHistory();
  
  const {
    items: cartItems,
    isOpen: isCartOpen,
    setIsOpen: setIsCartOpen,
    addItem: addToCart,
    removeItem: removeFromCart,
    updateQuantity: updateCartQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCart();

  // Scroll detection for mobile wizard
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
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
    onSave: () => setShowSavePopup(true),
    onFullscreen: () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  });

  const updateConfig = useCallback((updates: Partial<NeonConfig>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates };
      addToHistory(newConfig);
      return newConfig;
    });
  }, [addToHistory]);

  const handleCustomImageSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/custom-logo', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`Demande envoyée ! ID: ${result.requestId}`);
      } else {
        alert('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion');
    }
  };

  const handleTextChange = (value: string) => {
    if (config.multiline) {
      const lines = value.split('\n').filter(line => line.trim());
      updateConfig({ 
        text: value,
        lines: lines.length > 0 ? lines : ['']
      });
    } else {
      updateConfig({ text: value });
    }
  };

  const handleColorChange = (color: string) => {
    updateConfig({ color, useGradient: false });
  };

  const handleGradientChange = (colors: string[]) => {
    updateConfig({ gradientColors: colors, useGradient: true });
  };

  const handleGradientToggle = (enabled: boolean) => {
    updateConfig({ useGradient: enabled });
  };

  const handleFontChange = (font: string) => {
    updateConfig({ font });
  };

  const handleSizeChange = (size: string) => {
    updateConfig({ size });
  };

  const handleEffectChange = (effect: string) => {
    updateConfig({ effect });
  };

  const handleLightingEffectChange = (lightingEffect: string) => {
    updateConfig({ lightingEffect });
  };

  const handleAcrylicSupportChange = (acrylicSupport: string) => {
    updateConfig({ acrylicSupport });
  };

  const handleMountingSystemChange = (mountingSystem: string) => {
    updateConfig({ mountingSystem });
  };

  const handlePremiumToggle = (optionId: string) => {
    setSelectedPremiumOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleWordPositionUpdate = (wordIndex: number, x: number, y: number) => {
    setWordPositions(prev => {
      const newPositions = [...prev];
      newPositions[wordIndex] = { x, y };
      return newPositions;
    });
  };

  const resetWordPositions = () => {
    setWordPositions([]);
  };

  const calculatePrice = () => {
    let basePrice = config.size === '50cm' ? 120 : 200;
    
    const premiumPrices = {
      waterproof: 25,
      remote: 35,
      timer: 20,
      installation: 80,
      express: 15
    };
    // Système de fixation (prix réduits)
    let premiumTotal = selectedPremiumOptions.reduce((total, optionId) => {
      return total + (premiumPrices[optionId] || 0);
    }, 0);
    if (config.mountingSystem === 'chains') premiumTotal += 15;
    if (config.mountingSystem === 'base') premiumTotal += 15;
    if (config.mountingSystem === 'stand') premiumTotal += 15;
    if (config.acrylicSupport === 'colored') premiumTotal += 15;
    return basePrice + premiumTotal;
  };

  const handleAddToCart = () => {
    const price = calculatePrice();
    addToCart(config, price);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      handleAddToCart();
    }
    setShowCheckout(true);
  };

  const handleOrderComplete = (orderData: any) => {
    console.log('Commande complétée:', orderData);
    clearCart();
    alert('Commande confirmée ! Vous recevrez un email de confirmation.');
  };

  const steps = ['Texte', 'Couleurs', 'Style', 'Éclairage', 'Support', 'Fixation', 'Taille', 'Finaliser'];
  const totalPrice = calculatePrice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      {/* Mobile Wizard */}
      <MobileWizard 
        currentStep={currentStep} 
        onStepClick={setCurrentStep}
        isScrolled={isScrolled}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            LumiNéon Customizer
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Créez votre néon personnalisé en temps réel
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setShowSaveHeartPopup(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-red-600/20 hover:from-pink-500/30 hover:to-red-600/30 border border-pink-500/50 text-pink-400 px-4 py-2 rounded-xl transition-all hover:scale-105"
            >
              <Heart size={18} />
              Coup de Cœur
            </button>
            
            <button
              onClick={() => setShowShareGreenPopup(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-500/50 text-green-400 px-4 py-2 rounded-xl transition-all hover:scale-105"
            >
              <Share2 size={18} />
              Partager
            </button>
            
            <button
              onClick={() => setShowFavoritesPopup(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 hover:from-yellow-500/30 hover:to-orange-600/30 border border-yellow-500/50 text-yellow-400 px-4 py-2 rounded-xl transition-all hover:scale-105"
            >
              <Star size={18} />
              Favoris ({favorites.length})
            </button>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/50 text-blue-400 px-4 py-2 rounded-xl transition-all hover:scale-105 relative"
            >
              <ShoppingCart size={18} />
              Panier
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <button
              onClick={toggleMode}
              className="flex items-center gap-2 bg-gradient-to-r from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 border border-gray-500/50 text-gray-400 px-4 py-2 rounded-xl transition-all hover:scale-105"
            >
              {theme.mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {theme.mode === 'dark' ? 'Clair' : 'Sombre'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          currentStep={currentStep - 1}
          totalSteps={steps.length}
          steps={steps}
          onStepClick={(stepIndex) => setCurrentStep(stepIndex + 1)}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Step 1: Text */}
            {currentStep === 1 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Type className="text-blue-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">1. Votre Texte</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Texte du néon *
                    </label>
                    <MobileOptimizedInput
                      value={config.text}
                      onChange={handleTextChange}
                      placeholder="MON NÉON"
                      maxLength={30}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="multiline"
                      checked={config.multiline}
                      onChange={(e) => {
                        if (e.target.checked) {
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
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="multiline" className="text-sm text-gray-300">
                      Texte multi-lignes
                    </label>
                  </div>

                  {config.multiline && (
                    <div className="space-y-2">
                      {config.lines.map((line, index) => (
                        <div key={index} className="flex gap-2">
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
                            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder={`Ligne ${index + 1}`}
                            maxLength={15}
                          />
                          {config.lines.length > 1 && (
                            <button
                              onClick={() => {
                                const newLines = config.lines.filter((_, i) => i !== index);
                                updateConfig({ 
                                  lines: newLines,
                                  text: newLines.join('\n')
                                });
                              }}
                              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      {config.lines.length < 3 && (
                        <button
                          onClick={() => {
                            const newLines = [...config.lines, ''];
                            updateConfig({ 
                              lines: newLines,
                              text: newLines.join('\n')
                            });
                          }}
                          className="w-full px-3 py-2 border-2 border-dashed border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300 rounded-lg transition-all"
                        >
                          + Ajouter une ligne
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    Suivant: Couleurs →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Colors */}
            {currentStep === 2 && (
              <>
                <ColorPicker
                  color={config.color}
                  gradientColors={config.gradientColors}
                  useGradient={config.useGradient}
                  onChange={handleColorChange}
                  onGradientChange={handleGradientChange}
                  onGradientToggle={handleGradientToggle}
                />
                
                <TrendingColors
                  onColorSelect={handleColorChange}
                  currentColor={config.color}
                />

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    ← Précédent
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    Suivant: Style →
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Style */}
            {currentStep === 3 && (
              <>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" size={24} />
                    <h3 className="text-xl font-semibold text-white">3. Effets Lumineux</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'static', name: 'Statique', description: 'Éclairage constant' },
                      { id: 'pulse', name: 'Pulsation', description: 'Battement régulier' },
                      { id: 'blink', name: 'Clignotant', description: 'On/Off rapide' },
                      { id: 'gradient', name: 'Dégradé', description: 'Transition douce' }
                    ].map((effect) => (
                      <button
                        key={effect.id}
                        onClick={() => handleEffectChange(effect.id)}
                        className={`p-4 rounded-xl border transition-all hover:scale-[1.02] text-left ${
                          config.effect === effect.id
                            ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                            : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                        }`}
                      >
                        <div className="font-semibold">{effect.name}</div>
                        <div className="text-sm text-gray-400">{effect.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <AdvancedConfigurator
                  config={config}
                  updateConfig={updateConfig}
                  onResetPositions={resetWordPositions}
                />

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    ← Précédent
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    Suivant: Éclairage →
                  </button>
                </div>
              </>
            )}

            {/* Step 4: Lighting Effect */}
            {currentStep === 4 && (
              <>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="relative bg-purple-500/20 p-3 rounded-2xl border border-purple-400/30 shadow-lg shadow-purple-500/20">
                      <Zap className="text-purple-400 animate-pulse" size={24} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">4. Effet Lumineux</h3>
                      <p className="text-purple-300 text-sm">Choisissez l'animation de votre néon</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                    {[
                      { 
                        id: 'fixe', 
                        name: 'Fixe', 
                        description: 'Éclairage constant et stable',
                        icon: '💡',
                        color: 'from-blue-500/20 to-cyan-600/20',
                        border: 'border-blue-500/50',
                        preview: 'STABLE'
                      },
                      { 
                        id: 'clignotant', 
                        name: 'Clignotant', 
                        description: 'Effet on/off rythmé',
                        icon: '⚡',
                        color: 'from-yellow-500/20 to-orange-600/20',
                        border: 'border-yellow-500/50',
                        preview: 'FLASH'
                      },
                      { 
                        id: 'degrade', 
                        name: 'Dégradé', 
                        description: 'Transition douce des couleurs',
                        icon: '🌈',
                        color: 'from-pink-500/20 to-purple-600/20',
                        border: 'border-pink-500/50',
                        preview: 'SMOOTH'
                      },
                      { 
                        id: 'fade', 
                        name: 'Fade', 
                        description: 'Variation douce d\'intensité',
                        icon: '🌙',
                        color: 'from-indigo-500/20 to-purple-600/20',
                        border: 'border-indigo-500/50',
                        preview: 'SOFT'
                      },
                      { 
                        id: 'rgb', 
                        name: 'RGB', 
                        description: 'Cycle complet des couleurs',
                        icon: '🎨',
                        color: 'from-green-500/20 to-blue-600/20',
                        border: 'border-green-500/50',
                        preview: 'RAINBOW'
                      }
                    ].map((effect) => (
                      <button
                        key={effect.id}
                        onClick={() => handleLightingEffectChange(effect.id)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] text-left overflow-hidden shadow-lg hover:shadow-xl ${
                          config.lightingEffect === effect.id
                            ? `${effect.border} bg-gradient-to-br ${effect.color} shadow-2xl`
                            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        }`}
                      >
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-3xl">{effect.icon}</div>
                            <div className={`text-xs font-bold px-3 py-1 rounded-full border ${
                              config.lightingEffect === effect.id 
                                ? 'bg-white/20 text-white border-white/30' 
                                : 'bg-gray-800/50 text-gray-400 border-gray-600'
                            }`}>
                              {effect.preview}
                            </div>
                          </div>
                          <div className={`font-bold text-lg mb-2 ${
                            config.lightingEffect === effect.id ? 'text-white' : 'text-gray-200'
                          }`}>
                            {effect.name}
                          </div>
                          <div className="text-sm text-gray-400">{effect.description}</div>
                          
                          {config.lightingEffect === effect.id && (
                            <div className="mt-3 flex items-center gap-2 text-xs text-green-400 font-medium">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              Sélectionné
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    ← Précédent
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    Suivant: Support →
                  </button>
                </div>
              </>
            )}

            {/* Step 5: Acrylic Support */}
            {currentStep === 5 && (
              <>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="relative bg-emerald-500/20 p-3 rounded-2xl border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
                      <Layers className="text-emerald-400 animate-pulse" size={24} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">5. Support Acrylique</h3>
                      <p className="text-emerald-300 text-sm">Type de panneau pour votre néon</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    {[
                      { 
                        id: 'decoupe', 
                        name: 'Découpé à la forme', 
                        description: 'Panneau épousant exactement votre texte',
                        icon: '✂️',
                        color: 'from-blue-500/20 to-indigo-600/20',
                        border: 'border-blue-500/50',
                        price: '+0€',
                        popular: true
                      },
                      { 
                        id: 'imprime', 
                        name: 'Imprimé', 
                        description: 'Design imprimé sur panneau transparent',
                        icon: '🖨️',
                        color: 'from-purple-500/20 to-pink-600/20',
                        border: 'border-purple-500/50',
                        price: '+15€'
                      },
                      { 
                        id: 'colore', 
                        name: 'Coloré', 
                        description: 'Panneau acrylique teinté dans la masse',
                        icon: '🎨',
                        color: 'from-orange-500/20 to-red-600/20',
                        border: 'border-orange-500/50',
                        price: '+25€'
                      }
                    ].map((support) => (
                      <button
                        key={support.id}
                        onClick={() => handleAcrylicSupportChange(support.id)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] text-left overflow-hidden shadow-lg hover:shadow-xl ${
                          config.acrylicSupport === support.id
                            ? `${support.border} bg-gradient-to-br ${support.color} shadow-2xl`
                            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        }`}
                      >
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-3xl">{support.icon}</div>
                            {support.popular && (
                              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                POPULAIRE
                              </div>
                            )}
                          </div>
                          <div className={`font-bold text-lg mb-2 ${
                            config.acrylicSupport === support.id ? 'text-white' : 'text-gray-200'
                          }`}>
                            {support.name}
                          </div>
                          <div className="text-sm text-gray-400 mb-3">{support.description}</div>
                          <div className={`text-lg font-bold ${
                            config.acrylicSupport === support.id ? 'text-emerald-400' : 'text-gray-300'
                          }`}>
                            {support.price}
                          </div>
                          
                          {config.acrylicSupport === support.id && (
                            <div className="mt-3 flex items-center gap-2 text-xs text-green-400 font-medium">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              Sélectionné
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    ← Précédent
                  </button>
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    Suivant: Fixation →
                  </button>
                </div>
              </>
            )}

            {/* Step 6: Mounting System */}
            {currentStep === 6 && (
              <>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/5 to-orange-500/5 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="relative bg-amber-500/20 p-3 rounded-2xl border border-amber-400/30 shadow-lg shadow-amber-500/20">
                      <div className="text-amber-400 text-2xl">🔧</div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">6. Système de Fixation</h3>
                      <p className="text-amber-300 text-sm">Comment installer votre néon</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                    {[
                      { 
                        id: 'trous', 
                        name: 'Trous de fixation', 
                        description: 'Perçage mural avec vis (incluses)',
                        icon: '🔩',
                        color: 'from-gray-500/20 to-slate-600/20',
                        border: 'border-gray-500/50',
                        price: '+0€',
                        popular: true
                      },
                      { 
                        id: 'chaines', 
                        name: 'Chaînes suspendues', 
                        description: 'Suspension élégante avec chaînes',
                        icon: '⛓️',
                        color: 'from-blue-500/20 to-cyan-600/20',
                        border: 'border-blue-500/50',
                        price: '+20€'
                      },
                      { 
                        id: 'autocollant', 
                        name: 'Autocollant 3M', 
                        description: 'Adhésif haute performance, sans perçage',
                        icon: '📎',
                        color: 'from-green-500/20 to-emerald-600/20',
                        border: 'border-green-500/50',
                        price: '+10€'
                      },
                      { 
                        id: 'base', 
                        name: 'Base de table', 
                        description: 'Support stable pour poser sur meuble',
                        icon: '🏛️',
                        color: 'from-purple-500/20 to-violet-600/20',
                        border: 'border-purple-500/50',
                        price: '+35€'
                      },
                      { 
                        id: 'pied', 
                        name: 'Pied sur roulettes', 
                        description: 'Support mobile avec roulettes',
                        icon: '🛞',
                        color: 'from-orange-500/20 to-red-600/20',
                        border: 'border-orange-500/50',
                        price: '+50€'
                      }
                    ].map((mounting) => (
                      <button
                        key={mounting.id}
                        onClick={() => handleMountingSystemChange(mounting.id)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] text-left overflow-hidden shadow-lg hover:shadow-xl ${
                          config.mountingSystem === mounting.id
                            ? `${mounting.border} bg-gradient-to-br ${mounting.color} shadow-2xl`
                            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        }`}
                      >
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-3xl">{mounting.icon}</div>
                            {mounting.popular && (
                              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                POPULAIRE
                              </div>
                            )}
                          </div>
                          <div className={`font-bold text-lg mb-2 ${
                            config.mountingSystem === mounting.id ? 'text-white' : 'text-gray-200'
                          }`}>
                            {mounting.name}
                          </div>
                          <div className="text-sm text-gray-400 mb-3">{mounting.description}</div>
                          <div className={`text-lg font-bold ${
                            config.mountingSystem === mounting.id ? 'text-amber-400' : 'text-gray-300'
                          }`}>
                            {mounting.price}
                          </div>
                          
                          {config.mountingSystem === mounting.id && (
                            <div className="mt-3 flex items-center gap-2 text-xs text-green-400 font-medium">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              Sélectionné
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    ← Précédent
                  </button>
                  <button
                    onClick={() => setCurrentStep(7)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    Suivant: Taille →
                  </button>
                </div>
              </>
            )}

            {/* Step 7: Size */}
            {currentStep === 7 && (
              <>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <Ruler className="text-green-400" size={24} />
                    <h3 className="text-xl font-semibold text-white">7. Dimensions</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        id: '50cm', 
                        name: '50cm', 
                        description: 'Parfait pour intérieur',
                        price: '120€',
                        dimensions: '50cm × 30cm'
                      },
                      { 
                        id: '100cm', 
                        name: '100cm', 
                        description: 'Impact maximum',
                        price: '200€',
                        dimensions: '100cm × 60cm'
                      }
                    ].map((size) => (
                      <button
                        key={size.id}
                        onClick={() => handleSizeChange(size.id)}
                        className={`p-6 rounded-xl border transition-all hover:scale-[1.02] text-left ${
                          config.size === size.id
                            ? 'border-green-400 bg-green-400/10 text-green-400'
                            : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                        }`}
                      >
                        <div className="font-bold text-xl mb-2">{size.name}</div>
                        <div className="text-sm text-gray-400 mb-2">{size.description}</div>
                        <div className="text-lg font-semibold">{size.price}</div>
                        <div className="text-xs text-gray-500">{size.dimensions}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <PremiumOptions
                  selectedOptions={selectedPremiumOptions}
                  onToggleOption={handlePremiumToggle}
                />

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    ← Précédent
                  </button>
                  <button
                    onClick={() => setCurrentStep(8)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    Finaliser →
                  </button>
                </div>
              </>
            )}

            {/* Step 8: Finalize */}
            {currentStep === 8 && (
              <>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-purple-400" size={24} />
                    <h3 className="text-xl font-semibold text-white">8. Finaliser</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-600">
                      <h4 className="font-semibold text-white mb-3">Résumé de votre néon</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Texte:</span>
                          <span className="text-white font-medium">"{config.multiline ? config.lines.join(' / ') : config.text}"</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Taille:</span>
                          <span className="text-white">{config.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Couleur:</span>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-500"
                              style={{ backgroundColor: config.color }}
                            />
                            <span className="text-white">{config.useGradient ? 'Dégradé' : 'Unie'}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Effet:</span>
                          <span className="text-white capitalize">{config.effect}</span>
                        </div>
                      </div>
                    </div>

                    {/* Final Price & Order */}
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-xl p-6 border border-pink-500/30">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">{totalPrice}€</div>
                        <div className="text-sm text-gray-300 mb-4">TTC, Livraison comprise</div>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/50 text-blue-400 py-3 px-4 rounded-xl transition-all hover:scale-105"
                          >
                            <ShoppingCart size={18} />
                            Ajouter au panier
                          </button>
                          <button
                            onClick={handleCheckout}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-500/50 text-green-400 py-3 px-4 rounded-xl transition-all hover:scale-105"
                          >
                            <ShoppingCart size={24} />
                            Commander
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(7)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  >
                    ← Précédent
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <NeonPreview3D
              config={config}
              wordPositions={wordPositions}
              onUpdateWordPosition={handleWordPositionUpdate}
            />
          </div>
        </div>
      </div>

      {/* Popups */}
      <ARPopup
        isOpen={showARPopup}
        onClose={() => setShowARPopup(false)}
        config={config}
      />

      <CustomImageUpload
        isOpen={showCustomImageUpload}
        onClose={() => setShowCustomImageUpload(false)}
        onSubmit={handleCustomImageSubmit}
      />

      <SharePopup
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        config={config}
      />

      <SharePopupGreen
        isOpen={showShareGreenPopup}
        onClose={() => setShowShareGreenPopup(false)}
        config={config}
      />

      <ShareBottomPopup
        isOpen={showShareBottomPopup}
        onClose={() => setShowShareBottomPopup(false)}
        config={config}
      />

      <SaveDesignPopup
        isOpen={showSavePopup}
        onClose={() => setShowSavePopup(false)}
        config={config}
      />

      <SaveHeartPopup
        isOpen={showSaveHeartPopup}
        onClose={() => setShowSaveHeartPopup(false)}
        config={config}
      />

      <FavoritesPopup
        isOpen={showFavoritesPopup}
        onClose={() => setShowFavoritesPopup(false)}
        favorites={favorites}
        onLoadFavorite={(favoriteConfig) => {
          setConfig(favoriteConfig);
          setShowFavoritesPopup(false);
        }}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCheckout}
        totalPrice={getTotalPrice()}
      />

      {showCheckout && (
        <OnePageCheckout
          items={cartItems}
          totalPrice={getTotalPrice()}
          onClose={() => setShowCheckout(false)}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </div>
  );
};

export default NeonCustomizer;