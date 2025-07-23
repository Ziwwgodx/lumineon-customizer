import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, Save, Palette, Type, Zap, Settings, Eye, Sparkles, CreditCard, Star, Wand2, Image, Cube } from 'lucide-react';
import { NeonConfig, CartItem } from '../types';
import NeonPreview3D from './NeonPreview3D';
import ColorPicker from './ColorPicker';
import AdvancedConfigurator from './AdvancedConfigurator';
import PremiumOptions from './PremiumOptions';
import TemplateGallery from './TemplateGallery';
import CustomerReviews from './CustomerReviews';
import TrendingColors from './TrendingColors';
import MobileOptimizedInput from './MobileOptimizedInput';
import Cart from './Cart';
import OnePageCheckout from './OnePageCheckout';
import SaveDesignPopup from './SaveDesignPopup';
import SaveHeartPopup from './SaveHeartPopup';
import SharePopupGreen from './SharePopupGreen';
import FavoritesPopup from './FavoritesPopup';
import ARPopup from './ARPopup';
import CustomImageUpload from './CustomImageUpload';
import MobileWizard, { MobilePreview } from './MobileWizard';
import { useCart } from '../hooks/useCart';

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
    acrylicSupport: 'transparent',
    mountingSystem: 'wall'
  });

  const [selectedPremiumOptions, setSelectedPremiumOptions] = useState<string[]>([]);
  const [price, setPrice] = useState(120);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showSaveHeartPopup, setShowSaveHeartPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [showARPopup, setShowARPopup] = useState(false);
  const [showCustomImageUpload, setShowCustomImageUpload] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [wordPositions, setWordPositions] = useState<Array<{ x: number; y: number }>>([]);

  const {
    items: cartItems,
    isOpen: isCartOpen,
    setIsOpen: setIsCartOpen,
    addItem: addToCart,
    removeItem: removeFromCart,
    updateQuantity: updateCartQuantity,
    getTotalPrice: getCartTotal,
    getTotalItems: getCartItemCount,
    clearCart
  } = useCart();

  const isMobile = window.innerWidth < 768;

  // Calculate price based on config and premium options
  useEffect(() => {
    const basePrice = config.size === '50cm' ? 120 : 200;
    const premiumPrices = {
      waterproof: 25,
      remote: 35,
      timer: 20,
      installation: 80,
      express: 15
    };
    
    const premiumTotal = selectedPremiumOptions.reduce((total, optionId) => {
      return total + (premiumPrices[optionId as keyof typeof premiumPrices] || 0);
    }, 0);
    
    setPrice(basePrice + premiumTotal);
  }, [config.size, selectedPremiumOptions]);

  const updateConfig = (updates: Partial<NeonConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleTemplateSelect = (templateConfig: NeonConfig) => {
    setConfig(templateConfig);
    setCurrentStep(2);
  };

  const togglePremiumOption = (optionId: string) => {
    setSelectedPremiumOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleAddToCart = () => {
    addToCart(config, price);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = (orderData: any) => {
    console.log('Order completed:', orderData);
    clearCart();
    setShowCheckout(false);
    alert('Commande confirmée ! Vous recevrez un email de confirmation.');
  };

  const handleCustomImageSubmit = async (formData: any) => {
    console.log('Custom image request:', formData);
    alert('Demande envoyée ! Notre équipe vous recontactera sous 24h.');
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Type className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-white">1. Votre Texte</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Texte de votre néon *
                  </label>
                  <MobileOptimizedInput
                    value={config.text}
                    onChange={(value) => updateConfig({ text: value })}
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
                      const isMultiline = e.target.checked;
                      if (isMultiline) {
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
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newLines = [...config.lines, ''];
                        updateConfig({ 
                          lines: newLines,
                          text: newLines.join('\n')
                        });
                      }}
                      className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                    >
                      + Ajouter une ligne
                    </button>
                  </div>
                )}
              </div>
            </div>

            <TemplateGallery onSelectTemplate={handleTemplateSelect} />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <ColorPicker
              color={config.color}
              gradientColors={config.gradientColors}
              useGradient={config.useGradient}
              onChange={(color) => updateConfig({ color })}
              onGradientChange={(colors) => updateConfig({ gradientColors: colors })}
              onGradientToggle={(enabled) => updateConfig({ useGradient: enabled })}
            />
            <TrendingColors
              onColorSelect={(color) => updateConfig({ color })}
              currentColor={config.color}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <AdvancedConfigurator
              config={config}
              updateConfig={updateConfig}
              onResetPositions={resetWordPositions}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="text-cyan-400" size={24} />
                <h3 className="text-xl font-semibold text-white">4. Options Avancées</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Effet lumineux
                  </label>
                  <select
                    value={config.effect}
                    onChange={(e) => updateConfig({ effect: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="static">Statique</option>
                    <option value="pulse">Pulsation</option>
                    <option value="blink">Clignotant</option>
                    <option value="gradient">Dégradé animé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Taille
                  </label>
                  <select
                    value={config.size}
                    onChange={(e) => updateConfig({ size: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="50cm">50cm (120€)</option>
                    <option value="100cm">100cm (200€)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Cube className="text-green-400" size={24} />
                <h3 className="text-xl font-semibold text-white">5. Support & Fixation</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Support acrylique
                  </label>
                  <select
                    value={config.acrylicSupport}
                    onChange={(e) => updateConfig({ acrylicSupport: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="transparent">Transparent</option>
                    <option value="black">Noir</option>
                    <option value="white">Blanc</option>
                    <option value="none">Sans support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Système de fixation
                  </label>
                  <select
                    value={config.mountingSystem}
                    onChange={(e) => updateConfig({ mountingSystem: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="wall">Fixation murale</option>
                    <option value="hanging">Suspension</option>
                    <option value="standing">Sur pied</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <PremiumOptions
              selectedOptions={selectedPremiumOptions}
              onToggleOption={togglePremiumOption}
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-purple-400" size={24} />
                <h3 className="text-xl font-semibold text-white">7. Dimensions & Finitions</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Taille finale
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => updateConfig({ size: '50cm' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        config.size === '50cm'
                          ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                          : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                      }`}
                    >
                      <div className="font-semibold">50cm</div>
                      <div className="text-sm opacity-80">120€</div>
                    </button>
                    <button
                      onClick={() => updateConfig({ size: '100cm' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        config.size === '100cm'
                          ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                          : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                      }`}
                    >
                      <div className="font-semibold">100cm</div>
                      <div className="text-sm opacity-80">200€</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Effet d'éclairage
                  </label>
                  <select
                    value={config.lightingEffect}
                    onChange={(e) => updateConfig({ lightingEffect: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="standard">Standard</option>
                    <option value="diffused">Diffusé</option>
                    <option value="focused">Focalisé</option>
                    <option value="ambient">Ambiant</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-orange-400" size={24} />
                <h3 className="text-xl font-semibold text-white">8. Finaliser la Commande</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">Résumé de votre néon</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Texte:</span>
                      <span className="text-white font-medium">"{config.text}"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Taille:</span>
                      <span className="text-white font-medium">{config.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Couleur:</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-500"
                          style={{ backgroundColor: config.color }}
                        />
                        <span className="text-white font-medium">{config.useGradient ? 'Dégradé' : 'Unie'}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Options premium:</span>
                      <span className="text-white font-medium">{selectedPremiumOptions.length} sélectionnée(s)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-xl p-4 border border-orange-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-white">Prix total:</span>
                    <span className="text-2xl font-bold text-orange-400">{price}€</span>
                  </div>
                  <p className="text-sm text-orange-300">TTC, livraison incluse</p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart size={24} />
                  Ajouter au Panier - {price}€
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl"></div>

      {/* Mobile Wizard */}
      <MobileWizard
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        config={config}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                <Zap className="text-white" size={32} />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="text-white" size={12} />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            LumiNéon Customizer
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            ✨ Créez votre néon personnalisé en temps réel
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setShowSaveHeartPopup(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-red-600/20 hover:from-pink-500/30 hover:to-red-600/30 border border-pink-500/50 hover:border-red-500/50 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Heart className="text-pink-400" size={20} />
              Coup de Cœur
            </button>

            <button
              onClick={() => setShowSharePopup(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-500/50 hover:border-emerald-500/50 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Share2 className="text-green-400" size={20} />
              Partager
            </button>

            <button
              onClick={() => setShowFavoritesPopup(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 hover:from-yellow-500/30 hover:to-orange-600/30 border border-yellow-500/50 hover:border-orange-500/50 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Star className="text-yellow-400" size={20} />
              Favoris (0)
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/50 hover:border-purple-500/50 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl relative"
            >
              <ShoppingCart className="text-blue-400" size={20} />
              Panier
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShowCustomImageUpload(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 hover:from-purple-500/30 hover:to-indigo-600/30 border border-purple-500/50 hover:border-indigo-500/50 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 text-sm shadow-lg hover:shadow-xl"
            >
              <Image className="text-purple-400" size={16} />
              Logo Personnalisé
            </button>

            <button
              onClick={() => window.open('https://lumineon.fr/aide', '_blank')}
              className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 hover:border-gray-500 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 text-sm"
            >
              <Wand2 size={16} />
              Aide
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Configuration</h2>
                <div className="text-sm text-gray-400">
                  Étape {currentStep} sur 8
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Progression</span>
                  <span>{Math.round((currentStep / 8) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-pink-500 via-yellow-500 via-cyan-500 via-green-500 via-indigo-500 via-purple-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / 8) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Preview - Only on mobile between Configuration and Step content */}
            {isMobile && (
              <MobilePreview config={config} />
            )}

            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all hover:scale-105"
              >
                Précédent
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(8, currentStep + 1))}
                disabled={currentStep === 8}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all hover:scale-105"
              >
                Suivant
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <NeonPreview3D
              config={config}
              price={price}
              onUpdateConfig={updateConfig}
              onShowAR={() => setShowARPopup(true)}
              onUpdateWordPosition={updateWordPosition}
              wordPositions={wordPositions}
            />

            {/* Price & Add to Cart */}
            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">{price}€</div>
                <p className="text-gray-400">TTC, livraison gratuite</p>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart size={24} />
                Ajouter au Panier
              </button>
              
              <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
                <div>
                  <div className="text-green-400 font-semibold">✓ Garantie</div>
                  <div className="text-gray-400">2 ans</div>
                </div>
                <div>
                  <div className="text-blue-400 font-semibold">✓ Livraison</div>
                  <div className="text-gray-400">7-12j</div>
                </div>
                <div>
                  <div className="text-purple-400 font-semibold">✓ Support</div>
                  <div className="text-gray-400">24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-16">
          <CustomerReviews />
        </div>
      </div>

      {/* Modals */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getCartTotal()}
        onCheckout={handleCheckout}
      />

      <OnePageCheckout
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={cartItems}
        totalPrice={getCartTotal()}
        onOrderComplete={handleOrderComplete}
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

      <SharePopupGreen
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        config={config}
      />

      <FavoritesPopup
        isOpen={showFavoritesPopup}
        onClose={() => setShowFavoritesPopup(false)}
        config={config}
      />

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
    </div>
  );
};

export default NeonCustomizer;