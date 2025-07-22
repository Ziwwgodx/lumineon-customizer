import React, { useState } from 'react';
import { X, Heart, Save, Sparkles, Check, Star } from 'lucide-react';
import { NeonConfig } from '../types';

interface SaveHeartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  config: NeonConfig;
}

const SaveHeartPopup: React.FC<SaveHeartPopupProps> = ({ isOpen, onClose, config }) => {
  const [designName, setDesignName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!designName.trim()) {
      alert('Veuillez entrer un nom pour votre design');
      return;
    }

    setSaving(true);

    // Simulation de sauvegarde
    const savedDesign = {
      id: Date.now().toString(),
      name: designName,
      config: { ...config },
      createdAt: new Date().toISOString(),
      isFavorite: true
    };

    // Sauvegarder dans localStorage
    const savedDesigns = JSON.parse(localStorage.getItem('neon-saved-designs') || '[]');
    savedDesigns.push(savedDesign);
    localStorage.setItem('neon-saved-designs', JSON.stringify(savedDesigns));

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => {
        onClose();
        setSaved(false);
        setDesignName('');
      }, 1500);
    }, 1000);
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
      
      <div className="relative bg-gray-900 rounded-3xl border border-pink-500/30 w-full max-w-md overflow-hidden shadow-2xl shadow-pink-500/20">
        {/* Header avec animation néon */}
        <div className="bg-gradient-to-r from-pink-500/20 via-red-600/20 to-pink-500/20 border-b border-pink-500/30 p-6 relative overflow-hidden">
          {/* Effet de pulsation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-red-600/5 animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative bg-pink-500/20 p-3 rounded-2xl border border-pink-400/30 shadow-lg shadow-pink-500/20">
                <Heart className="text-pink-400 animate-pulse" size={24} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-full animate-ping"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">💖 Coup de Cœur</h2>
                <p className="text-pink-300 text-sm">Sauvegardez votre création</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-pink-300 transition-all hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview avec effet néon */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-pink-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-red-600/5 animate-pulse"></div>
            <div className="text-center relative z-10">
              <div className="text-sm text-pink-300 mb-3 flex items-center justify-center gap-2">
                <Sparkles className="animate-spin" size={16} />
                Votre création néon
                <Sparkles className="animate-spin" size={16} style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="text-3xl font-bold mb-3 animate-pulse" style={getPreviewStyle()}>
                {config.multiline ? config.lines.join(' ') : config.text || 'MON NÉON'}
              </div>
              <div className="text-xs text-gray-400 bg-gray-900/50 rounded-full px-3 py-1 inline-block">
                {config.size} • {config.font} • {config.useGradient ? 'Dégradé' : 'Couleur unie'}
              </div>
            </div>
          </div>

          {!saved ? (
            <>
              {/* Input avec style néon */}
              <div className="space-y-3">
                <label className="block text-pink-300 font-semibold text-sm flex items-center gap-2">
                  <Star className="animate-pulse" size={16} />
                  Nom de votre coup de cœur *
                </label>
                <input
                  type="text"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800/80 border-2 border-pink-500/30 rounded-2xl text-white placeholder-pink-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-lg font-medium"
                  placeholder="Mon néon magique ✨"
                  maxLength={50}
                />
                <div className="text-right text-xs text-gray-400">
                  {designName.length}/50 caractères
                </div>
              </div>

              {/* Bouton de sauvegarde avec animation */}
              <button
                onClick={handleSave}
                disabled={saving || !designName.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 px-6 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 relative overflow-hidden"
              >
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sauvegarde en cours...
                  </>
                ) : (
                  <>
                    <Heart className="animate-pulse" size={20} />
                    💖 Sauvegarder mon coup de cœur
                  </>
                )}
              </button>
            </>
          ) : (
            /* État de confirmation */
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-xl shadow-green-500/30">
                <Check className="text-white" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">✨ Sauvegardé !</h3>
                <p className="text-green-300">
                  Votre coup de cœur "{designName}" a été ajouté à vos favoris
                </p>
              </div>
            </div>
          )}

          {/* Info avec style néon */}
          <div className="bg-gradient-to-r from-pink-500/10 to-red-600/10 border border-pink-500/30 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-red-600/5 animate-pulse"></div>
            <div className="flex items-start gap-3 relative z-10">
              <Heart className="text-pink-400 mt-1 animate-pulse" size={18} />
              <div>
                <div className="text-pink-400 font-semibold text-sm">Sauvegarde Premium</div>
                <div className="text-pink-300 text-sm mt-1">
                  Vos coups de cœur sont sauvegardés localement et accessibles à tout moment pour les commander ou les modifier.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveHeartPopup;