import React, { useState, useRef, useEffect } from 'react';
import { Type, Sparkles, X } from 'lucide-react';

interface MobileOptimizedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const MobileOptimizedInput: React.FC<MobileOptimizedInputProps> = ({
  value,
  onChange,
  placeholder = "MON NÉON",
  maxLength = 30
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [suggestions] = useState([
    'LOVE', 'OPEN', 'CAFÉ', 'BAR', 'PIZZA', 'SHOP', 'MUSIC', 'BEER', 'HOTEL', 'GAME',
    'CLUB', 'STUDIO', 'SALON', 'GARAGE', 'OFFICE', 'HOME', 'DREAM', 'PARTY', 'DANCE',
    'FOOD', 'WINE', 'CHILL', 'WORK', 'PLAY', 'RELAX', 'CREATE', 'INSPIRE', 'SHINE'
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase()) && 
        suggestion.toLowerCase() !== value.toLowerCase()
      ).slice(0, 6);
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions.slice(0, 12));
    }
  }, [value, suggestions]);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    if (isFullscreen) {
      setIsFullscreen(false);
    }
  };

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Input normal */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => isMobile && handleFullscreenToggle()}
          className="w-full px-4 py-3 rounded-xl border text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
          placeholder={placeholder}
          maxLength={maxLength}
          readOnly={isMobile}
        />
        
        {/* Suggestions rapides sur desktop */}
        {!isMobile && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs text-gray-400 mb-2 px-2">Suggestions populaires</div>
              <div className="grid grid-cols-3 gap-1">
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interface plein écran mobile */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Type className="text-blue-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Votre texte</h2>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Input principal */}
          <div className="p-6">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-6 py-4 text-2xl font-bold bg-gray-800 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={placeholder}
              maxLength={maxLength}
              autoFocus
            />
            <div className="text-right text-sm text-gray-400 mt-2">
              {value.length}/{maxLength} caractères
            </div>
          </div>

          {/* Suggestions */}
          <div className="flex-1 px-6 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-400" size={18} />
              <h3 className="text-lg font-semibold text-white">Suggestions populaires</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl text-white font-semibold transition-all hover:scale-105 active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Catégories */}
            <div className="mt-8">
              <h4 className="text-md font-semibold text-white mb-4">Par catégorie</h4>
              <div className="space-y-4">
                {[
                  { category: 'Business', items: ['OPEN', 'SHOP', 'OFFICE', 'STUDIO'] },
                  { category: 'Restaurant', items: ['CAFÉ', 'BAR', 'PIZZA', 'FOOD'] },
                  { category: 'Maison', items: ['HOME', 'RELAX', 'CHILL', 'FAMILY'] },
                  { category: 'Créatif', items: ['CREATE', 'ART', 'MUSIC', 'DANCE'] }
                ].map((group) => (
                  <div key={group.category}>
                    <div className="text-sm text-gray-400 mb-2">{group.category}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleSuggestionClick(item)}
                          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-all"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700">
            <button
              onClick={() => setIsFullscreen(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all"
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileOptimizedInput;