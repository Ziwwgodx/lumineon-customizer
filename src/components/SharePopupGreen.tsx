import React, { useState } from 'react';
import { X, Share2, Copy, Facebook, Twitter, Instagram, Mail, MessageCircle, Link, Check, Sparkles, Zap } from 'lucide-react';
import { NeonConfig } from '../types';

interface SharePopupGreenProps {
  isOpen: boolean;
  onClose: () => void;
  config: NeonConfig;
}

const SharePopupGreen: React.FC<SharePopupGreenProps> = ({ isOpen, onClose, config }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.href}?config=${encodeURIComponent(JSON.stringify(config))}`;
  const shareText = `✨ Découvrez mon néon personnalisé "${config.text}" ! Créé avec LumiNéon 💫`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback pour les navigateurs qui ne supportent pas clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      emoji: '📘'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'from-sky-500 to-sky-600',
      hoverColor: 'hover:from-sky-600 hover:to-sky-700',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      emoji: '🐦'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      emoji: '💬'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      url: `https://www.instagram.com/`,
      emoji: '📸'
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'from-gray-600 to-gray-700',
      hoverColor: 'hover:from-gray-700 hover:to-gray-800',
      url: `mailto:?subject=${encodeURIComponent('Mon néon personnalisé ✨')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
      emoji: '📧'
    }
  ];

  const handleShare = (url: string, name: string) => {
    if (name === 'Instagram') {
      // Pour Instagram, on copie le lien et on informe l'utilisateur
      handleCopyLink();
      alert('Lien copié ! Collez-le dans votre story Instagram 📸');
      return;
    }
    window.open(url, '_blank', 'width=600,height=400');
    
    // Animation de succès
    setShared(true);
    setTimeout(() => {
      setShared(false);
    }, 2000);
  };

  const getPreviewStyle = () => ({
    color: config.color,
    textShadow: `
      0 0 5px ${config.color},
      0 0 10px ${config.color},
      0 0 15px ${config.color},
      0 0 20px ${config.color}
    `,
    fontFamily: config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 rounded-3xl border border-emerald-500/30 w-full max-w-lg overflow-hidden shadow-2xl shadow-emerald-500/20">
        {/* Header avec animation néon verte */}
        <div className="bg-gradient-to-r from-emerald-500/20 via-green-600/20 to-emerald-500/20 border-b border-emerald-500/30 p-6 relative overflow-hidden">
          {/* Effet de pulsation verte */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-green-600/5 animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative bg-emerald-500/20 p-3 rounded-2xl border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
                <Share2 className="text-emerald-400 animate-pulse" size={24} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-ping"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">🚀 Partager mon Néon</h2>
                <p className="text-emerald-300 text-sm">Montrez votre création au monde</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-emerald-300 transition-all hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!shared ? (
            <>
              {/* Preview avec effet néon vert */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 animate-pulse"></div>
                <div className="text-center relative z-10">
                  <div className="text-sm text-emerald-300 mb-3 flex items-center justify-center gap-2">
                    <Sparkles className="animate-spin" size={16} />
                    Votre création à partager
                    <Zap className="animate-bounce" size={16} />
                  </div>
                  <div className="text-3xl font-bold mb-3 animate-pulse" style={getPreviewStyle()}>
                    {config.multiline ? config.lines.join(' ') : config.text || 'MON NÉON'}
                  </div>
                  <div className="text-xs text-gray-400 bg-gray-900/50 rounded-full px-3 py-1 inline-block">
                    {config.size} • {config.font} • {config.useGradient ? 'Dégradé' : 'Couleur unie'}
                  </div>
                </div>
              </div>

              {/* Copy Link avec style néon vert */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Link size={18} className="text-emerald-400 animate-pulse" />
                  Copier le lien magique ✨
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-800/80 border border-emerald-500/30 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl relative overflow-hidden ${
                      copied
                        ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copié !' : 'Copier'}
                  </button>
                </div>
              </div>

              {/* Social Share avec animations vertes */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Sparkles className="text-emerald-400 animate-spin" size={18} />
                  Partager sur les réseaux
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {shareOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.name}
                        onClick={() => handleShare(option.url, option.name)}
                        className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${option.color} ${option.hoverColor} transition-all hover:scale-[1.02] text-white font-semibold shadow-lg hover:shadow-xl relative overflow-hidden group`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        
                        <div className="bg-white/20 p-2 rounded-xl">
                          <IconComponent size={20} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-bold">Partager sur {option.name}</div>
                          <div className="text-sm opacity-90">
                            {option.name === 'Instagram' ? 'Copier le lien pour story' : 'Partage direct'}
                          </div>
                        </div>
                        <div className="text-2xl">
                          {option.emoji}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* État de confirmation de partage */
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-xl shadow-emerald-500/30">
                <Share2 className="text-white" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">🚀 Partagé !</h3>
                <p className="text-emerald-300">
                  Votre néon va faire sensation sur les réseaux !
                </p>
              </div>
            </div>
          )}

          {/* Info avec style néon vert */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-600/10 border border-emerald-500/30 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-green-600/5 animate-pulse"></div>
            <div className="flex items-start gap-3 relative z-10">
              <Zap className="text-emerald-400 mt-1 animate-bounce" size={18} />
              <div>
                <div className="text-emerald-400 font-semibold text-sm">Partage Viral ✨</div>
                <div className="text-emerald-300 text-sm mt-1">
                  Vos amis pourront voir votre design en 3D et même le commander directement ! 
                  Plus vous partagez, plus vous inspirez la communauté néon ! 🌟
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePopupGreen;