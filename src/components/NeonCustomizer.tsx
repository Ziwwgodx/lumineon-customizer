import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, Save, Eye, Palette, Type, Zap, Settings, Wrench, Package, Sparkles, Star, Upload, Image } from 'lucide-react';
import { NeonConfig, CartItem } from '../types';
import NeonPreview3D from './NeonPreview3D';
import ColorPicker from './ColorPicker';
import AdvancedConfigurator from './AdvancedConfigurator';
import PremiumOptions from './PremiumOptions';
import CustomerReviews from './CustomerReviews';
import TemplateGallery from './TemplateGallery';
import TrendingColors from './TrendingColors';
import Cart from './Cart';
import OnePageCheckout from './OnePageCheckout';
import SharePopup from './SharePopup';
import SaveDesignPopup from './SaveDesignPopup';
import FavoritesPopup from './FavoritesPopup';
import ARPopup from './ARPopup';
import CustomImageUpload from './CustomImageUpload';
import ProgressBar from './ProgressBar';
import MobileWizard from './MobileWizard';
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

  const [price, setPrice] = useState(120);
  const [premiumOptions, setPremiumOptions] = useState<string[]>([]);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [showARPopup, setShowARPopup] = useState(false);
  const [showCustomUpload, setShowCustomUpload] = useState(false);
  const [wordPositions, setWordPositions] = useState<Array<{ x: number; y: number }>>([]);

  const {
    items: cartItems,
    isOpen: isCartOpen,
    setIsOpen: setIsCartOpen,
    addItem: addToCart,
    removeItem: removeFromCart,
    updateQuantity: updateCartQuantity,
    getTotalPrice: getCartTotal,
    clearCart
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);

  const steps = [
    'Texte',
    'Couleurs', 
    'Style',
    'Éclairage',
    'Support',
    'Fixation',
    'Taille',
    'Finaliser'
  ];

  useEffect(() => {
    calculatePrice();
  }, [config, premiumOptions]);

  const calculatePrice = () => {
    let basePrice = config.size === '50cm' ? 120 : 200;
    
    const premiumPrices = {
      waterproof: 25,
      remote: 35,
      timer: 20,
      installation: 80,
      express: 15
    };

    let premiumTotal = 0;
    premiumOptions.forEach(optionId => {
      if (premiumPrices[optionId as keyof typeof premiumPrices]) {
        premiumTotal += premiumPrices[optionId as keyof typeof premiumPrices];
      }
    });

    setPrice(basePrice + premiumTotal);
  };

  const updateConfig = (updates: Partial<NeonConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleTemplateSelect = (templateConfig: NeonConfig) => {
    setConfig(templateConfig);
    const words = templateConfig.multiline 
      ? templateConfig.lines.flatMap(line => line.split(' ').filter(word => word.trim()))
      : templateConfig.text.split(' ').filter(word => word.trim());
    
    setWordPositions(words.map(() => ({ x: 0, y: 0 })));
  };

  const handleAddToCart = () => {
    addToCart(config, price);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = (orderData: any) => {
    console.log('Commande complétée:', orderData);
    clearCart();
    setShowCheckout(false);
    alert('Commande confirmée ! Vous recevrez un email de confirmation.');
  };

  const handleCustomUpload = (formData: any) => {
    console.log('Demande de logo personnalisé:', formData);
    alert('Votre demande a été envoyée ! Notre équipe vous recontactera sous 24h.');
  };

  const handleUpdateWordPosition = (wordIndex: number, x: number, y: number) => {
    setWordPositions(prev => {
      const newPositions = [...prev];
      newPositions[wordIndex] = { x, y };
      return newPositions;
    });
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Texte
        return (
          <div className="space-y-4 lg:space-y-6">
            {/* Logo Personnalisé - Juste après les étapes sur mobile */}
            <div className="lg:hidden">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <Upload className="text-blue-400" size={20} />
                  <h3 className="text-lg font-semibold text-white">Logo Personnalisé</h3>
                  <div className="ml-auto bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Envoyez-nous votre logo et nous créerons un néon unique sur mesure
                </p>
                <button
                  onClick={() => setShowCustomUpload(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Image size={18} />
                  Envoyer mon Logo
                </button>
              </div>
            </div>

            {/* Bloc Votre Texte avec z-index élevé */}
            <div className="relative z-20 bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <Type className="text-blue-400" size={20} />
                <h3 className="text-lg lg:text-xl font-semibold text-white">1. Votre Texte</h3>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Texte principal *
                  </label>
                  <input
                    type="text"
                    value={config.text}
                    onChange={(e) => updateConfig({ text: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    placeholder="MON NÉON"
                    maxLength={30}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Mode multi-lignes</span>
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
                          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                          placeholder={`Ligne ${index + 1}`}
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
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
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
                      className="w-full py-2 border-2 border-dashed border-gray-600 hover:border-blue-400 text-gray-400 hover:text-blue-400 rounded-lg transition-all"
                    >
                      + Ajouter une ligne
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Templates - Après le texte */}
            <TemplateGallery onSelectTemplate={handleTemplateSelect} />
          </div>
        );

      case 2: // Couleurs
        return (
          <div className="space-y-4 lg:space-y-6">
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

      case 3: // Style
        return (
          <AdvancedConfigurator
            config={config}
            updateConfig={updateConfig}
            onResetPositions={() => setWordPositions([])}
          />
        );

      case 4: // Éclairage
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <Zap className="text-orange-400" size={20} />
              <h3 className="text-lg lg:text-xl font-semibold text-white">4. Effets d'Éclairage</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              {[
                { id: 'static', name: 'Fixe', description: 'Éclairage constant' },
                { id: 'pulse', name: 'Pulsation', description: 'Battement régulier' },
                { id: 'blink', name: 'Clignotant', description: 'Clignotement rapide' },
                { id: 'gradient', name: 'Dégradé', description: 'Transition douce' }
              ].map((effect) => (
                <button
                  key={effect.id}
                  onClick={() => updateConfig({ effect: effect.id })}
                  className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border transition-all hover:scale-[1.02] text-left ${
                    config.effect === effect.id
                      ? 'border-orange-400 bg-orange-400/10 text-orange-400'
                      : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                  }`}
                >
                  <div className="font-semibold text-sm lg:text-base mb-1">{effect.name}</div>
                  <div className="text-xs lg:text-sm text-gray-400">{effect.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5: // Support
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <Settings className="text-cyan-400" size={20} />
              <h3 className="text-lg lg:text-xl font-semibold text-white">5. Support Acrylique</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              {[
                { id: 'transparent', name: 'Transparent', description: 'Support invisible' },
                { id: 'black', name: 'Noir', description: 'Contraste maximal' },
                { id: 'white', name: 'Blanc', description: 'Style épuré' },
                { id: 'none', name: 'Sans support', description: 'Fixation directe' }
              ].map((support) => (
                <button
                  key={support.id}
                  onClick={() => updateConfig({ acrylicSupport: support.id })}
                  className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border transition-all hover:scale-[1.02] text-left ${
                    config.acrylicSupport === support.id
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                      : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                  }`}
                >
                  <div className="font-semibold text-sm lg:text-base mb-1">{support.name}</div>
                  <div className="text-xs lg:text-sm text-gray-400">{support.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6: // Fixation
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <Wrench className="text-indigo-400" size={20} />
              <h3 className="text-lg lg:text-xl font-semibold text-white">6. Système de Fixation</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              {[
                { id: 'wall', name: 'Murale', description: 'Fixation au mur' },
                { id: 'hanging', name: 'Suspendue', description: 'Avec chaînes' },
                { id: 'standing', name: 'Sur pied', description: 'Support inclus' },
                { id: 'adhesive', name: 'Adhésive', description: 'Sans perçage' }
              ].map((mounting) => (
                <button
                  key={mounting.id}
                  onClick={() => updateConfig({ mountingSystem: mounting.id })}
                  className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border transition-all hover:scale-[1.02] text-left ${
                    config.mountingSystem === mounting.id
                      ? 'border-indigo-400 bg-indigo-400/10 text-indigo-400'
                      : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                  }`}
                >
                  <div className="font-semibold text-sm lg:text-base mb-1">{mounting.name}</div>
                  <div className="text-xs lg:text-sm text-gray-400">{mounting.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 7: // Taille
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <Package className="text-green-400" size={20} />
              <h3 className="text-lg lg:text-xl font-semibold text-white">7. Taille du Néon</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
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
                  onClick={() => updateConfig({ size: size.id })}
                  className={`p-4 lg:p-6 rounded-lg lg:rounded-xl border transition-all hover:scale-[1.02] text-left ${
                    config.size === size.id
                      ? 'border-green-400 bg-green-400/10 text-green-400'
                      : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-lg lg:text-xl">{size.name}</div>
                    <div className="font-bold text-lg lg:text-xl">{size.price}</div>
                  </div>
                  <div className="text-sm lg:text-base mb-1">{size.description}</div>
                  <div className="text-xs lg:text-sm text-gray-400">{size.dimensions}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 8: // Finaliser
        return (
          <div className="space-y-4 lg:space-y-6">
            <PremiumOptions
              selectedOptions={premiumOptions}
              onToggleOption={(optionId) => {
                setPremiumOptions(prev =>
                  prev.includes(optionId)
                    ? prev.filter(id => id !== optionId)
                    : [...prev, optionId]
                );
              }}
            />
            <CustomerReviews />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white">
      {/* Mobile Wizard Menu */}
      <MobileWizard 
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            LumiNéon
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Créez votre néon LED personnalisé en quelques clics
          </p>
        </div>

        {/* Progress Bar - Desktop only */}
        <div className="hidden lg:block">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={steps.length}
            steps={steps}
            onStepClick={handleStepClick}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Mobile Layout avec espace pour wizard */}
            <div className="lg:hidden pl-16 space-y-4">
              {/* Progress Steps Mobile - Compact */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-white">Configuration</h3>
                  <span className="text-xs text-gray-400">
                    Étape {currentStep}/{steps.length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  {steps.slice(0, 3).map((step, index) => (
                    <React.Fragment key={index}>
                      <div 
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => handleStepClick(index + 1)}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-all hover:scale-110 ${
                            index + 1 < currentStep
                              ? 'bg-green-500 border-green-500 text-white'
                              : index + 1 === currentStep
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'border-gray-600 text-gray-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className={`text-xs mt-1 text-center ${
                          index + 1 <= currentStep ? 'text-white' : 'text-gray-400'
                        }`}>
                          {step}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className={`flex-1 h-0.5 mx-1 ${
                          index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-600'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="bg-gray-700 rounded-full h-1">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-green-500 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (currentStep / steps.length) * 100)}%` }}
                  />
                </div>
              </div>

              {renderStepContent()}
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block space-y-6">
              {/* Logo Personnalisé - Desktop */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <Upload className="text-blue-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Logo Personnalisé</h3>
                  <div className="ml-auto bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    Premium
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Envoyez-nous votre logo et nous créerons un néon unique sur mesure
                </p>
                <button
                  onClick={() => setShowCustomUpload(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Image size={24} />
                  Envoyer mon Logo
                </button>
              </div>

              {renderStepContent()}
            </div>
          </div>

          {/* Preview Panel */}
          <div>
            <NeonPreview3D
              config={config}
              price={price}
              onUpdateConfig={updateConfig}
              onShowAR={() => setShowARPopup(true)}
              onUpdateWordPosition={handleUpdateWordPosition}
              wordPositions={wordPositions}
            />

            {/* Action Buttons */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart size={24} />
                  Ajouter au Panier - {price}€
                </button>
                
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={24} />
                  Panier
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowSavePopup(true)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Sauvegarder
                </button>
                
                <button
                  onClick={() => setShowFavoritesPopup(true)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Heart size={20} />
                  Favoris
                </button>
                
                <button
                  onClick={() => setShowSharePopup(true)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Share2 size={20} />
                  Partager
                </button>
              </div>
            </div>
          </div>
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

      <SharePopup
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        config={config}
      />

      <SaveDesignPopup
        isOpen={showSavePopup}
        onClose={() => setShowSavePopup(false)}
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
        isOpen={showCustomUpload}
        onClose={() => setShowCustomUpload(false)}
        onSubmit={handleCustomUpload}
      />
    </div>
  );
};

export default NeonCustomizer;