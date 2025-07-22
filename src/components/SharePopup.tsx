import React, { useState } from 'react';
import { X, Share2, Copy, Facebook, Twitter, Instagram, Mail, MessageCircle, Link, Check } from 'lucide-react';
import { NeonConfig } from '../types';

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  config: NeonConfig;
}

const SharePopup: React.FC<SharePopupProps> = ({ isOpen, onClose, config }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.href}?config=${encodeURIComponent(JSON.stringify(config))}`;
  const shareText = `Découvrez mon néon personnalisé "${config.text}" ! ✨`;

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
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'from-sky-500 to-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'from-gray-600 to-gray-700',
      url: `mailto:?subject=${encodeURIComponent('Mon néon personnalisé')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    }
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-2 rounded-xl">
                <Share2 className="text-green-400" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Partager mon Néon</h2>
                <p className="text-sm text-gray-300">Montrez votre création</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Votre création :</div>
              <div 
                className="text-2xl font-bold mb-2"
                style={{
                  color: config.color,
                  textShadow: `0 0 10px ${config.color}, 0 0 20px ${config.color}`,
                  fontFamily: config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
                }}
              >
                {config.multiline ? config.lines.join(' ') : config.text || 'MON NÉON'}
              </div>
              <div className="text-xs text-gray-500">
                {config.size} • {config.font} • {config.useGradient ? 'Dégradé' : 'Couleur unie'}
              </div>
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Link size={18} className="text-blue-400" />
              Copier le lien
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm font-mono"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copié !' : 'Copier'}
              </button>
            </div>
          </div>

          {/* Social Share */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">Partager sur les réseaux</h3>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.name}
                    onClick={() => handleShare(option.url)}
                    className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${option.color} hover:scale-105 transition-all text-white font-medium shadow-lg hover:shadow-xl`}
                  >
                    <IconComponent size={20} />
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-green-400 mt-1">✨</div>
              <div>
                <div className="text-green-400 font-medium text-sm">Partage intelligent</div>
                <div className="text-green-300 text-sm mt-1">
                  Vos amis pourront voir votre design et même le commander directement !
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;