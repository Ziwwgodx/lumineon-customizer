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
    { name: 'Néon Rose', color: '#FF1493', popularity: 95, category: 'Romantique' },
    { name: 'Cyan Électrique', color: '#00FFFF', popularity: 89, category: 'Moderne' },
    { name: 'Vert Lime', color: '#32CD32', popularity: 84, category: 'Business' },
    { name: 'Orange Fluo', color: '#FF4500', popularity: 81, category: 'Énergique' },
    { name: 'Violet Cosmic', color: '#8B00FF', popularity: 78, category: 'Créatif' },
    { name: 'Jaune Néon', color: '#FFFF00', popularity: 75, category: 'Joyeux' }
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {currentPalette.map((colorItem) => (
            <button
              key={colorItem.name}
              onClick={() => onColorSelect(colorItem.color)}
              className={`group relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
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
                <div className="text-white font-semibold text-sm mb-1">
                  {colorItem.name}
                </div>
                <div className="bg-green-500/80 text-white text-xs px-2 py-1 rounded-full">
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
        <div className="space-y-3">
          {popularColors.map((colorItem) => (
            <button
              key={colorItem.name}
              onClick={() => onColorSelect(colorItem.color)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all hover:scale-[1.02] ${
                currentColor === colorItem.color
                  ? 'border-white bg-white/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-500"
                style={{ backgroundColor: colorItem.color }}
              />
              <div className="flex-1 text-left">
                <div className="text-white font-medium">{colorItem.name}</div>
                <div className="text-gray-400 text-sm">{colorItem.category}</div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-semibold text-sm">
                  {colorItem.popularity}%
                </div>
                <div className="text-gray-500 text-xs">popularité</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingColors;