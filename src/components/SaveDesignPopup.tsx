import React, { useState } from 'react';
import { X, Save, Folder, Star, Download, Palette } from 'lucide-react';
import { NeonConfig } from '../types';

interface SaveDesignPopupProps {
  isOpen: boolean;
  onClose: () => void;
  config: NeonConfig;
}

const SaveDesignPopup: React.FC<SaveDesignPopupProps> = ({ isOpen, onClose, config }) => {
  const [designName, setDesignName] = useState('');
  const [category, setCategory] = useState('Personnel');
  const [isFavorite, setIsFavorite] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const categories = ['Personnel', 'Business', 'Maison', 'Événement', 'Cadeau'];

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
      category,
      isFavorite,
      createdAt: new Date().toISOString(),
      thumbnail: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="60" fill="#111827"/>
          <text x="50" y="35" text-anchor="middle" fill="${config.color}" 
                font-family="Arial" font-size="12" font-weight="bold">
            ${config.text.substring(0, 8)}
          </text>
        </svg>
      `)}`
    };

    // Sauvegarder dans localStorage
    const savedDesigns = JSON.parse(localStorage.getItem('neon-saved-designs') || '[]');
    savedDesigns.push(savedDesign);
    localStorage.setItem('neon-saved-designs', JSON.stringify(savedDesigns));

    // Si favori, ajouter aussi aux favoris
    if (isFavorite) {
      const favorites = JSON.parse(localStorage.getItem('neon-favorites') || '[]');
      favorites.push(savedDesign);
      localStorage.setItem('neon-favorites', JSON.stringify(favorites));
    }

    setTimeout(() => {
      setSaving(false);
      onClose();
      alert(`✨ Design "${designName}" sauvegardé avec succès !`);
    }, 1500);
  };

  const getPreviewStyle = () => ({
    color: config.color,
    textShadow: `0 0 10px ${config.color}, 0 0 20px ${config.color}`,
    fontFamily: config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-2 rounded-xl">
                <Save className="text-blue-400" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Sauvegarder le Design</h2>
                <p className="text-sm text-gray-300">Gardez votre création</p>
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
              <div className="text-sm text-gray-400 mb-2">Aperçu :</div>
              <div className="text-2xl font-bold" style={getPreviewStyle()}>
                {config.multiline ? config.lines.join(' ') : config.text || 'MON NÉON'}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {config.size} • {config.font} • {config.useGradient ? 'Dégradé' : 'Couleur unie'}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom du design *
              </label>
              <input
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Mon super néon"
                maxLength={50}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Folder className="inline w-4 h-4 mr-1" />
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Favorite */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  isFavorite
                    ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                    : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-yellow-500/50'
                }`}
              >
                <Star size={16} className={isFavorite ? 'fill-current' : ''} />
                Ajouter aux favoris
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !designName.trim()}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Sauvegarder
                </>
              )}
            </button>
          </div>

          {/* Info */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <Palette className="text-green-400 mt-0.5" size={16} />
              <div className="text-green-300 text-sm">
                Vos designs sauvegardés sont accessibles depuis votre navigateur et peuvent être rechargés à tout moment.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveDesignPopup;