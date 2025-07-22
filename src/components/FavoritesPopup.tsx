import React, { useState, useEffect } from 'react';
import { X, Star, Heart, Trash2, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { NeonConfig } from '../types';

interface FavoritesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  config: NeonConfig;
}

interface SavedDesign {
  id: string;
  name: string;
  config: NeonConfig;
  createdAt: string;
  isFavorite?: boolean;
}

const FavoritesPopup: React.FC<FavoritesPopupProps> = ({ isOpen, onClose, config }) => {
  const [favorites, setFavorites] = useState<SavedDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<SavedDesign | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadFavorites();
    }
  }, [isOpen]);

  const loadFavorites = () => {
    const savedDesigns = JSON.parse(localStorage.getItem('neon-saved-designs') || '[]');
    const favoriteDesigns = savedDesigns.filter((design: SavedDesign) => design.isFavorite);
    setFavorites(favoriteDesigns);
  };

  const removeFavorite = (designId: string) => {
    const savedDesigns = JSON.parse(localStorage.getItem('neon-saved-designs') || '[]');
    const updatedDesigns = savedDesigns.map((design: SavedDesign) => 
      design.id === designId ? { ...design, isFavorite: false } : design
    );
    localStorage.setItem('neon-saved-designs', JSON.stringify(updatedDesigns));
    loadFavorites();
  };

  const addCurrentToFavorites = () => {
    const newFavorite: SavedDesign = {
      id: Date.now().toString(),
      name: `Néon ${config.text || 'Personnalisé'}`,
      config: { ...config },
      createdAt: new Date().toISOString(),
      isFavorite: true
    };

    const savedDesigns = JSON.parse(localStorage.getItem('neon-saved-designs') || '[]');
    savedDesigns.push(newFavorite);
    localStorage.setItem('neon-saved-designs', JSON.stringify(savedDesigns));
    loadFavorites();
  };

  const getPreviewStyle = (designConfig: NeonConfig) => ({
    color: designConfig.color,
    textShadow: `
      0 0 3px ${designConfig.color},
      0 0 6px ${designConfig.color},
      0 0 9px ${designConfig.color}
    `,
    fontFamily: designConfig.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 rounded-3xl border border-yellow-500/30 w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl shadow-yellow-500/20">
        {/* Header avec animation néon */}
        <div className="bg-gradient-to-r from-yellow-500/20 via-orange-600/20 to-yellow-500/20 border-b border-yellow-500/30 p-6 relative overflow-hidden">
          {/* Effet de pulsation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-orange-600/5 animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative bg-yellow-500/20 p-3 rounded-2xl border border-yellow-400/30 shadow-lg shadow-yellow-500/20">
                <Star className="text-yellow-400 animate-pulse fill-current" size={24} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full animate-ping"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">⭐ Mes Favoris</h2>
                <p className="text-yellow-300 text-sm">Vos créations préférées ({favorites.length})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-yellow-300 transition-all hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Bouton ajouter actuel */}
          <button
            onClick={addCurrentToFavorites}
            className="w-full bg-gradient-to-r from-yellow-500/20 to-orange-600/20 hover:from-yellow-500/30 hover:to-orange-600/30 border-2 border-dashed border-yellow-500/50 hover:border-yellow-400 text-white p-4 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent animate-pulse"></div>
            <Heart className="text-yellow-400 animate-pulse" size={20} />
            <span className="font-semibold">💫 Ajouter le néon actuel aux favoris</span>
            <Sparkles className="text-yellow-400 animate-spin" size={16} />
          </button>

          {favorites.length === 0 ? (
            /* État vide */
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-full flex items-center justify-center mx-auto border border-yellow-500/30">
                <Star className="text-yellow-400" size={40} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Aucun favori pour le moment</h3>
                <p className="text-gray-400">Ajoutez vos créations préférées pour les retrouver facilement !</p>
              </div>
            </div>
          ) : (
            /* Liste des favoris */
            <div className="grid gap-4">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="bg-gray-800/50 rounded-2xl p-4 border border-yellow-500/20 hover:border-yellow-500/40 transition-all hover:scale-[1.01] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-all"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    {/* Preview */}
                    <div className="w-16 h-16 bg-gray-900/80 rounded-xl flex items-center justify-center border border-gray-600 flex-shrink-0">
                      <div className="text-sm font-bold text-center" style={getPreviewStyle(favorite.config)}>
                        {favorite.config.multiline 
                          ? favorite.config.lines[0]?.substring(0, 4) || 'NÉON'
                          : favorite.config.text.substring(0, 4) || 'NÉON'
                        }
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                        {favorite.name}
                        <Star className="text-yellow-400 fill-current" size={16} />
                      </h4>
                      <p className="text-sm text-gray-400 mb-1">
                        "{favorite.config.multiline ? favorite.config.lines.join(' ') : favorite.config.text}"
                      </p>
                      <div className="text-xs text-gray-500">
                        {new Date(favorite.createdAt).toLocaleDateString('fr-FR')} • {favorite.config.size}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedDesign(favorite)}
                        className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 p-2 rounded-lg transition-all hover:scale-110"
                        title="Aperçu"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => removeFavorite(favorite.id)}
                        className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 p-2 rounded-lg transition-all hover:scale-110"
                        title="Retirer des favoris"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info avec style néon */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-600/10 border border-yellow-500/30 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-orange-600/5 animate-pulse"></div>
            <div className="flex items-start gap-3 relative z-10">
              <Sparkles className="text-yellow-400 mt-1 animate-spin" size={18} />
              <div>
                <div className="text-yellow-400 font-semibold text-sm">Collection Premium</div>
                <div className="text-yellow-300 text-sm mt-1">
                  Vos favoris sont sauvegardés localement. Vous pouvez les consulter, les modifier ou les commander à tout moment.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal aperçu */}
        {selectedDesign && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-gray-900 rounded-2xl border border-yellow-500/30 p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{selectedDesign.name}</h3>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center mb-4">
                <div className="text-3xl font-bold mb-2" style={getPreviewStyle(selectedDesign.config)}>
                  {selectedDesign.config.multiline 
                    ? selectedDesign.config.lines.join(' ') 
                    : selectedDesign.config.text
                  }
                </div>
                <div className="text-sm text-gray-400">
                  {selectedDesign.config.size} • {selectedDesign.config.font}
                </div>
              </div>
              
              <button
                onClick={() => {
                  // Ici on pourrait charger la config dans l'éditeur
                  setSelectedDesign(null);
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all hover:scale-105"
              >
                Charger ce design
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPopup;