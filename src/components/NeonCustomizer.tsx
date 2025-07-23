import React, { useState, useEffect } from 'react';
import { Type, Palette, Zap, Settings, ShoppingCart, Eye, Sparkles, CreditCard, Share2, Heart, Star, Save, Camera, ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
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
import SaveHeartPopup from './SaveHeartPopup';
import FavoritesPopup from './FavoritesPopup';
import ProgressBar from './ProgressBar';
import MobileWizard from './MobileWizard';
import MobileOptimizedInput from './MobileOptimizedInput';
import CustomImageUpload from './CustomImageUpload';
import BackboardStyleSelector from './BackboardStyleSelector';
import AdvancedConfigurator from './AdvancedConfigurator';
import { premiumOptions } from '../data/premiumOptions';

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
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Type className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Votre Texte</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Texte du néon *
                  </label>
                  <MobileOptimizedInput
                    value={config.text}
                    onChange={(value) => updateConfig({ text: value })}
                    placeholder="MON NÉON"
                    maxLength={30}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Mode Multi-lignes</span>
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
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      config.multiline ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        config.multiline ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {config.multiline && (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-400">Lignes de texte :</div>
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
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
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
                        className="w-full py-2 border-2 border-dashed border-gray-600 hover:border-blue-400 text-gray-400 hover:text-blue-400 rounded-lg transition-all"
                      >
                        + Ajouter une ligne
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
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="text-pink-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Couleurs</h3>
              </div>

              <div className="space-y-6">
                {/* Sélecteur principal */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Couleur principale
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={config.color}
                      onChange={(e) => updateConfig({ color: e.target.value })}
                      className="w-16 h-12 rounded-xl border border-gray-600 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.color}
                      onChange={(e) => updateConfig({ color: e.target.value })}
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white font-mono text-sm"
                      placeholder="#ff0080"
                    />
                  </div>
                </div>

                {/* Toggle dégradé */}
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Mode Dégradé</span>
                  <button
                    onClick={() => updateConfig({ useGradient: !config.useGradient })}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      config.useGradient ? 'bg-pink-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        config.useGradient ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Dégradé */}
                {config.useGradient && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Couleur 1</label>
                      <input
                        type="color"
                        value={config.gradientColors[0]}
                        onChange={(e) => updateConfig({ 
                          gradientColors: [e.target.value, config.gradientColors[1]] 
                        })}
                        className="w-full h-12 rounded-xl border border-gray-600 bg-transparent cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Couleur 2</label>
                      <input
                        type="color"
                        value={config.gradientColors[1]}
                        onChange={(e) => updateConfig({ 
                          gradientColors: [config.gradientColors[0], e.target.value] 
                        })}
                        className="w-full h-12 rounded-xl border border-gray-600 bg-transparent cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Menu Couleurs Tendance */}
                <div className="border border-gray-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowTrendingColors(!showTrendingColors)}
                    className="w-full flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-green-400">🌈</div>
                      <span className="text-white font-medium">Couleurs Tendance</span>
                    </div>
                    {showTrendingColors ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {showTrendingColors && (
                    <div className="p-4 border-t border-gray-600">
                      <TrendingColors 
                        onColorSelect={(color) => updateConfig({ color })}
                        currentColor={config.color}
                      />
                    </div>
                  )}
                </div>

                {/* Menu Couleurs Avancées */}
                <div className="border border-gray-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowAdvancedColors(!showAdvancedColors)}
                    className="w-full flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-purple-400">🎨</div>
                      <span className="text-white font-medium">Couleurs Avancées</span>
                    </div>
                    {showAdvancedColors ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {showAdvancedColors && (
                    <div className="p-4 border-t border-gray-600">
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
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Type className="text-yellow-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Style & Police</h3>
              </div>

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
                    {fonts.map((font) => (
                      <option key={font.id} value={font.id}>
                        {font.name} - {font.description}
                      </option>
                    ))}
                  </select>
                  
                  {/* Preview de la police */}
                  <div className="mt-3 p-4 bg-gray-900/50 rounded-xl border border-gray-600">
                    <div className="text-center">
                      <div 
                        className="text-2xl font-bold"
                        style={{
                          color: config.color,
                          textShadow: `0 0 10px ${config.color}`,
                          fontFamily: fonts.find(f => f.id === config.font)?.id === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
                        }}
                      >
                        {config.text || 'APERÇU'}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {fonts.find(f => f.id === config.font)?.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Effets Lumineux */}
                <div className="border border-gray-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowEffects(!showEffects)}
                    className="w-full flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-yellow-400">⚡</div>
                      <span className="text-white font-medium">Effets Lumineux</span>
                    </div>
                    {showEffects ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {showEffects && (
                    <div className="p-4 border-t border-gray-600">
                      <div className="grid grid-cols-2 gap-3">
                        {effects.map((effect) => (
                          <button
                            key={effect.id}
                            onClick={() => updateConfig({ effect: effect.id })}
                            className={`p-3 rounded-xl border transition-all text-left ${
                              config.effect === effect.id
                                ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                                : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                            }`}
                          >
                            <div className="font-semibold text-sm">{effect.name}</div>
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
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="text-cyan-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Partage & Sauvegarde</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowShare(true)}
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-500/50 hover:border-emerald-500/50 rounded-xl transition-all hover:scale-105"
                >
                  <Share2 className="text-green-400" size={32} />
                  <div className="text-center">
                    <div className="font-semibold text-white">Partager</div>
                    <div className="text-sm text-green-300">Réseaux sociaux</div>
                  </div>
                </button>

                <button
                  onClick={() => setShowSaveHeart(true)}
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-pink-500/20 to-red-600/20 hover:from-pink-500/30 hover:to-red-600/30 border border-pink-500/50 hover:border-red-500/50 rounded-xl transition-all hover:scale-105"
                >
                  <Heart className="text-pink-400" size={32} />
                  <div className="text-center">
                    <div className="font-semibold text-white">Coup de Cœur</div>
                    <div className="text-sm text-pink-300">Sauvegarder</div>
                  </div>
                </button>

                <button
                  onClick={() => setShowFavorites(true)}
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 hover:from-yellow-500/30 hover:to-orange-600/30 border border-yellow-500/50 hover:border-orange-500/50 rounded-xl transition-all hover:scale-105"
                >
                  <Star className="text-yellow-400" size={32} />
                  <div className="text-center">
                    <div className="font-semibold text-white">Mes Favoris</div>
                    <div className="text-sm text-yellow-300">Collection</div>
                  </div>
                </button>

                <button
                  onClick={() => setShowSaveDesign(true)}
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/50 hover:border-purple-500/50 rounded-xl transition-all hover:scale-105"
                >
                  <Save className="text-blue-400" size={32} />
                  <div className="text-center">
                    <div className="font-semibold text-white">Sauvegarder</div>
                    <div className="text-sm text-blue-300">Design</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="text-green-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Support & Fixation</h3>
              </div>

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
        );

      case 6:
        return (
          <div className="space-y-6">
            <BackboardStyleSelector
              config={config}
              updateConfig={updateConfig}
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-purple-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Taille du Néon</h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateConfig({ size: '50cm' })}
                    className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                      config.size === '50cm'
                        ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                        : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">50cm</div>
                      <div className="text-sm opacity-80">Compact</div>
                      <div className="text-lg font-bold mt-2">120€</div>
                    </div>
                  </button>

                  <button
                    onClick={() => updateConfig({ size: '100cm' })}
                    className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                      config.size === '100cm'
                        ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                        : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">100cm</div>
                      <div className="text-sm opacity-80">Grande taille</div>
                      <div className="text-lg font-bold mt-2">200€</div>
                    </div>
                  </button>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-400 mt-1">📏</div>
                    <div>
                      <div className="text-blue-400 font-medium text-sm">Dimensions estimées</div>
                      <div className="text-blue-300 text-sm mt-1">
                        • <strong>50cm</strong> : Largeur 50cm × Hauteur 30cm<br/>
                        • <strong>100cm</strong> : Largeur 100cm × Hauteur 60cm
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCustomImage(true)}
              className="w-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/50 hover:border-purple-500/50 text-white p-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <Camera size={24} />
              <div className="text-center">
                <div className="font-semibold">Logo Personnalisé</div>
                <div className="text-sm opacity-80">Envoyez votre image</div>
              </div>
            </button>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-orange-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Finaliser la Commande</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                  <h4 className="text-lg font-semibold text-white mb-4">Récapitulatif</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Texte :</span>
                      <span className="text-white font-medium">"{config.text}"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taille :</span>
                      <span className="text-white font-medium">{config.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Police :</span>
                      <span className="text-white font-medium">{fonts.find(f => f.id === config.font)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Couleur :</span>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-gray-500" style={{ backgroundColor: config.color }}></div>
                        <span className="text-white font-medium">{config.color}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Style de fond :</span>
                      <span className="text-white font-medium">{config.backboardStyle}</span>
                    </div>
                    {selectedPremiumOptions.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Options :</span>
                        <span className="text-white font-medium">{selectedPremiumOptions.length} option(s)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-semibold text-white">Prix Total</span>
                    <span className="text-3xl font-bold text-orange-400">{calculatePrice()}€</span>
                  </div>
                  <div className="text-sm text-orange-300">
                    TTC • Livraison gratuite • Garantie 2 ans
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart size={24} />
                  Ajouter au Panier - {calculatePrice()}€
                </button>
              </div>
            </div>

            <CustomerReviews />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white rounded-xl transition-all disabled:cursor-not-allowed"
              >
                <ArrowLeft size={20} />
                Précédent
              </button>

              <div className="text-center">
                <div className="text-white font-semibold">Étape {currentStep}/8</div>
                <div className="text-gray-400 text-sm">{steps[currentStep - 1]}</div>
              </div>

              <button
                onClick={nextStep}
                disabled={currentStep === 8}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:bg-gray-800 disabled:opacity-50 text-white rounded-xl transition-all disabled:cursor-not-allowed"
              >
                Suivant
                <ArrowRight size={20} />
              </button>
            </div>

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
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40"
        >
          <div className="relative">
            <ShoppingCart size={24} />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {getTotalItems()}
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default NeonCustomizer;