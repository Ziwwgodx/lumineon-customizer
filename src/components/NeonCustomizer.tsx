import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, ShoppingBag, Sparkles, Moon, Sun, Undo, Redo, Save, Bookmark, Type, Palette, X, Star } from 'lucide-react';
import { NeonConfig } from '../types';
import TemplateGallery from './TemplateGallery';
import AdvancedConfigurator from './AdvancedConfigurator';
import CustomerReviews from './CustomerReviews';
import NeonPreview3D from './NeonPreview3D';
import ColorPicker from './ColorPicker';
import CustomImageUpload from './CustomImageUpload';
import Cart from './Cart';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';
import { useDesignHistory } from '../hooks/useDesignHistory';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

const NeonCustomizer: React.FC = () => {
  const [config, setConfig] = useState<NeonConfig>({
    text: 'MON NÉON',
    color: '#ff4500',
    gradientColors: ['#ff4500', '#ff6b35'],
    useGradient: false,
    font: 'tilt-neon',
    size: '50cm',
    effect: 'static',
    multiline: false,
    lines: ['MON NÉON'],
    shape: 'text',
    haloIntensity: 15,
    glowRadius: 8
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showLoadDesigns, setShowLoadDesigns] = useState(false);
  const [wordPositions, setWordPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [showMiniPreview, setShowMiniPreview] = useState(false);
  
  const cart = useCart();
  const { theme, toggleMode } = useTheme();
  const designHistory = useDesignHistory();

  // Scroll detection for mini preview
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const previewElement = document.getElementById('main-preview');
      
      if (previewElement) {
        const previewRect = previewElement.getBoundingClientRect();
        const isPreviewVisible = previewRect.bottom > 0 && previewRect.top < window.innerHeight;
        setShowMiniPreview(scrollY > 300 && !isPreviewVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: () => {
      const previousConfig = designHistory.undo();
      if (previousConfig) setConfig(previousConfig);
    },
    onRedo: () => {
      const nextConfig = designHistory.redo();
      if (nextConfig) setConfig(nextConfig);
    },
    onSave: () => handleSaveToFavorites(),
    onFullscreen: () => {
      // This will be handled by NeonPreview3D
    }
  });

  const neonColors = [
    { name: 'White', color: '#ffffff' },
    { name: 'Warm White', color: '#fff8dc' },
    { name: 'Turquoise', color: '#40e0d0' },
    { name: 'Ice Blue', color: '#87ceeb' },
    { name: 'Blue', color: '#0066ff' },
    { name: 'Deep Blue', color: '#003366' },
    { name: 'Lemon Yellow', color: '#fff700' },
    { name: 'Golden Yellow', color: '#ffd700' },
    { name: 'Yellow', color: '#ffff00' },
    { name: 'Orange', color: '#ff8c00' },
    { name: 'Tomato', color: '#ff6347' },
    { name: 'Light Pink', color: '#ffb6c1' },
    { name: 'Hot Pink', color: '#ff1493' },
    { name: 'Purple', color: '#8a2be2' },
    { name: 'Light Purple', color: '#dda0dd' },
    { name: 'Red', color: '#ff0000' },
    { name: 'Deep Green', color: '#006400' },
    { name: 'Green', color: '#32cd32' }
  ];

  const calculatePrice = () => {
    let basePrice = config.size === '50cm' ? 120 : 200;
    
    // Augmentation pour texte long (8+ caractères)
    const textLength = config.text.length;
    if (textLength >= 8) {
      const extraChars = textLength - 7;
      const surcharge = extraChars * 3; // 3€ par caractère supplémentaire
      basePrice += surcharge;
    }
    
    return basePrice;
  };

  const updateConfig = (updates: Partial<NeonConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    designHistory.addToHistory(newConfig);
    
    // Reset word positions when text changes
    if (updates.text || updates.multiline || updates.lines) {
      setWordPositions([]);
    }
    
    // Reset positions when size changes to respect new boundaries
    if (updates.size) {
      setWordPositions([]);
    }
  };

  const updateWordPosition = (wordIndex: number, x: number, y: number) => {
    setWordPositions(prev => {
      const newPositions = [...prev];
      newPositions[wordIndex] = { x, y };
      return newPositions;
    });
  };

  const handleAddToCart = () => {
    // Vérifier que tous les mots sont dans la zone de production
    const previewComponent = document.querySelector('.simulation-box');
    if (previewComponent && previewComponent.classList.contains('border-red-400')) {
      alert('⚠️ Veuillez replacer tous les mots dans la zone de production (rectangle blanc) avant de commander.');
      return;
    }
    
    cart.addItem(config, calculatePrice());
  };

  const handleSelectTemplate = (templateConfig: NeonConfig) => {
    setConfig(templateConfig);
    designHistory.addToHistory(templateConfig);
  };

  const handleLoadDesign = (designConfig: NeonConfig) => {
    setConfig(designConfig);
    designHistory.addToHistory(designConfig);
    setShowLoadDesigns(false);
  };

  const handleSaveToFavorites = () => {
    const name = prompt('Nom de votre design:') || `Design ${Date.now()}`;
    designHistory.addToFavorites(config, name);
    alert('Design sauvegardé dans vos favoris!');
  };

  const handleImageUpload = () => {
    setShowImageUpload(true);
  };

  const handleImageUploadSubmit = (formData: any) => {
    console.log('Image upload data:', formData);
    // Simulation d'envoi
    const submitData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Non renseigné',
      message: formData.message || 'Aucun message',
      fileName: formData.imageFile?.name || 'Fichier inconnu',
      fileSize: formData.imageFile?.size || 0,
      timestamp: new Date().toISOString()
    };
    
    console.log('📧 Demande de logo personnalisé:', submitData);
    
    // Feedback utilisateur
    alert(`✅ Demande envoyée avec succès !
    
📧 Récapitulatif:
• Nom: ${submitData.name}
• Email: ${submitData.email}
• Fichier: ${submitData.fileName}

Notre équipe design vous recontactera sous 24h pour valider votre logo et vous proposer un devis personnalisé.

Merci pour votre confiance ! 🎨✨`);
  };

  const shareDesign = () => {
    const designUrl = `${window.location.origin}?design=${btoa(JSON.stringify(config))}`;
    navigator.clipboard.writeText(designUrl);
    alert('Lien de partage copié dans le presse-papiers!');
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    // Ici vous intégreriez votre système de paiement
    setTimeout(() => {
      alert('Redirection vers le paiement sécurisé...');
      setShowCheckout(false);
    }, 2000);
  };

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
      letterSpacing: '0.05em'
    };

    if (config.useGradient && config.gradientColors) {
      return {
        ...baseStyle,
        background: `linear-gradient(135deg, ${config.gradientColors[0]}, ${config.gradientColors[1]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: `0 0 3px ${config.gradientColors[0]}, 0 0 8px ${config.gradientColors[1]}`
      };
    }

    return {
      ...baseStyle,
      color: config.color,
      textShadow: `0 0 2px ${config.color}, 0 0 5px ${config.color}, 0 0 10px ${config.color}`
    };
  };

  return (
    <>
    <div className={`min-h-screen transition-all duration-500 ${
      theme.mode === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-gray-100 via-purple-100 to-gray-100'
    }`}>
      <div className="container mx-auto px-4 py-4 sm:py-8 pb-32 sm:pb-8">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4 relative">
            <div className="flex items-center gap-3">
              <Sparkles className="text-pink-400" size={28} />
              <span className={`text-xl sm:text-2xl font-bold transition-colors ${
                theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>LumiNéon</span>
            </div>
            
            {/* Boutons Header - Plus visibles */}
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-600/50 shadow-xl">
              {/* Theme Toggle */}
              <button
                onClick={toggleMode}
                className={`p-2 sm:p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg ${
                  theme.mode === 'dark' 
                    ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30' 
                    : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 border border-blue-500/30'
                }`}
                title="Changer le thème"
              >
                {theme.mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* History Controls */}
              <div className="flex gap-1 bg-gray-700/50 rounded-xl p-1">
                <button
                  onClick={() => {
                    const prev = designHistory.undo();
                    if (prev) setConfig(prev);
                  }}
                  disabled={!designHistory.canUndo}
                  className={`p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    theme.mode === 'dark' 
                      ? 'hover:bg-blue-500/30 text-blue-400 disabled:text-gray-600' 
                      : 'hover:bg-blue-500/30 text-blue-600 disabled:text-gray-400'
                  }`}
                  title="Annuler (Ctrl+Z)"
                >
                  <Undo size={16} />
                </button>
                
                <button
                  onClick={() => {
                    const next = designHistory.redo();
                    if (next) setConfig(next);
                  }}
                  disabled={!designHistory.canRedo}
                  className={`p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    theme.mode === 'dark' 
                      ? 'hover:bg-green-500/30 text-green-400 disabled:text-gray-600' 
                      : 'hover:bg-green-500/30 text-green-600 disabled:text-gray-400'
                  }`}
                  title="Refaire (Ctrl+Y)"
                >
                  <Redo size={16} />
                </button>
              </div>

              {/* Load Designs */}
              <button
                onClick={() => setShowLoadDesigns(true)}
                className={`p-2 sm:p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg ${
                  theme.mode === 'dark' 
                    ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30' 
                    : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-600 border border-purple-500/30'
                }`}
                title="Charger un design sauvegardé"
              >
                <div className="relative">
                  <Bookmark size={20} />
                  {designHistory.favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {designHistory.favorites.length}
                    </span>
                  )}
                </div>
              </button>

              {/* Save to Favorites */}
              <button
                onClick={handleSaveToFavorites}
                className={`p-2 sm:p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg ${
                  theme.mode === 'dark' 
                    ? 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30' 
                    : 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-600 border border-pink-500/30'
                }`}
                title="Sauvegarder (Ctrl+S)"
              >
                <Heart size={20} />
              </button>

              {/* Cart */}
              <button
                onClick={() => cart.setIsOpen(true)}
                className={`relative p-2 sm:p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg border-2 ${
                  theme.mode === 'dark' 
                    ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/50 hover:border-orange-400' 
                    : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-600 border-orange-500/50 hover:border-orange-500'
                }`}
                title={`Panier (${cart.getTotalItems()} articles)`}
              >
                <ShoppingBag size={20} />
                {cart.getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    {cart.getTotalItems()}
                  </span>
                )}
              </button>
            </div>
            
            {/* Floating Action Buttons - Mobile */}
            <div className="fixed top-4 right-4 z-30 flex flex-col gap-2 sm:hidden">
              <button
                onClick={() => cart.setIsOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white p-3 rounded-full shadow-2xl transition-all hover:scale-110"
              >
                <ShoppingBag size={20} />
                {cart.getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.getTotalItems()}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setShowLoadDesigns(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full shadow-2xl transition-all hover:scale-110"
                title="Mes designs"
              >
                <Bookmark size={18} />
                {designHistory.favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-purple-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {designHistory.favorites.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent animate-glow">
            Créez Votre Néon Personnalisé
          </h1>
          <p className={`text-base sm:text-xl max-w-2xl mx-auto transition-colors px-4 ${
            theme.mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Design unique • Qualité premium • Livraison express • Garantie 2 ans
          </p>
        </header>

        {/* Layout: Preview first on mobile, side by side on desktop */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Preview Panel - First on mobile, right on desktop */}
          <div id="main-preview" className="lg:order-2">
            <NeonPreview3D 
              config={config} 
              price={calculatePrice()} 
              onUpdateConfig={updateConfig}
              onUpdateWordPosition={updateWordPosition}
              wordPositions={wordPositions}
            />
          </div>

          {/* Configuration Panel - Second on mobile, left on desktop */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in lg:order-1">
            
            {/* 1. Texte */}
            <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all ${
              theme.mode === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/50 border-gray-300'
            }`}>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Type className="text-blue-400" size={20} />
                <h3 className={`text-lg sm:text-xl font-semibold transition-colors ${
                  theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>1. Votre Texte</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    theme.mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Tapez votre message (max 30 caractères)
                  </label>
                  <input
                    type="text"
                    value={config.text}
                    onChange={(e) => updateConfig({ text: e.target.value })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border text-base sm:text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      theme.mode === 'dark' 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="MON NÉON"
                    maxLength={30}
                  />
                  <div className={`text-xs sm:text-sm mt-1 flex justify-between transition-colors ${
                    theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <span>{config.text.length}/30 caractères</span>
                    {config.text.length >= 8 && (
                      <span className="text-orange-400 font-medium">
                        +{(config.text.length - 7) * 3}€ (texte long)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Templates Populaires Compacts */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="text-yellow-400" size={16} />
                  <h4 className={`text-sm font-semibold transition-colors ${
                    theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Templates Populaires</h4>
                </div>
                
                <div className="grid grid-cols-6 gap-1.5">
                  {[
                    { name: 'LOVE', color: '#ff0080', config: { text: 'LOVE', color: '#ff0080', font: 'script', size: '50cm', effect: 'pulse', multiline: false, lines: ['LOVE'], gradientColors: ['#ff0080', '#ff69b4'], useGradient: false, shape: 'text', haloIntensity: 15, glowRadius: 8, textScale: 1 } },
                    { name: 'OPEN', color: '#00ff41', config: { text: 'OPEN', color: '#00ff41', font: 'tilt-neon', size: '100cm', effect: 'blink', multiline: false, lines: ['OPEN'], gradientColors: ['#00ff41', '#32cd32'], useGradient: false, shape: 'text', haloIntensity: 12, glowRadius: 6, textScale: 1 } },
                    { name: 'CAFÉ', color: '#ffff00', config: { text: 'CAFÉ', color: '#ffff00', font: 'modern', size: '100cm', effect: 'static', multiline: false, lines: ['CAFÉ'], gradientColors: ['#ffff00', '#ffd700'], useGradient: false, shape: 'text', haloIntensity: 18, glowRadius: 10, textScale: 1 } },
                    { name: 'BAR', color: '#ff4500', config: { text: 'BAR', color: '#ff4500', font: 'tilt-neon', size: '100cm', effect: 'pulse', multiline: false, lines: ['BAR'], gradientColors: ['#ff4500', '#ff6b35'], useGradient: false, shape: 'text', haloIntensity: 14, glowRadius: 7, textScale: 1 } },
                    { name: 'PIZZA', color: '#ff6347', config: { text: 'PIZZA', color: '#ff6347', font: 'audiowide', size: '100cm', effect: 'static', multiline: false, lines: ['PIZZA'], gradientColors: ['#ff6347', '#ff4500'], useGradient: false, shape: 'text', haloIntensity: 16, glowRadius: 8, textScale: 1 } },
                    { name: 'SHOP', color: '#00ffff', config: { text: 'SHOP', color: '#00ffff', font: 'orbitron', size: '100cm', effect: 'pulse', multiline: false, lines: ['SHOP'], gradientColors: ['#00ffff', '#0099ff'], useGradient: false, shape: 'text', haloIntensity: 14, glowRadius: 7, textScale: 1 } },
                    { name: 'MUSIC', color: '#8a2be2', config: { text: 'MUSIC', color: '#8a2be2', font: 'electrolize', size: '50cm', effect: 'pulse', multiline: false, lines: ['MUSIC'], gradientColors: ['#8a2be2', '#dda0dd'], useGradient: false, shape: 'text', haloIntensity: 18, glowRadius: 10, textScale: 1 } },
                    { name: 'BEER', color: '#ffd700', config: { text: 'BEER', color: '#ffd700', font: 'bebas-neue', size: '100cm', effect: 'blink', multiline: false, lines: ['BEER'], gradientColors: ['#ffd700', '#ffff00'], useGradient: false, shape: 'text', haloIntensity: 15, glowRadius: 8, textScale: 1 } },
                    { name: 'HOTEL', color: '#ff1493', config: { text: 'HOTEL', color: '#ff1493', font: 'righteous', size: '100cm', effect: 'static', multiline: false, lines: ['HOTEL'], gradientColors: ['#ff1493', '#ffb6c1'], useGradient: false, shape: 'text', haloIntensity: 16, glowRadius: 9, textScale: 1 } },
                    { name: 'GAME', color: '#32cd32', config: { text: 'GAME', color: '#32cd32', font: 'russo-one', size: '50cm', effect: 'pulse', multiline: false, lines: ['GAME'], gradientColors: ['#32cd32', '#006400'], useGradient: false, shape: 'text', haloIntensity: 17, glowRadius: 9, textScale: 1 } },
                    { name: 'CLUB', color: '#ff0000', config: { text: 'CLUB', color: '#ff0000', font: 'bungee', size: '100cm', effect: 'blink', multiline: false, lines: ['CLUB'], gradientColors: ['#ff0000', '#ff6347'], useGradient: false, shape: 'text', haloIntensity: 20, glowRadius: 12, textScale: 1 } }
                  ].map((template, index) => (
                    <button
                      key={index}
                      onClick={() => updateConfig(template.config)}
                      className={`aspect-square rounded-md border transition-all hover:scale-110 hover:shadow-lg relative overflow-hidden ${
                        theme.mode === 'dark' 
                          ? 'border-gray-600 bg-gray-800/50 hover:border-gray-400' 
                          : 'border-gray-300 bg-gray-100/50 hover:border-gray-500'
                      }`}
                      title={`Template ${template.name}`}
                    >
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <div
                          className="text-xs font-bold transition-all duration-300 hover:scale-110 leading-none"
                          style={{
                            color: template.color,
                            textShadow: `0 0 3px ${template.color}, 0 0 6px ${template.color}`,
                            filter: `drop-shadow(0 0 4px ${template.color})`
                          }}
                        >
                          {template.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className={`text-xs mt-1.5 text-center transition-colors ${
                  theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Cliquez pour appliquer un template
                </div>
              </div>
            </div>

            {/* 2. Couleurs */}
            <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all ${
              theme.mode === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/50 border-gray-300'
            }`}>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Palette className="text-pink-400" size={20} />
                <h3 className={`text-lg sm:text-xl font-semibold transition-colors ${
                  theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>2. Couleurs</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {neonColors.map((colorOption) => (
                    <button
                      key={colorOption.color}
                      onClick={() => updateConfig({ color: colorOption.color })}
                      className={`aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                        config.color === colorOption.color 
                          ? 'border-white shadow-lg' 
                          : theme.mode === 'dark'
                            ? 'border-gray-600 hover:border-gray-400'
                            : 'border-gray-300 hover:border-gray-500'
                      }`}
                      style={{
                        backgroundColor: colorOption.color,
                        boxShadow: config.color === colorOption.color 
                          ? `0 0 20px ${colorOption.color}40` 
                          : 'none'
                      }}
                      title={colorOption.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Police */}
            <AdvancedConfigurator 
              config={config} 
              updateConfig={updateConfig}
              onResetPositions={() => setWordPositions([])}
            />

            {/* Logo Personnalisé */}
            <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all ${
              theme.mode === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/50 border-gray-300'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xl sm:text-2xl">🎨</div>
                <h3 className={`text-lg sm:text-xl font-semibold transition-colors ${
                  theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Logo Personnalisé</h3>
              </div>
              
              <button
                onClick={handleImageUpload}
                className="w-full p-3 sm:p-4 border-2 border-dashed border-gray-600 hover:border-blue-400 rounded-lg sm:rounded-xl transition-all hover:bg-blue-400/5"
              >
                <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-blue-400">
                  <div className="text-xl sm:text-2xl">📤</div>
                  <span className="text-xs sm:text-sm font-medium">Importer votre logo</span>
                  <span className="text-xs">PNG, JPG, SVG (max 2MB)</span>
                </div>
              </button>
              
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg sm:rounded-xl">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="text-yellow-400 mt-1">⚠️</div>
                  <div>
                    <div className="text-yellow-400 font-medium text-xs sm:text-sm">Service Premium</div>
                    <div className="text-yellow-300 text-xs mt-1">
                      L'import de logos personnalisés nécessite une validation manuelle. 
                      Notre équipe vous recontactera sous 24h pour finaliser votre commande.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Taille */}
            <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all ${
              theme.mode === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/50 border-gray-300'
            }`}>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <ShoppingCart className="text-yellow-400" size={20} />
                <h3 className={`text-lg sm:text-xl font-semibold transition-colors ${
                  theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>4. Taille & Prix</h3>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => updateConfig({ size: '50cm' })}
                  className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all hover:scale-[1.02] btn-interactive ${
                    config.size === '50cm'
                      ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                      : theme.mode === 'dark'
                        ? 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                        : 'border-gray-300 bg-gray-100/30 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm sm:text-base">50cm de largeur</span>
                    <span className="text-lg sm:text-xl font-bold">120 €</span>
                  </div>
                </button>
                <button
                  onClick={() => updateConfig({ size: '100cm' })}
                  className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all hover:scale-[1.02] btn-interactive ${
                    config.size === '100cm'
                      ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                      : theme.mode === 'dark'
                        ? 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                        : 'border-gray-300 bg-gray-100/30 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm sm:text-base">100cm de largeur</span>
                    <span className="text-lg sm:text-xl font-bold">200 €</span>
                  </div>
                </button>
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <div className="mb-2">
                  <div className={`text-2xl sm:text-3xl font-bold transition-colors ${
                  theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{calculatePrice()}€</div>
                <div className={`text-xs sm:text-sm mb-3 sm:mb-4 transition-colors ${
                  theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>TTC, Livraison gratuite</div>
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all btn-interactive btn-glow flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4"
                >
                  <ShoppingCart size={18} />
                  <span className="text-sm sm:text-base">Ajouter au Panier</span>
                </button>
                
                <div className="flex gap-2 sm:gap-3">
                  <button 
                    onClick={handleSaveToFavorites}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <Heart size={16} />
                    <span className="text-xs sm:text-sm">Favoris</span>
                  </button>
                  <button 
                    onClick={shareDesign}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all btn-interactive flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <Share2 size={16} />
                    <span className="text-xs sm:text-sm">Partager</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <CustomerReviews />
            </div>
          </div>
        </div>

        {/* Mini Preview - Sticky when scrolling */}
        {showMiniPreview && (
          <div className="fixed top-4 right-4 z-40 bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700 p-3 shadow-2xl animate-slide-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-pink-400">
                <Sparkles size={16} />
              </div>
              <span className="text-white font-semibold text-sm">Aperçu Live</span>
            </div>
            <div 
              className="w-32 h-16 bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
              <div
                className="text-xs font-bold z-10 text-center leading-tight"
                style={getTextStyle()}
              >
                {config.multiline 
                  ? config.lines.map((line, i) => (
                      <div key={i}>{line || 'LIGNE'}</div>
                    ))
                  : (config.text || 'MON NÉON')
                }
              </div>
              <div className="absolute bottom-1 right-1 text-xs text-white/60 font-bold">
                {calculatePrice()}€
              </div>
            </div>
          </div>
        )}

        {/* Sticky CTA Button - Reduced height */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-1.5 backdrop-blur-lg">
          <div className="container mx-auto max-w-md">
            <div className="bg-gradient-to-r from-orange-500/90 to-red-600/90 rounded-xl p-2 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 opacity-90 rounded-xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-white font-bold text-lg">{calculatePrice()}€</div>
                    <div className="text-white/80 text-xs">Livraison gratuite</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/80 text-xs">✨ Premium</div>
                    <div className="text-white font-semibold text-xs">Garantie 2 ans</div>
                  </div>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-2xl"
                >
                  <ShoppingCart size={20} />
                  Commander Maintenant
                </button>
                
                <div className="flex items-center justify-center gap-3 mt-1.5 text-white/80 text-xs">
                  <span>🛡️ Garantie 2 ans</span>
                  <span>🔒 Paiement sécurisé</span>
                  <span>⚡ Livraison rapide</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Image Upload Modal */}
        <CustomImageUpload
          isOpen={showImageUpload}
          onClose={() => setShowImageUpload(false)}
          onSubmit={handleImageUploadSubmit}
        />

        {/* Load Designs Modal */}
        {showLoadDesigns && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLoadDesigns(false)}></div>
            
            <div className={`relative rounded-2xl border w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all ${
              theme.mode === 'dark' 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-300'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <Bookmark className="text-purple-400" size={24} />
                  <h2 className={`text-xl font-semibold transition-colors ${
                    theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Mes Designs Sauvegardés</h2>
                  {config.text.length >= 8 && (
                    <div className="text-xs text-orange-400 font-medium">
                      Inclus surcharge texte long (+{(config.text.length - 7) * 3}€)
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowLoadDesigns(false)}
                  className={`transition-colors ${
                    theme.mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {designHistory.favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Bookmark className={`mx-auto mb-4 ${
                      theme.mode === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    }`} size={48} />
                    <p className={`transition-colors ${
                      theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Aucun design sauvegardé</p>
                    <p className={`text-sm mt-2 transition-colors ${
                      theme.mode === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>Créez un design et cliquez sur ❤️ pour le sauvegarder</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {designHistory.favorites.map((favorite) => (
                      <div
                        key={favorite.id}
                        className={`group relative rounded-xl border transition-all hover:scale-105 cursor-pointer ${
                          theme.mode === 'dark' 
                            ? 'bg-gray-800/50 border-gray-600 hover:border-purple-400' 
                            : 'bg-gray-50 border-gray-300 hover:border-purple-500'
                        }`}
                        onClick={() => handleLoadDesign(favorite.config)}
                      >
                        {/* Preview */}
                        <div className="aspect-video bg-gray-900 rounded-t-xl relative overflow-hidden">
                          <div className="absolute inset-0 bg-black/60"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="text-lg font-bold transition-all duration-300 group-hover:scale-110"
                              style={{
                                color: favorite.config.color,
                                textShadow: `0 0 5px ${favorite.config.color}, 0 0 10px ${favorite.config.color}`,
                                fontFamily: favorite.config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
                              }}
                            >
                              {favorite.config.multiline 
                                ? favorite.config.lines.map((line, i) => (
                                    <div key={i} className="text-center text-sm">{line}</div>
                                  ))
                                : (favorite.config.text || 'DESIGN')
                              }
                            </div>
                          </div>
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center pb-4">
                            <div className="bg-white/90 text-gray-900 font-semibold px-3 py-1 rounded-full text-sm flex items-center gap-2">
                              <Sparkles size={14} />
                              Charger
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          <h4 className={`font-semibold mb-1 transition-colors ${
                            theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{favorite.name}</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className={`transition-colors ${
                              theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {new Date(favorite.timestamp).toLocaleDateString('fr-FR')}
                            </span>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full border border-gray-500" 
                                style={{ backgroundColor: favorite.config.color }}
                              />
                              <span className={`text-xs transition-colors ${
                                theme.mode === 'dark' ? 'text-gray-500' : 'text-gray-500'
                              }`}>{favorite.config.size}</span>
                            </div>
                          </div>
                          
                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              designHistory.removeFromFavorites(favorite.id);
                            }}
                            className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                            title="Supprimer"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cart */}
        <Cart
          isOpen={cart.isOpen}
          onClose={() => cart.setIsOpen(false)}
          items={cart.items}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          totalPrice={cart.getTotalPrice()}
          onCheckout={handleCheckout}
        />
