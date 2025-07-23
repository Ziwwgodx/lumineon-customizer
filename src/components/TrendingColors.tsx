import React, { useState, useEffect } from 'react';
import { Palette, TrendingUp, Sparkles } from 'lucide-react';

interface TrendingColorsProps {
  onColorSelect: (color: string) => void;
  currentColor: string;
}

const TrendingColors: React.FC<TrendingColorsProps> = ({ onColorSelect, currentColor }) => {
  const [currentSeason, setCurrentSeason] = useState('');

  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setCurrentSeason('Printemps');
    else if (month >= 5 && month <= 7) setCurrentSeason('Été');
    else if (month >= 8 && month <= 10) setCurrentSeason('Automne');
    else setCurrentSeason('Hiver');
  }, []);

  const seasonalPalettes = {
    'Printemps': [
      { name: 'Rose Sakura', color: '#FFB7C5', trend: '+45%' },
      { name: 'Vert Menthe', color: '#98FB98', trend: '+32%' },
      { name: 'Lavande', color: '#E6E6FA', trend: '+28%' },
      { name: 'Pêche', color: '#FFCBA4', trend: '+25%' }
    ],
    'Été': [
      { name: 'Turquoise Tropical', color: '#40E0D0', trend: '+52%' },
      { name: 'Corail Vibrant', color: '#FF7F50', trend: '+38%' },
      { name: 'Jaune Soleil', color: '#FFD700', trend: '+35%' },
      { name: 'Bleu Océan', color: '#0077BE', trend: '+30%' }
    ],
    'Automne': [
      { name: 'Orange Citrouille', color: '#FF7518', trend: '+42%' },
      { name: 'Rouge Bordeaux', color: '#800020', trend: '+36%' },
      { name: 'Or Automnal', color: '#DAA520', trend: '+31%' },
      { name: 'Marron Cannelle', color: '#D2691E', trend: '+27%' }
    ],
    'Hiver': [
      { name: 'Bleu Glacier', color: '#B0E0E6', trend: '+48%' },
      { name: 'Violet Mystique', color: '#8A2BE2', trend: '+41%' },
      { name: 'Blanc Neige', color: '#FFFAFA', trend: '+37%' },
      { name: 'Argent Métallique', color: '#C0C0C0', trend: '+33%' }
    ]
  };

  const popularColors = [
    // Blancs et Bleus
    { name: 'Blanc', color: '#FFFFFF', popularity: 95, category: 'Classique' },
    { name: 'Blanc Chaud', color: '#FFF8DC', popularity: 92, category: 'Classique' },
    { name: 'Turquoise', color: '#40E0D0', popularity: 89, category: 'Moderne' },
    { name: 'Bleu Glacier', color: '#87CEEB', popularity: 86, category: 'Moderne' },
    { name: 'Bleu', color: '#0066FF', popularity: 84, category: 'Business' },
    { name: 'Bleu Profond', color: '#003366', popularity: 81, category: 'Business' },
    
    // Jaunes et Oranges
    { name: 'Jaune Citron', color: '#FFF700', popularity: 88, category: 'Énergique' },
    { name: 'Jaune Doré', color: '#FFD700', popularity: 85, category: 'Énergique' },
    { name: 'Jaune', color: '#FFFF00', popularity: 83, category: 'Joyeux' },
    { name: 'Orange', color: '#FF8C00', popularity: 80, category: 'Énergique' },
    { name: 'Rouge Tomate', color: '#FF6347', popularity: 78, category: 'Énergique' },
    
    // Roses et Violets
    { name: 'Rose Clair', color: '#FFB6C1', popularity: 87, category: 'Romantique' },
    { name: 'Rose Vif', color: '#FF1493', popularity: 90, category: 'Romantique' },
    { name: 'Violet', color: '#8A2BE2', popularity: 82, category: 'Créatif' },
    { name: 'Violet Clair', color: '#DDA0DD', popularity: 79, category: 'Créatif' },
    
    // Rouges et Verts
    { name: 'Rouge', color: '#FF0000', popularity: 91, category: 'Passion' },
    { name: 'Vert Profond', color: '#006400', popularity: 76, category: 'Nature' },
    { name: 'Vert', color: '#32CD32', popularity: 84, category: 'Nature' }
  ];

  const currentPalette = seasonalPalettes[currentSeason as keyof typeof seasonalPalettes] || seasonalPalettes['Été'];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="text-green-400" size={24} />
        <h3 className="text-xl font-semibold text-white">Couleurs Tendance</h3>
        <div className="ml-auto bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
          {currentSeason} 2024
        </div>
      </div>

      {/* Palette saisonnière */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-yellow-400" size={18} />
          <h4 className="text-lg font-semibold text-white">Collection {currentSeason}</h4>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {currentPalette.map((colorItem) => (
            <button
              key={colorItem.name}
              onClick={() => onColorSelect(colorItem.color)}
              className={`group relative p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                currentColor === colorItem.color
                  ? 'border-white shadow-lg'
                  : 'border-gray-600 hover:border-gray-400'
              }`}
              style={{
                backgroundColor: colorItem.color,
                boxShadow: currentColor === colorItem.color 
                  ? `0 0 20px ${colorItem.color}40` 
                  : 'none'
              }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
              <div className="relative z-10 text-center">
                <div className="text-white font-semibold text-xs sm:text-sm mb-1">
                  {colorItem.name}
                </div>
                <div className="bg-green-500/80 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                  {colorItem.trend}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Couleurs populaires */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Palette className="text-pink-400" size={18} />
          <h4 className="text-lg font-semibold text-white">Plus Populaires</h4>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {popularColors.map((colorItem) => (
            <button
              key={colorItem.name}
              onClick={() => onColorSelect(colorItem.color)}
              className={`w-full flex items-center gap-2 sm:gap-3 p-2 rounded-lg border transition-all hover:scale-[1.02] ${
                currentColor === colorItem.color
                  ? 'border-white bg-white/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-500 flex-shrink-0"
                style={{ backgroundColor: colorItem.color }}
              />
              <div className="flex-1 text-left">
                <div className="text-white font-medium text-sm truncate">{colorItem.name}</div>
                <div className="text-gray-400 text-xs truncate">{colorItem.category}</div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-semibold text-xs">
                  {colorItem.popularity}%
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingColors;