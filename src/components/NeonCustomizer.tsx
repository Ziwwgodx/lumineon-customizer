import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Heart, Share2, Eye, Palette, Type, Zap, Ruler, Sparkles, Save, Star, Download, Upload, Image, Grid, Move, RotateCcw, ZoomIn, ZoomOut, Fullscreen, Sun, Moon, Layers } from 'lucide-react';
import { NeonConfig, CartItem, PremiumOption } from '../types';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';
import { Type, Palette, Zap, Ruler, ShoppingCart, ChevronLeft, ChevronRight, Save, Share2, Heart, Star, Layers, Settings, Sparkles, Plus, X, Check, Upload, Eye } from 'lucide-react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import NeonPreview3D from './NeonPreview3D';
import ColorPicker from './ColorPicker';
import Cart from './Cart';
import ARPopup from './ARPopup';
import SharePopup from './SharePopup';
import SharePopupGreen from './SharePopupGreen';
import ShareBottomPopup from './ShareBottomPopup';
import SaveDesignPopup from './SaveDesignPopup';
import SaveHeartPopup from './SaveHeartPopup';
import FavoritesPopup from './FavoritesPopup';
import CustomImageUpload from './CustomImageUpload';
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
  const [showCustomImageUpload, setShowCustomImageUpload] = useState(false);
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

  const handleCustomImageSubmit = (formData: any) => {
    // Simuler l'envoi de la demande
    console.log('Custom image request:', formData);
    alert('🎨 Demande envoyée ! Notre équipe vous recontactera sous 24h avec un devis personnalisé.');
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
                <div className="space-y-8">
                  {/* Couleurs populaires */}
                  <div className="p-6 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl border border-pink-400/20">
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="text-pink-400 animate-spin" size={20} />
                      <h4 className="text-lg font-semibold text-white">Couleurs Populaires</h4>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      {[
                        { color: '#ff0080', name: 'Rose Néon' },
                        { color: '#00ffff', name: 'Cyan' },
                        { color: '#00ff41', name: 'Vert Lime' },
                        { color: '#ff4500', name: 'Orange' },
                        { color: '#8B5CF6', name: 'Violet' },
                        { color: '#ffff00', name: 'Jaune' },
                        { color: '#ff1744', name: 'Rouge' },
                        { color: '#0099ff', name: 'Bleu' }
                      ].map((colorItem) => (
                        <button
                          key={colorItem.color}
                          onClick={() => updateConfig({ color: colorItem.color })}
                          className={`group relative aspect-square rounded-2xl border-2 transition-all hover:scale-110 ${
                            config.color === colorItem.color 
                              ? 'border-white shadow-2xl' 
                              : 'border-gray-600 hover:border-gray-400'
                          }`}
                          style={{
                            backgroundColor: colorItem.color,
                            boxShadow: config.color === colorItem.color 
                              ? `0 0 30px ${colorItem.color}60, 0 0 60px ${colorItem.color}30` 
                              : 'none'
                          }}
                        >
                          {config.color === colorItem.color && (
                            <div className="absolute inset-0 rounded-2xl bg-white/20 flex items-center justify-center">
                              <Check className="text-white drop-shadow-lg" size={20} />
                            </div>
                          )}
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all">
                            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {colorItem.name}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sélecteur de couleur personnalisé */}
                  <div className="p-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl border border-purple-400/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="text-purple-400 animate-bounce" size={20} />
                      <h4 className="text-lg font-semibold text-white">Couleur Personnalisée</h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={config.color}
                        onChange={(e) => updateConfig({ color: e.target.value })}
                        className="w-16 h-16 rounded-2xl border-2 border-purple-400/50 bg-transparent cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-110"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={config.color}
                          onChange={(e) => updateConfig({ color: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-800/80 border border-purple-400/30 rounded-xl text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                          placeholder="#ff0080"
                        />
                      </div>
                    </div>
                  </div>
                        )}

                {/* Next Step Teaser */}
                <div className="mt-8 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-600/10 rounded-2xl border border-yellow-400/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent animate-pulse"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Type className="text-yellow-400 animate-pulse" size={20} />
                      <span className="text-white font-semibold">Prochaine étape : Style de police ✍️</span>
                    </div>
                    <ChevronRight className="text-yellow-400 animate-bounce" size={20} />
                  </div>
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-500/50 text-green-400 py-3 px-4 rounded-xl transition-all hover:scale-105"
                      >
                    {/* Final Price & Order */}
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-xl p-6 border border-pink-500/30">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">{totalPrice}€</div>
                        <div className="text-sm text-gray-300 mb-4">TTC, Livraison comprise</div>
            <div className="relative bg-gradient-to-br from-yellow-500/10 via-orange-600/10 to-red-500/10 backdrop-blur-xl rounded-3xl p-8 border border-yellow-400/30 shadow-2xl shadow-yellow-500/20 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-600/5 to-red-500/5 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative bg-yellow-500/20 p-4 rounded-2xl border border-yellow-400/30 shadow-lg shadow-yellow-500/20">
                      <Type className="text-yellow-400 animate-pulse" size={28} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">✍️ Style de Police</h3>
                      <p className="text-yellow-300 text-sm">Choisissez la personnalité de votre néon</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'tilt-neon', name: 'Tilt Néon', desc: 'Authentique néon', preview: 'NÉON', family: '"Tilt Neon", cursive' },
                    { id: 'orbitron', name: 'Orbitron', desc: 'Futuriste moderne', preview: 'TECH', family: '"Orbitron", monospace' },
                    { id: 'audiowide', name: 'Audiowide', desc: 'Rétro gaming', preview: 'RETRO', family: '"Audiowide", cursive' },
                    { id: 'electrolize', name: 'Electrolize', desc: 'Électronique', preview: 'ELEC', family: '"Electrolize", sans-serif' },
                    { id: 'bebas-neue', name: 'Bebas Neue', desc: 'Impact moderne', preview: 'BOLD', family: '"Bebas Neue", cursive' },
                    { id: 'righteous', name: 'Righteous', desc: 'Arrondi fun', preview: 'FUN', family: '"Righteous", cursive' }
                  ].map((font) => (
                    <button
                      key={font.id}
                      onClick={() => updateConfig({ font: font.id as any })}
                      className={`group relative p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] text-left overflow-hidden ${
                        config.font === font.id
                          ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-orange-600/20 shadow-2xl shadow-yellow-500/30'
                          : 'border-gray-600 bg-gradient-to-br from-gray-800/50 to-gray-700/50 hover:border-yellow-400/50 hover:bg-gradient-to-br hover:from-yellow-400/10 hover:to-orange-600/10'
                      }`}
                    >
                      {/* Animated background for selected */}
                      {config.font === font.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent animate-pulse"></div>
                      )}
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-bold text-white text-lg">{font.name}</div>
                          <div 
                            className={`text-2xl font-bold px-3 py-1 rounded-lg border transition-all ${
                              config.font === font.id
                                ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                                : 'bg-gray-800/50 border-gray-600 text-gray-300'
                            }`}
                            style={{ fontFamily: font.family }}
                          >
                            {font.preview}
                          </div>
                        </div>
                        <div className={`text-sm transition-all ${
                          config.font === font.id ? 'text-yellow-300' : 'text-gray-400'
                        }`}>
                          {font.desc}
                        </div>
                        
                        {config.font === font.id && (
                          <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                              <Check className="text-white" size={14} />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Next Step Teaser */}
                <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-2xl border border-green-400/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-pulse"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="text-green-400 animate-pulse" size={20} />
                      <span className="text-white font-semibold">Prochaine étape : Effets lumineux ⚡</span>
                    </div>
                    <ChevronRight className="text-green-400 animate-bounce" size={20} />
                  </div>
                </div>
                          <ShoppingCart size={24} />
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <NeonPreview3D
            <div className="relative bg-gradient-to-br from-green-500/10 via-emerald-600/10 to-teal-500/10 backdrop-blur-xl rounded-3xl p-8 border border-green-400/30 shadow-2xl shadow-green-500/20 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-600/5 to-teal-500/5 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative bg-green-500/20 p-4 rounded-2xl border border-green-400/30 shadow-lg shadow-green-500/20">
                      <Zap className="text-green-400 animate-pulse" size={28} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">⚡ Effets Lumineux</h3>
                      <p className="text-green-300 text-sm">Donnez vie à votre néon avec des effets magiques</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 'static', name: '💡 Fixe', desc: 'Éclairage constant et stable', color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-400/50' },
                    { id: 'blink', name: '⚡ Clignotant', desc: 'Clignotement rythmé', color: 'from-yellow-500/20 to-orange-600/20', border: 'border-yellow-400/50' },
                    { id: 'fade', name: '🌊 Fade', desc: 'Variation douce d\'intensité', color: 'from-purple-500/20 to-pink-600/20', border: 'border-purple-400/50' },
                    { id: 'pulse', name: '💓 Pulse', desc: 'Pulsation comme un cœur', color: 'from-red-500/20 to-pink-600/20', border: 'border-red-400/50' },
                    { id: 'rgb', name: '🌈 RGB', desc: 'Changement de couleurs', color: 'from-green-500/20 to-cyan-600/20', border: 'border-green-400/50' }
                  ].map((effect) => (
                    <button
                      key={effect.id}
                      onClick={() => updateConfig({ effect: effect.id })}
                      className={`group relative p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] text-center overflow-hidden ${
                        config.effect === effect.id
                          ? `${effect.border} bg-gradient-to-br ${effect.color} shadow-2xl`
                          : 'border-gray-600 bg-gradient-to-br from-gray-800/50 to-gray-700/50 hover:border-gray-400'
                      }`}
                    >
                      {/* Animated background for selected */}
                      {config.effect === effect.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                      )}
                      
                      <div className="relative z-10">
                        <div className="text-2xl mb-3">{effect.name.split(' ')[0]}</div>
                        <div className={`font-bold text-lg mb-2 transition-all ${
                          config.effect === effect.id ? 'text-white' : 'text-gray-300'
                        }`}>
                          {effect.name.split(' ').slice(1).join(' ')}
                        </div>
                        <div className={`text-sm transition-all ${
                          config.effect === effect.id ? 'text-gray-200' : 'text-gray-400'
                        }`}>
                          {effect.desc}
                        </div>
                        
                        {config.effect === effect.id && (
                          <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                              <Check className="text-white" size={14} />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Next Step Teaser */}
                <div className="mt-8 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-2xl border border-cyan-400/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Layers className="text-cyan-400 animate-pulse" size={20} />
                      <span className="text-white font-semibold">Prochaine étape : Support acrylique 🎨</span>
                    </div>
                    <ChevronRight className="text-cyan-400 animate-bounce" size={20} />
                  </div>
                </div>
              onUpdateWordPosition={handleWordPositionUpdate}
        onClose={() => setShowARPopup(false)}
        config={config}
      />

      <CustomImageUpload
        isOpen={showCustomImageUpload}
        onClose={() => setShowCustomImageUpload(false)}
        onSubmit={handleCustomImageSubmit}
      />
      <SharePopup
            <div className="relative bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-indigo-500/10 backdrop-blur-xl rounded-3xl p-8 border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-600/5 to-indigo-500/5 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative bg-cyan-500/20 p-4 rounded-2xl border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                      <Layers className="text-cyan-400 animate-pulse" size={28} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">🎨 Support Acrylique</h3>
                      <p className="text-cyan-300 text-sm">Choisissez le style de votre support</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { 
                      id: 'cut', 
                      name: '✂️ Découpé à la forme', 
                      desc: 'Support transparent découpé précisément selon votre texte', 
                      price: 0,
                      popular: true,
                      color: 'from-green-500/20 to-emerald-600/20',
                      border: 'border-green-400/50'
                    },
                    { 
                      id: 'printed', 
                      name: '🖨️ Imprimé', 
                      desc: 'Support avec impression couleur personnalisée', 
                      price: 10,
                      color: 'from-blue-500/20 to-cyan-600/20',
                      border: 'border-blue-400/50'
                    },
                    { 
                      id: 'colored', 
                      name: '🌈 Coloré', 
                      desc: 'Support acrylique teinté dans la masse', 
                      price: 15,
                      color: 'from-purple-500/20 to-pink-600/20',
                      border: 'border-purple-400/50'
                    }
                  ].map((support) => (
                    <button
                      key={support.id}
                      onClick={() => updateConfig({ acrylicSupport: support.id })}
                      className={`group relative p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] text-left overflow-hidden ${
                        config.acrylicSupport === support.id
                          ? `${support.border} bg-gradient-to-br ${support.color} shadow-2xl`
                          : 'border-gray-600 bg-gradient-to-br from-gray-800/50 to-gray-700/50 hover:border-gray-400'
                      }`}
                    >
                      {/* Popular badge */}
                      {support.popular && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                          POPULAIRE
                        </div>
                      )}
                      
                      {/* Animated background for selected */}
                      {config.acrylicSupport === support.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                      )}
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-2xl">{support.name.split(' ')[0]}</div>
                          <div className={`text-lg font-bold transition-all ${
                            config.acrylicSupport === support.id ? 'text-white' : 'text-gray-300'
                          }`}>
                            {support.price === 0 ? 'Inclus' : `+${support.price}€`}
                          </div>
                        </div>
                        
                        <div className={`font-bold text-lg mb-3 transition-all ${
                          config.acrylicSupport === support.id ? 'text-white' : 'text-gray-300'
                        }`}>
                          {support.name.split(' ').slice(1).join(' ')}
                        </div>
                        
                        <div className={`text-sm leading-relaxed transition-all ${
                          config.acrylicSupport === support.id ? 'text-gray-200' : 'text-gray-400'
                        }`}>
                          {support.desc}
                        </div>
                        
                        {config.acrylicSupport === support.id && (
                          <div className="absolute bottom-3 right-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                              <Check className="text-white" size={14} />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Next Step Teaser */}
                <div className="mt-8 p-4 bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-2xl border border-orange-400/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent animate-pulse"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Settings className="text-orange-400 animate-pulse" size={20} />
                      <span className="text-white font-semibold">Prochaine étape : Système de fixation 🔧</span>
                    </div>
                    <ChevronRight className="text-orange-400 animate-bounce" size={20} />
                  </div>
                </div>
      <SharePopupGreen
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
            <div className="relative bg-gradient-to-br from-orange-500/10 via-red-600/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-orange-400/30 shadow-2xl shadow-orange-500/20 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-600/5 to-pink-500/5 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-400 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative bg-orange-500/20 p-4 rounded-2xl border border-orange-400/30 shadow-lg shadow-orange-500/20">
                      <Settings className="text-orange-400 animate-pulse" size={28} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">🔧 Système de Fixation</h3>
                      <p className="text-orange-300 text-sm">Comment voulez-vous installer votre néon ?</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      id: 'holes', 
                      name: '🔩 Trous', 
                      desc: 'Fixation par vis dans le mur (le plus stable)', 
                      price: 0,
                      color: 'from-gray-500/20 to-gray-600/20',
                      border: 'border-gray-400/50'
                    },
                    { 
                      id: 'chains', 
                      name: '⛓️ Chaînes', 
                      desc: 'Suspension élégante par chaînes décoratives', 
                      price: 15,
                      color: 'from-yellow-500/20 to-amber-600/20',
                      border: 'border-yellow-400/50'
                    },
                    { 
                      id: 'sticker', 
                      name: '🔖 Autocollant', 
                      desc: 'Adhésif 3M ultra-fort (sans perçage)', 
                      price: 10,
                      color: 'from-green-500/20 to-emerald-600/20',
                      border: 'border-green-400/50'
                    },
                    { 
                      id: 'base', 
                      name: '📐 Base', 
                      desc: 'Socle de table en acrylique transparent', 
                      price: 15,
                      color: 'from-blue-500/20 to-cyan-600/20',
                      border: 'border-blue-400/50'
                    },
                    { 
                      id: 'stand', 
                      name: '🦵 Pied', 
                      desc: 'Support sur pied réglable en hauteur', 
                      price: 15,
                      color: 'from-purple-500/20 to-pink-600/20',
                      border: 'border-purple-400/50'
                    }
                  ].map((mounting) => (
                    <button
                      key={mounting.id}
                      onClick={() => updateConfig({ mountingSystem: mounting.id })}
                      className={`group relative p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] text-left overflow-hidden ${
                        config.mountingSystem === mounting.id
                          ? `${mounting.border} bg-gradient-to-br ${mounting.color} shadow-2xl`
                          : 'border-gray-600 bg-gradient-to-br from-gray-800/50 to-gray-700/50 hover:border-gray-400'
                      }`}
                    >
                      {/* Animated background for selected */}
                      {config.mountingSystem === mounting.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                      )}
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-2xl">{mounting.name.split(' ')[0]}</div>
                          <div className={`text-lg font-bold transition-all ${
                            config.mountingSystem === mounting.id ? 'text-white' : 'text-gray-300'
                          }`}>
                            {mounting.price === 0 ? 'Inclus' : `+${mounting.price}€`}
                          </div>
                        </div>
                        
                        <div className={`font-bold text-lg mb-3 transition-all ${
                          config.mountingSystem === mounting.id ? 'text-white' : 'text-gray-300'
                        }`}>
                          {mounting.name.split(' ').slice(1).join(' ')}
                        </div>
                        
                        <div className={`text-sm leading-relaxed transition-all ${
                          config.mountingSystem === mounting.id ? 'text-gray-200' : 'text-gray-400'
                        }`}>
                          {mounting.desc}
                        </div>
                        
                        {config.mountingSystem === mounting.id && (
                          <div className="absolute bottom-3 right-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
                              <Check className="text-white" size={14} />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                    <div>
                {/* Next Step Teaser */}
                <div className="mt-8 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-2xl border border-indigo-400/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent animate-pulse"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Ruler className="text-indigo-400 animate-pulse" size={20} />
                      <span className="text-white font-semibold">Prochaine étape : Taille du néon 📏</span>
                    </div>
                    <ChevronRight className="text-indigo-400 animate-bounce" size={20} />
                  </div>
                </div>
                      <h3 className="text-2xl font-bold text-white mb-1">✨ Votre Message Néon</h3>
                      <Layers className="text-purple-400 animate-pulse" size={20} />
                      <span className="text-white font-semibold">Mode Multi-lignes</span>
                    </div>
                    <button
                      onClick={() => {
            <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-600/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-8 border border-indigo-400/30 shadow-2xl shadow-indigo-500/20 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-600/5 to-blue-500/5 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-400 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative bg-indigo-500/20 p-4 rounded-2xl border border-indigo-400/30 shadow-lg shadow-indigo-500/20">
                      <Ruler className="text-indigo-400 animate-pulse" size={28} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">📏 Taille du Néon</h3>
                      <p className="text-indigo-300 text-sm">Choisissez la dimension parfaite</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { 
                      id: '50cm', 
                      name: '📐 Petit Format', 
                      size: '50cm',
                      desc: 'Parfait pour chambre, bureau ou décoration d\'intérieur', 
                      price: 120,
                      dimensions: '50cm × 30cm',
                      popular: false,
                      color: 'from-blue-500/20 to-cyan-600/20',
                      border: 'border-blue-400/50'
                    },
                    { 
                      id: '100cm', 
                      name: '📏 Grand Format', 
                      size: '100cm',
                      desc: 'Idéal pour commerce, restaurant ou grande pièce', 
                      price: 200,
                      dimensions: '100cm × 60cm',
                      popular: true,
                      color: 'from-purple-500/20 to-pink-600/20',
                      border: 'border-purple-400/50'
                    }
                  ].map((size) => (
                    <button
                      key={size.id}
                      onClick={() => updateConfig({ size: size.id })}
                      className={`group relative p-8 rounded-3xl border-2 transition-all hover:scale-[1.02] text-left overflow-hidden ${
                        config.size === size.id
                          ? `${size.border} bg-gradient-to-br ${size.color} shadow-2xl`
                          : 'border-gray-600 bg-gradient-to-br from-gray-800/50 to-gray-700/50 hover:border-gray-400'
                      }`}
                    >
                      {/* Popular badge */}
                      {size.popular && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full animate-pulse shadow-lg">
                          ⭐ POPULAIRE
                        </div>
                      )}
                      
                      {/* Animated background for selected */}
                      {config.size === size.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                      )}
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div className="text-4xl">{size.name.split(' ')[0]}</div>
                          <div className={`text-2xl font-bold transition-all ${
                            config.size === size.id ? 'text-white' : 'text-gray-300'
                          }`}>
                            {size.price}€
                          </div>
                        </div>
                        
                        <div className={`font-bold text-2xl mb-2 transition-all ${
                          config.size === size.id ? 'text-white' : 'text-gray-300'
                        }`}>
                          {size.name.split(' ').slice(1).join(' ')}
                        </div>
                        
                        <div className={`text-3xl font-bold mb-4 transition-all ${
                          config.size === size.id ? 'text-white' : 'text-gray-300'
                        }`}>
                          {size.size}
                        </div>
                        
                        <div className={`text-lg mb-4 transition-all ${
                          config.size === size.id ? 'text-gray-200' : 'text-gray-400'
                        }`}>
                          Dimensions : {size.dimensions}
                        </div>
                        
                        <div className={`text-base leading-relaxed transition-all ${
                          config.size === size.id ? 'text-gray-200' : 'text-gray-400'
                        }`}>
                          {size.desc}
                        </div>
                        
                        {config.size === size.id && (
                          <div className="absolute bottom-4 right-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                              <Check className="text-white" size={18} />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                            lines: lines.length > 0 ? lines : [config.text] 
                {/* Next Step Teaser */}
                <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-2xl border border-green-400/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-pulse"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="text-green-400 animate-pulse" size={20} />
                      <span className="text-white font-semibold">Dernière étape : Résumé et commande 🛒</span>
                    </div>
                    <ChevronRight className="text-green-400 animate-bounce" size={20} />
                  </div>
                </div>
                          });
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={line}
                            onChange={(e) => {
            <div className="relative bg-gradient-to-br from-green-500/10 via-emerald-600/10 to-teal-500/10 backdrop-blur-xl rounded-3xl p-8 border border-green-400/30 shadow-2xl shadow-green-500/20 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-600/5 to-teal-500/5 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative bg-green-500/20 p-4 rounded-2xl border border-green-400/30 shadow-lg shadow-green-500/20">
                      <ShoppingCart className="text-green-400 animate-pulse" size={28} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">🛒 Résumé de Commande</h3>
                      <p className="text-green-300 text-sm">Votre néon personnalisé est prêt !</p>
                    </div>
                  </div>
                              });
                            }}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Configuration Summary */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Sparkles className="text-green-400 animate-spin" size={20} />
                      Configuration
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-xl border border-green-400/20">
                        <span className="text-green-300 font-medium">💬 Texte :</span>
                        <span className="text-white font-bold">"{config.multiline ? config.lines.join(' / ') : config.text}"</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-xl border border-pink-400/20">
                        <span className="text-pink-300 font-medium">🎨 Couleur :</span>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: config.color, boxShadow: `0 0 15px ${config.color}50` }}></div>
                          <span className="text-white font-bold">{config.color}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-500/10 to-orange-600/10 rounded-xl border border-yellow-400/20">
                        <span className="text-yellow-300 font-medium">✍️ Police :</span>
                        <span className="text-white font-bold capitalize">{config.font.replace('-', ' ')}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500/10 to-cyan-600/10 rounded-xl border border-blue-400/20">
                        <span className="text-blue-300 font-medium">⚡ Effet :</span>
                        <span className="text-white font-bold capitalize">{config.effect}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-xl border border-cyan-400/20">
                        <span className="text-cyan-300 font-medium">🎨 Support :</span>
                        <span className="text-white font-bold capitalize">{config.acrylicSupport}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-xl border border-orange-400/20">
                        <span className="text-orange-300 font-medium">🔧 Fixation :</span>
                        <span className="text-white font-bold capitalize">{config.mountingSystem}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-xl border border-indigo-400/20">
                        <span className="text-indigo-300 font-medium">📏 Taille :</span>
                        <span className="text-white font-bold">{config.size}</span>
                      </div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-600/5 to-blue-500/5 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 animate-pulse"></div>
                  
                  {/* Preview */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Eye className="text-purple-400 animate-pulse" size={20} />
                      Aperçu Final
                    </h4>
                    
                    <div className="bg-gray-900/80 rounded-2xl p-8 border border-purple-400/30 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-pulse"></div>
                      <div 
                        className="text-4xl font-bold relative z-10 animate-pulse"
                        style={{
                          color: config.color,
                          textShadow: `
                            0 0 5px ${config.color},
                            0 0 10px ${config.color},
                            0 0 15px ${config.color},
                            0 0 20px ${config.color}
                          `,
                          fontFamily: config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
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
                    
                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setShowSavePopup(true)}
                        className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 hover:from-blue-500/30 hover:to-cyan-600/30 border border-blue-400/50 hover:border-cyan-400 text-blue-400 rounded-xl transition-all hover:scale-105 font-semibold"
                      >
                        <Save size={18} />
                        Sauvegarder
                      </button>
                      
                      <button
                        onClick={() => setShowSharePopup(true)}
                        className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-400/50 hover:border-emerald-400 text-green-400 rounded-xl transition-all hover:scale-105 font-semibold"
                      >
                        <Share2 size={18} />
                        Partager
                      </button>
                    </div>
          <div className="md:hidden mt-3 pt-3 border-t border-gray-700">
            <div className="flex justify-center gap-6 text-xs">
              <div className="flex items-center gap-1">
            </div>
          </div>
        </div>
      </div>

      {/* Spacer pour éviter que le contenu soit caché par le footer */}
      <div className="h-32 md:h-24"></div>

      <CustomImageUpload
        isOpen={showCustomImageUpload}
        onClose={() => setShowCustomImageUpload(false)}
        onSubmit={handleCustomImageSubmit}
      />
    </div>
  );
};

export default NeonCustomizer;