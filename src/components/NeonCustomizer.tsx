import React, { useState, useEffect } from 'react';
import { ShoppingCart, Type, Palette, Sparkles, Maximize, Check } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../hooks/useCart';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useDesignHistory } from '../hooks/useDesignHistory';
import NeonPreview3D from './NeonPreview3D';
import ColorPicker from './ColorPicker';
import TrendingColors from './TrendingColors';
import TemplateGallery from './TemplateGallery';
import CustomerReviews from './CustomerReviews';
import PremiumOptions from './PremiumOptions';
import MobileWizard from './MobileWizard';
import Tooltip from './Tooltip';

interface NeonConfig {
  text: string;
  color: string;
  font: string;
  size: string;
  effect: string;
  background: string;
  halo: boolean;
  blink: boolean;
  premium: boolean;
}

const NeonCustomizer: React.FC = () => {
  const { theme } = useTheme();
  const { addToCart, cartItems } = useCart();
  const { saveDesign, loadDesign, designHistory } = useDesignHistory();
  
  const [config, setConfig] = useState<NeonConfig>({
    text: 'NEON SIGN',
    color: '#ff0080',
    font: 'Orbitron',
    size: 'medium',
    effect: 'glow',
    background: 'transparent',
    halo: false,
    blink: false,
    premium: false
  });

  const [currentWizardStep, setCurrentWizardStep] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

  // Scroll detection for sticky wizard
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+z': () => {
      if (designHistory.length > 0) {
        const lastDesign = designHistory[designHistory.length - 1];
        setConfig(lastDesign);
      }
    },
    'ctrl+s': () => saveDesign(config),
    'ctrl+enter': handleAddToCart
  });

  const fonts = [
    { name: 'Orbitron', preview: 'Aa' },
    { name: 'Righteous', preview: 'Aa' },
    { name: 'Bungee', preview: 'Aa' },
    { name: 'Monoton', preview: 'Aa' },
    { name: 'Creepster', preview: 'Aa' },
    { name: 'Nosifer', preview: 'Aa' }
  ];

  const sizes = [
    { id: 'small', name: 'Petit', dimensions: '30x15cm', price: 89 },
    { id: 'medium', name: 'Moyen', dimensions: '50x25cm', price: 149 },
    { id: 'large', name: 'Grand', dimensions: '80x40cm', price: 249 },
    { id: 'xl', name: 'XL', dimensions: '120x60cm', price: 399 }
  ];

  const effects = [
    { id: 'glow', name: 'Lueur classique', icon: '✨' },
    { id: 'pulse', name: 'Pulsation', icon: '💓' },
    { id: 'rainbow', name: 'Arc-en-ciel', icon: '🌈' },
    { id: 'lightning', name: 'Éclair', icon: '⚡' }
  ];

  const backgrounds = [
    { id: 'transparent', name: 'Transparent', preview: 'bg-transparent border-2 border-dashed border-gray-300' },
    { id: 'black', name: 'Noir', preview: 'bg-black' },
    { id: 'white', name: 'Blanc', preview: 'bg-white border border-gray-200' },
    { id: 'wood', name: 'Bois', preview: 'bg-gradient-to-br from-amber-800 to-amber-900' },
    { id: 'brick', name: 'Brique', preview: 'bg-gradient-to-br from-red-800 to-red-900' }
  ];

  const scrollToStep = (step: number) => {
    const element = document.getElementById(`step-${step}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  async function handleAddToCart() {
    setAddToCartLoading(true);
    
    try {
      const selectedSize = sizes.find(s => s.id === config.size);
      const basePrice = selectedSize?.price || 149;
      const premiumPrice = config.premium ? 50 : 0;
      const totalPrice = basePrice + premiumPrice;

      await addToCart({
        id: Date.now().toString(),
        name: `Néon "${config.text}"`,
        price: totalPrice,
        config: config,
        image: '/api/placeholder/200/100'
      });

      setAddToCartSuccess(true);
      setTimeout(() => {
        setAddToCartSuccess(false);
        setAddToCartLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Erreur ajout panier:', error);
      setAddToCartLoading(false);
    }
  }

  const isConfigComplete = () => {
    return config.text && 
           config.text.trim().length > 0 && 
           config.color && 
           config.font && 
           config.size;
  };

  const getCurrentPrice = () => {
    const selectedSize = sizes.find(s => s.id === config.size);
    const basePrice = selectedSize?.price || 149;
    const premiumPrice = config.premium ? 50 : 0;
    return basePrice + premiumPrice;
  };

  return (
    <div className={`min-h-screen transition-colors ${
      theme.mode === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Mobile Wizard */}
      <div className="sm:hidden">
        <MobileWizard
          currentStep={currentWizardStep}
          totalSteps={5}
          onStepClick={(step) => {
            setCurrentWizardStep(step);
            scrollToStep(step);
          }}
          isScrolled={isScrolled}
        />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        theme.mode === 'dark' 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-pink-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  NeonCraft
                </h1>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                ✨ Exprimez votre lumière intérieure ✨
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Configuration */}
          <div className="space-y-8">
            
            {/* Step 1: Text Input */}
            <div id="step-1" className={`rounded-2xl p-6 border transition-colors ${
              theme.mode === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <Type className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-semibold">Votre Texte</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    theme.mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Texte du néon
                  </label>
                  <input
                    type="text"
                    value={config.text}
                    onChange={(e) => setConfig({...config, text: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 outline-none ${
                      theme.mode === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Entrez votre texte..."
                    maxLength={20}
                  />
                  <p className={`text-xs mt-1 transition-colors ${
                    theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {config.text.length}/20 caractères
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Colors */}
            <div id="step-2" className={`rounded-2xl p-6 border transition-colors ${
              theme.mode === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <Palette className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-semibold">Couleurs</h3>
              </div>
              
              <div className="space-y-6">
                <ColorPicker
                  color={config.color}
                  onChange={(color) => setConfig({...config, color})}
                />
                <TrendingColors
                  onColorSelect={(color) => setConfig({...config, color})}
                  selectedColor={config.color}
                />
              </div>
            </div>

            {/* Step 3: Font & Style */}
            <div id="step-3" className={`rounded-2xl p-6 border transition-colors ${
              theme.mode === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <Type className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-semibold">Police & Style</h3>
              </div>
              
              <div className="space-y-6">
                {/* Font Selection */}
                <div>
                  <label className={`block text-sm font-medium mb-3 transition-colors ${
                    theme.mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Police
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {fonts.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => setConfig({...config, font: font.name})}
                        className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          config.font === font.name
                            ? 'border-pink-500 bg-pink-500/10'
                            : theme.mode === 'dark'
                            ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                            : 'border-gray-300 hover:border-gray-400 bg-white'
                        }`}
                      >
                        <div className={`text-lg font-bold mb-1 transition-colors ${
                          config.font === font.name ? 'text-pink-500' : ''
                        }`} style={{ fontFamily: font.name }}>
                          {font.preview}
                        </div>
                        <div className={`text-xs transition-colors ${
                          theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {font.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Effects */}
                <div>
                  <label className={`block text-sm font-medium mb-3 transition-colors ${
                    theme.mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Effets
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {effects.map((effect) => (
                      <Tooltip key={effect.id} content={`Effet ${effect.name.toLowerCase()}`}>
                        <button
                          onClick={() => setConfig({...config, effect: effect.id})}
                          className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                            config.effect === effect.id
                              ? 'border-pink-500 bg-pink-500/10'
                              : theme.mode === 'dark'
                              ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                              : 'border-gray-300 hover:border-gray-400 bg-white'
                          }`}
                        >
                          <div className="text-2xl mb-1">{effect.icon}</div>
                          <div className={`text-sm font-medium transition-colors ${
                            config.effect === effect.id ? 'text-pink-500' : ''
                          }`}>
                            {effect.name}
                          </div>
                        </button>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                {/* Background */}
                <div>
                  <label className={`block text-sm font-medium mb-3 transition-colors ${
                    theme.mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Arrière-plan
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {backgrounds.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setConfig({...config, background: bg.id})}
                        className={`aspect-square rounded-xl border-2 transition-all hover:scale-105 ${
                          config.background === bg.id
                            ? 'border-pink-500 ring-2 ring-pink-500/20'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className={`w-full h-full rounded-lg ${bg.preview}`}></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="flex flex-wrap gap-4">
                  <Tooltip content="Ajoute un halo lumineux autour du texte">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.halo}
                        onChange={(e) => setConfig({...config, halo: e.target.checked})}
                        className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <span className={`text-sm transition-colors ${
                        theme.mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Halo
                      </span>
                    </label>
                  </Tooltip>
                  
                  <Tooltip content="Fait clignoter le néon de manière rythmée">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.blink}
                        onChange={(e) => setConfig({...config, blink: e.target.checked})}
                        className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <span className={`text-sm transition-colors ${
                        theme.mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Clignotant
                      </span>
                    </label>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Step 4: Size */}
            <div id="step-4" className={`rounded-2xl p-6 border transition-colors ${
              theme.mode === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <Maximize className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-semibold">Taille</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setConfig({...config, size: size.id})}
                    className={`p-4 rounded-xl border-2 text-left transition-all hover:scale-105 ${
                      config.size === size.id
                        ? 'border-pink-500 bg-pink-500/10'
                        : theme.mode === 'dark'
                        ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                    }`}
                  >
                    <div className={`font-semibold mb-1 transition-colors ${
                      config.size === size.id ? 'text-pink-500' : ''
                    }`}>
                      {size.name}
                    </div>
                    <div className={`text-sm mb-2 transition-colors ${
                      theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {size.dimensions}
                    </div>
                    <div className="text-lg font-bold text-green-500">
                      {size.price}€
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Premium Options */}
            <div id="step-5" className={`rounded-2xl p-6 border transition-colors ${
              theme.mode === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  5
                </div>
                <Sparkles className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-semibold">Options Premium</h3>
              </div>
              
              <PremiumOptions
                selected={config.premium}
                onToggle={(premium) => setConfig({...config, premium})}
              />
            </div>

            {/* Templates */}
            <TemplateGallery
              onTemplateSelect={(template) => setConfig({...config, ...template})}
            />

            {/* Reviews */}
            <CustomerReviews />
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className={`rounded-2xl p-6 border transition-colors ${
              theme.mode === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-6 text-center">
                Aperçu en temps réel
              </h3>
              
              <NeonPreview3D config={config} />
              
              <div className="mt-6 p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl border border-pink-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Prix total</span>
                  <span className="text-2xl font-bold text-green-500">
                    {getCurrentPrice()}€
                  </span>
                </div>
                <div className={`text-sm transition-colors ${
                  theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Livraison gratuite • Garantie 2 ans
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer Cart */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className={`p-4 border-t backdrop-blur-md transition-colors ${
          theme.mode === 'dark' 
            ? 'bg-gray-900/90 border-gray-700' 
            : 'bg-white/90 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            {/* Mini Preview */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-8 rounded-lg border-2 flex items-center justify-center text-xs font-bold relative overflow-hidden"
                style={{ 
                  borderColor: config.color,
                  color: config.color,
                  textShadow: `0 0 10px ${config.color}`,
                  fontFamily: config.font
                }}
              >
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ 
                    background: `radial-gradient(circle, ${config.color}40 0%, transparent 70%)`
                  }}
                />
                {config.text.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Prêt</span>
                </div>
                <div className="text-lg font-bold text-green-500">
                  {getCurrentPrice()}€
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!isConfigComplete() || addToCartLoading}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                isConfigComplete() && !addToCartLoading
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 active:scale-95'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {addToCartLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Ajout...</span>
                </div>
              ) : addToCartSuccess ? (
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Ajouté !</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Ajouter</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Loading */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`rounded-2xl p-8 border text-center transition-all ${
            theme.mode === 'dark' 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-300'
          }`}>
            <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className={`font-semibold transition-colors ${
              theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Redirection vers le paiement sécurisé...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeonCustomizer;