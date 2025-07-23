import React, { useState, useEffect } from 'react';
import { Type, Palette, Zap, Settings, ShoppingCart, Eye, Sparkles, CreditCard, Heart, Share2, Save, Star, Upload, Image, Smartphone } from 'lucide-react';
import { NeonConfig, CartItem, GridSettings } from '../types';
import NeonPreview3D from './NeonPreview3D';
import ColorPicker from './ColorPicker';
import AdvancedConfigurator from './AdvancedConfigurator';
import PremiumOptions from './PremiumOptions';
import TemplateGallery from './TemplateGallery';
import CustomerReviews from './CustomerReviews';
import TrendingColors from './TrendingColors';
import ProgressBar from './ProgressBar';
import MobileWizard from './MobileWizard';
import MobileOptimizedInput from './MobileOptimizedInput';
import Cart from './Cart';
import OnePageCheckout from './OnePageCheckout';
import ARPopup from './ARPopup';
import SharePopup from './SharePopup';
import SaveDesignPopup from './SaveDesignPopup';
import FavoritesPopup from './FavoritesPopup';
import CustomImageUpload from './CustomImageUpload';
import { useCart } from '../hooks/useCart';

const NeonCustomizer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<NeonConfig>({
    text: 'NÉON',
    color: '#ff0080',
    gradientColors: ['#ff0080', '#8B5CF6'],
    useGradient: false,
    font: 'tilt-neon',
    size: '50cm',
    effect: 'static',
    multiline: false,
    lines: ['NÉON'],
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
  const [showARPopup, setShowARPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [showCustomImageUpload, setShowCustomImageUpload] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [wordPositions, setWordPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [gridSettings, setGridSettings] = useState<GridSettings>({
    enabled: false,
    size: 20,
    snap: false
  });

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

  const steps = [
    'Texte',
    'Couleurs', 
    'Style',
    'Options',
    'Support',
    'Finition',
    'Taille',
    'Commander'
  ];

  const updateConfig = (updates: Partial<NeonConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateWordPosition = (wordIndex: number, x: number, y: number) => {
    setWordPositions(prev => {
      const newPositions = [...prev];
      newPositions[wordIndex] = { x, y };
      return newPositions;
    });
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

  useEffect(() => {
    const calculatePrice = async () => {
      try {
        const response = await fetch('/api/calculate-price', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ config, premiumOptions: selectedPremiumOptions })
        });
        
        if (response.ok) {
          const data = await response.json();
          setPrice(data.pricing.totalPrice);
        }
      } catch (error) {
        console.error('Price calculation error:', error);
        const basePrice = config.size === '50cm' ? 120 : 200;
        const premiumTotal = selectedPremiumOptions.length * 25;
        setPrice(basePrice + premiumTotal);
      }
    };

    calculatePrice();
  }, [config, selectedPremiumOptions]);

  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5"></div>
      
      {/* Mobile Wizard */}
      {isMobile && (
        <MobileWizard
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          config={config}
        />
      )}

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                LumiNéon Customizer
              </h1>
              <p className="text-gray-400 text-sm">Créez votre néon personnalisé en temps réel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFavoritesPopup(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 hover:from-yellow-500/30 hover:to-orange-600/30 border border-yellow-500/50 hover:border-orange-500/50 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Heart className="text-yellow-400" size={18} />
              <span className="hidden sm:inline font-medium">Favoris</span>
              <span className="bg-yellow-500/30 text-yellow-300 px-2 py-0.5 rounded-full text-xs font-bold">0</span>
            </button>

            <button
              onClick={() => setShowSharePopup(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-500/50 hover:border-emerald-500/50 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Share2 className="text-green-400" size={18} />
              <span className="hidden sm:inline font-medium">Partager</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline font-medium">Panier</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6">
        {!isMobile && (
          <ProgressBar
            currentStep={currentStep}
            totalSteps={steps.length}
            steps={steps}
            onStepClick={setCurrentStep}
          />
        )}

        <div className={`grid gap-8 ${isMobile ? 'grid-cols-1 ml-16' : 'lg:grid-cols-2'}`}>
          {/* Configuration Panel */}
          <div className="space-y-6">
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
                    {isMobile ? (
                      <MobileOptimizedInput
                        value={config.text}
                        onChange={(value) => updateConfig({ text: value })}
                        placeholder="MON NÉON"
                        maxLength={30}
                      />
                    ) : (
                      <input
                        type="text"
                        value={config.text}
                        onChange={(e) => updateConfig({ text: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        placeholder="MON NÉON"
                        maxLength={30}
                      />
                    )}
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
                        className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        + Ajouter une ligne
                      </button>
                    </div>
                  )}
                </div>

                <TemplateGallery onSelectTemplate={handleTemplateSelect} />
              </div>
            )}

            {currentStep === 2 && (
              <>
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
              </>
            )}

            {currentStep === 3 && (
              <AdvancedConfigurator
                config={config}
                updateConfig={updateConfig}
              />
            )}

            {currentStep === 4 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="text-cyan-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">4. Options Avancées</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Effet lumineux
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'static', name: 'Fixe', desc: 'Éclairage constant' },
                        { id: 'pulse', name: 'Pulsation', desc: 'Effet de respiration' },
                        { id: 'blink', name: 'Clignotant', desc: 'Clignotement rythmé' },
                        { id: 'gradient', name: 'Dégradé', desc: 'Transition colorée' }
                      ].map((effect) => (
                        <button
                          key={effect.id}
                          onClick={() => updateConfig({ effect: effect.id })}
                          className={`p-3 rounded-xl border text-left transition-all hover:scale-105 ${
                            config.effect === effect.id
                              ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                              : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                          }`}
                        >
                          <div className="font-semibold">{effect.name}</div>
                          <div className="text-xs text-gray-400">{effect.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Taille du néon
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: '50cm', name: '50cm', desc: 'Compact', price: '120€' },
                        { id: '100cm', name: '100cm', desc: 'Grande taille', price: '200€' }
                      ].map((size) => (
                        <button
                          key={size.id}
                          onClick={() => updateConfig({ size: size.id })}
                          className={`p-4 rounded-xl border text-left transition-all hover:scale-105 ${
                            config.size === size.id
                              ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                              : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                          }`}
                        >
                          <div className="font-semibold">{size.name}</div>
                          <div className="text-xs text-gray-400">{size.desc}</div>
                          <div className="text-sm font-bold mt-1">{size.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <PremiumOptions
                selectedOptions={selectedPremiumOptions}
                onToggleOption={togglePremiumOption}
              />
            )}

            {currentStep === 6 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="text-indigo-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">6. Finitions Premium</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Support acrylique
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'transparent', name: 'Transparent', desc: 'Effet flottant' },
                        { id: 'frosted', name: 'Dépoli', desc: 'Diffusion douce' },
                        { id: 'colored', name: 'Coloré', desc: 'Assorti au néon' },
                        { id: 'none', name: 'Sans support', desc: 'Fixation directe' }
                      ].map((support) => (
                        <button
                          key={support.id}
                          onClick={() => updateConfig({ acrylicSupport: support.id })}
                          className={`p-3 rounded-xl border text-left transition-all hover:scale-105 ${
                            config.acrylicSupport === support.id
                              ? 'border-indigo-400 bg-indigo-400/10 text-indigo-400'
                              : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                          }`}
                        >
                          <div className="font-semibold">{support.name}</div>
                          <div className="text-xs text-gray-400">{support.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Système de fixation
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'wall', name: 'Mural', desc: 'Fixation au mur' },
                        { id: 'hanging', name: 'Suspendu', desc: 'Avec chaînes' },
                        { id: 'standing', name: 'Sur pied', desc: 'Support inclus' },
                        { id: 'magnetic', name: 'Magnétique', desc: 'Surfaces métalliques' }
                      ].map((mounting) => (
                        <button
                          key={mounting.id}
                          onClick={() => updateConfig({ mountingSystem: mounting.id })}
                          className={`p-3 rounded-xl border text-left transition-all hover:scale-105 ${
                            config.mountingSystem === mounting.id
                              ? 'border-indigo-400 bg-indigo-400/10 text-indigo-400'
                              : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                          }`}
                        >
                          <div className="font-semibold">{mounting.name}</div>
                          <div className="text-xs text-gray-400">{mounting.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="text-purple-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">7. Dimensions & Personnalisation</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <h4 className="font-semibold text-purple-400 mb-3">🎨 Logo Personnalisé</h4>
                    <p className="text-sm text-purple-300 mb-4">
                      Vous avez un logo ou un design spécifique ? Notre équipe peut créer un néon sur mesure !
                    </p>
                    <button
                      onClick={() => setShowCustomImageUpload(true)}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 font-medium"
                    >
                      <Upload size={18} />
                      Envoyer mon logo
                    </button>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Dimensions estimées</h4>
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Largeur:</span>
                          <span className="text-white ml-2 font-semibold">
                            {config.size === '50cm' ? '50cm' : '100cm'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Hauteur:</span>
                          <span className="text-white ml-2 font-semibold">
                            {config.size === '50cm' ? '30cm' : '60cm'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Épaisseur:</span>
                          <span className="text-white ml-2 font-semibold">2cm</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Poids:</span>
                          <span className="text-white ml-2 font-semibold">
                            {config.size === '50cm' ? '0.8kg' : '1.5kg'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-orange-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">8. Finaliser la Commande</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/30 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">{price}€</div>
                      <div className="text-orange-400 font-medium">Prix final TTC</div>
                      <div className="text-sm text-gray-400 mt-1">Livraison gratuite incluse</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <ShoppingCart size={20} />
                      Ajouter au Panier
                    </button>

                    <button
                      onClick={() => setShowSavePopup(true)}
                      className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Save size={20} />
                      Sauvegarder
                    </button>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
                      <Star className="text-yellow-400" size={16} />
                      <span>Garantie 2 ans • Livraison 7-10 jours • SAV français</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all hover:scale-105"
              >
                Précédent
              </button>
              
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                disabled={currentStep === steps.length}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all hover:scale-105"
              >
                {currentStep === steps.length ? 'Terminé' : 'Suivant'}
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
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <CustomerReviews />
        </div>
      </main>

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

      <ARPopup
        isOpen={showARPopup}
        onClose={() => setShowARPopup(false)}
        config={config}
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

      <CustomImageUpload
        isOpen={showCustomImageUpload}
        onClose={() => setShowCustomImageUpload(false)}
        onSubmit={handleCustomImageSubmit}
      />
    </div>
  );
};

export default NeonCustomizer;