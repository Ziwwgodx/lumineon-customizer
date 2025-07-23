import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, Save, Zap, Eye, Sparkles, Star, Package, Settings, Palette, Type, Upload, User, Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { NeonConfig } from '../types';
import NeonPreview3D from './NeonPreview3D';
import ColorPicker from './ColorPicker';
import AdvancedConfigurator from './AdvancedConfigurator';
import PremiumOptions from './PremiumOptions';
import CustomerReviews from './CustomerReviews';
import TrendingColors from './TrendingColors';
import Cart from './Cart';
import OnePageCheckout from './OnePageCheckout';
import SharePopup from './SharePopup';
import SaveDesignPopup from './SaveDesignPopup';
import ARPopup from './ARPopup';
import MobileOptimizedInput from './MobileOptimizedInput';
import MobileWizard from './MobileWizard';
import { useCart } from '../hooks/useCart';

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
    lightingEffect: 'standard',
    acrylicSupport: 'transparent',
    mountingSystem: 'wall'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPremiumOptions, setSelectedPremiumOptions] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showARPopup, setShowARPopup] = useState(false);
  const [showMiniPreview, setShowMiniPreview] = useState(false);
  const [wordPositions, setWordPositions] = useState<Array<{ x: number; y: number }>>([]);

  const { items, addItem, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const updateConfig = (updates: Partial<NeonConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    
    // Afficher le mini-aperçu sur mobile quand on change d'étape
    if (window.innerWidth < 1024) {
      setShowMiniPreview(true);
      setTimeout(() => setShowMiniPreview(false), 3000);
    }
  };

  const updateWordPosition = (wordIndex: number, x: number, y: number) => {
    setWordPositions(prev => {
      const newPositions = [...prev];
      newPositions[wordIndex] = { x, y };
      return newPositions;
    });
  };

  const calculatePrice = () => {
    let basePrice = config.size === '50cm' ? 120 : 200;
    const premiumTotal = selectedPremiumOptions.reduce((total, optionId) => {
      const prices: { [key: string]: number } = {
        waterproof: 25,
        remote: 35,
        timer: 20,
        installation: 80,
        express: 15
      };
      return total + (prices[optionId] || 0);
    }, 0);
    return basePrice + premiumTotal;
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
    setShowCheckout(false);
    alert('Commande enregistrée avec succès !');
  };

  const togglePremiumOption = (optionId: string) => {
    setSelectedPremiumOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 lg:space-y-6">
            {/* Votre Texte */}
            <div className="relative z-20 bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <Type className="text-blue-400" size={20} />
                <h3 className="text-lg lg:text-xl font-semibold text-white">1. Votre Texte</h3>
              </div>
              
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Texte principal
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
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      + Ajouter une ligne
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
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

      case 3:
        return (
          <AdvancedConfigurator
            config={config}
            updateConfig={updateConfig}
          />
        );

      case 4:
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <Zap className="text-orange-400" size={20} />
              <h3 className="text-lg lg:text-xl font-semibold text-white">4. Effets d'Éclairage</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              {[
                { id: 'static', name: 'Statique', description: 'Éclairage constant' },
                { id: 'pulse', name: 'Pulsation', description: 'Effet de respiration' },
                { id: 'blink', name: 'Clignotant', description: 'Clignotement rythmé' },
                { id: 'gradient', name: 'Dégradé', description: 'Transition colorée' }
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
                  <div className="font-semibold text-sm lg:text-base">{effect.name}</div>
                  <div className="text-xs lg:text-sm text-gray-400">{effect.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <Settings className="text-cyan-400" size={20} />
              <h3 className="text-lg lg:text-xl font-semibold text-white">5. Support Acrylique</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              {[
                { id: 'transparent', name: 'Transparent', description: 'Support invisible' },
                { id: 'frosted', name: 'Dépoli', description: 'Effet diffusé' },
                { id: 'colored', name: 'Coloré', description: 'Assorti au néon' },
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
                  <div className="font-semibold text-sm lg:text-base">{support.name}</div>
                  <div className="text-xs lg:text-sm text-gray-400">{support.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <Settings className="text-indigo-400" size={20} />
              <h3 className="text-lg lg:text-xl font-semibold text-white">6. Système de Fixation</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              {[
                { id: 'wall', name: 'Mural', description: 'Fixation au mur' },
                { id: 'ceiling', name: 'Plafond', description: 'Suspension' },
                { id: 'stand', name: 'Sur pied', description: 'Support autonome' },
                { id: 'window', name: 'Vitrine', description: 'Ventouses incluses' }
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
                  <div className="font-semibold text-sm lg:text-base">{mounting.name}</div>
                  <div className="text-xs lg:text-sm text-gray-400">{mounting.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
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
                  <div className="font-bold text-lg lg:text-xl">{size.name}</div>
                  <div className="text-sm lg:text-base text-gray-400 mb-2">{size.description}</div>
                  <div className="text-xs lg:text-sm text-gray-500">{size.dimensions}</div>
                  <div className="font-semibold text-base lg:text-lg mt-2">{size.price}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4 lg:space-y-6">
            <PremiumOptions
              selectedOptions={selectedPremiumOptions}
              onToggleOption={togglePremiumOption}
            />
            <CustomerReviews />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Mobile Wizard Menu */}
      <MobileWizard
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      {/* Mini Preview Mobile */}
      {showMiniPreview && (
        <div className="lg:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl p-4 shadow-2xl shadow-purple-500/20 animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-purple-400">Aperçu 2D</div>
            <button
              onClick={() => setShowMiniPreview(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          <div className="text-center">
            <div
              className="text-lg font-bold mb-1"
              style={{
                color: config.color,
                textShadow: `0 0 8px ${config.color}`,
                fontFamily: config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
              }}
            >
              {config.multiline ? config.lines.join(' ') : config.text}
            </div>
            <div className="text-xs text-gray-400">
              {config.size} • {config.color}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            LumiNéon
          </h1>
          <p className="text-xl text-gray-300">Créez votre néon LED personnalisé</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Navigation Steps */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Configuration</h3>
                <span className="text-sm text-gray-400">
                  Étape {currentStep} sur 8
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                {Array.from({ length: 8 }, (_, i) => i + 1).map((step) => (
                  <div key={step} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(step)}
                      className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 text-xs lg:text-sm font-bold ${
                        step === currentStep
                          ? 'bg-purple-500 border-purple-500 text-white'
                          : step < currentStep
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {step < currentStep ? '✓' : step}
                    </button>
                    {step < 8 && (
                      <div
                        className={`w-4 lg:w-8 h-0.5 mx-1 ${
                          step < currentStep ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 8) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                >
                  Précédent
                </button>
              )}
              {currentStep < 8 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105"
                >
                  Suivant
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Ajouter au Panier - {calculatePrice()}€
                </button>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div>
            <NeonPreview3D
              config={config}
              price={calculatePrice()}
              onUpdateConfig={updateConfig}
              onShowAR={() => setShowARPopup(true)}
              onUpdateWordPosition={updateWordPosition}
              wordPositions={wordPositions}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Panier ({getTotalItems()})
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowSavePopup(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <Save size={20} />
            Sauvegarder
          </button>

          <button
            onClick={() => setShowSharePopup(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <Share2 size={20} />
            Partager
          </button>
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

      <ARPopup
        isOpen={showARPopup}
        onClose={() => setShowARPopup(false)}
        config={config}
      />
    </div>
  );
};

export default NeonCustomizer;