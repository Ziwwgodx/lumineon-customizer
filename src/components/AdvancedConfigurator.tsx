import React, { useState } from 'react';
import { Zap, Layers, Palette, Type } from 'lucide-react';
import { NeonConfig } from '../types';
import Tooltip from './Tooltip';

interface AdvancedConfiguratorProps {
  config: NeonConfig;
  updateConfig: (updates: Partial<NeonConfig>) => void;
  onResetPositions?: () => void;
}

const AdvancedConfigurator: React.FC<AdvancedConfiguratorProps> = ({ 
  config, 
  updateConfig, 
  onResetPositions 
}) => {
  const [showCustomFont, setShowCustomFont] = useState(false);
  const [customFontName, setCustomFontName] = useState('');
  const [customFontUrl, setCustomFontUrl] = useState('');
  const [customFonts, setCustomFonts] = useState<Array<{id: string, name: string, url: string}>>([]);

  const fonts = [
    { id: 'tilt-neon', name: 'Tilt Neon', description: 'Police néon authentique', preview: 'NÉON' },
    { id: 'orbitron', name: 'Orbitron', description: 'Futuriste et moderne', preview: 'TECH' },
    { id: 'audiowide', name: 'Audiowide', description: 'Style rétro gaming', preview: 'RETRO' },
    { id: 'electrolize', name: 'Electrolize', description: 'Électronique minimaliste', preview: 'ELEC' },
    { id: 'modern', name: 'Sans-Serif', description: 'Clean et lisible', preview: 'CLEAN' },
    { id: 'script', name: 'Script', description: 'Élégant et cursif', preview: 'STYLE' },
    { id: 'bebas-neue', name: 'Bebas Neue', description: 'Impact et modernité', preview: 'BOLD' },
    { id: 'righteous', name: 'Righteous', description: 'Arrondi et fun', preview: 'FUN' },
    { id: 'russo-one', name: 'Russo One', description: 'Industriel robuste', preview: 'POWER' },
    { id: 'bungee', name: 'Bungee', description: 'Street art moderne', preview: 'URBAN' },
    { id: 'monoton', name: 'Monoton', description: 'Rétro futuriste', preview: 'RETRO' },
    { id: 'creepster', name: 'Creepster', description: 'Halloween spooky', preview: 'SPOOK' }
  ];

  const addCustomFont = () => {
    if (!customFontName.trim() || !customFontUrl.trim()) {
      alert('Veuillez remplir le nom et l\'URL de la police');
      return;
    }

    // Validation basique de l'URL Google Fonts
    if (!customFontUrl.includes('fonts.googleapis.com') && !customFontUrl.includes('fonts.google.com')) {
      alert('Veuillez utiliser une URL Google Fonts valide');
      return;
    }

    const fontId = customFontName.toLowerCase().replace(/\s+/g, '-');
    const newFont = {
      id: fontId,
      name: customFontName,
      url: customFontUrl
    };

    // Ajouter la font au DOM
    const link = document.createElement('link');
    link.href = customFontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Ajouter à la liste des fonts personnalisées
    setCustomFonts(prev => [...prev, newFont]);
    updateConfig({ font: fontId as any });
    
    // Reset du formulaire
    setCustomFontName('');
    setCustomFontUrl('');
    setShowCustomFont(false);
    
    alert(`Police "${customFontName}" ajoutée avec succès !`);
  };

  const handleMultilineToggle = () => {
    if (!config.multiline) {
      const lines = config.text.split('\n').filter(line => line.trim());
      updateConfig({ 
        multiline: true, 
        lines: lines.length > 0 ? lines : [config.text] 
      });
    } else {
      updateConfig({ 
        multiline: false, 
        text: config.lines.join(' ') 
      });
    }
  };

  const updateLine = (index: number, value: string) => {
    const newLines = [...config.lines];
    newLines[index] = value;
    updateConfig({ 
      lines: newLines,
      text: newLines.join('\n')
    });
  };

  const addLine = () => {
    const newLines = [...config.lines, ''];
    updateConfig({ 
      lines: newLines,
      text: newLines.join('\n')
    });
  };

  const removeLine = (index: number) => {
    if (config.lines.length > 1) {
      const newLines = config.lines.filter((_, i) => i !== index);
      updateConfig({ 
        lines: newLines,
        text: newLines.join('\n')
      });
    }
  };

  function getFontFamilyFromId(fontId: string): string {
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
    
    // Vérifier d'abord les fonts personnalisées
    const customFont = customFonts.find(f => f.id === fontId);
    if (customFont) {
      return `"${customFont.name}", sans-serif`;
    }
    
    return fontMap[fontId as keyof typeof fontMap] || 'system-ui, sans-serif';
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Fonts */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <div className="flex items-center gap-3">
            <Type className="text-yellow-400" size={20} />
            <h3 className="text-lg lg:text-xl font-semibold text-white">3. Style de Police</h3>
            <Tooltip 
              content="Choisissez la police qui correspond à votre style. Chaque police a sa propre personnalité et rendu visuel."
              variant="info"
            />
          </div>
          <button
            onClick={() => setShowCustomFont(!showCustomFont)}
            className="px-2 lg:px-3 py-1 lg:py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs lg:text-sm font-medium rounded-lg transition-all hover:scale-105"
          >
            + Google Font
          </button>
        </div>

        {/* Custom Font Form */}
        {showCustomFont && (
          <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg lg:rounded-xl">
            <h4 className="text-blue-400 font-medium mb-2 lg:mb-3 text-sm lg:text-base">Ajouter une Google Font</h4>
            <div className="space-y-2 lg:space-y-3">
              <div>
                <label className="block text-xs lg:text-sm text-gray-300 mb-1">Nom de la police</label>
                <input
                  type="text"
                  value={customFontName}
                  onChange={(e) => setCustomFontName(e.target.value)}
                  className="w-full px-2 lg:px-3 py-1.5 lg:py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-xs lg:text-sm"
                  placeholder="ex: Poppins"
                />
              </div>
              <div>
                <label className="block text-xs lg:text-sm text-gray-300 mb-1">URL Google Fonts</label>
                <input
                  type="url"
                  value={customFontUrl}
                  onChange={(e) => setCustomFontUrl(e.target.value)}
                  className="w-full px-2 lg:px-3 py-1.5 lg:py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-xs lg:text-sm"
                  placeholder="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addCustomFont}
                  className="px-3 lg:px-4 py-1.5 lg:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs lg:text-sm font-medium transition-all"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setShowCustomFont(false)}
                  className="px-3 lg:px-4 py-1.5 lg:py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-xs lg:text-sm font-medium transition-all"
                >
                  Annuler
                </button>
              </div>
            </div>
            <div className="mt-2 lg:mt-3 p-2 lg:p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="text-yellow-400 text-xs lg:text-sm">
                💡 <strong>Comment trouver l'URL :</strong><br/>
                1. Allez sur <a href="https://fonts.google.com" target="_blank" className="underline">fonts.google.com</a><br/>
                2. Sélectionnez votre police<br/>
                3. Copiez le lien dans &lt;link&gt; ou @import
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
          {/* Fonts par défaut */}
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => updateConfig({ font: font.id as any })}
              className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border transition-all hover:scale-[1.02] text-left ${
                config.font === font.id
                  ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                  : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1 lg:mb-2">
                <div className="font-semibold text-sm lg:text-base">{font.name}</div>
                <div 
                  className="text-xs font-bold px-1.5 lg:px-2 py-0.5 lg:py-1 bg-gray-800/50 rounded border"
                  style={{ fontFamily: getFontFamilyFromId(font.id) }}
                >
                  {font.preview}
                </div>
              </div>
              <div className="text-xs lg:text-sm text-gray-400">{font.description}</div>
            </button>
          ))}
          
          {/* Fonts personnalisées */}
          {customFonts.map((font) => (
            <button
              key={font.id}
              onClick={() => updateConfig({ font: font.id as any })}
              className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border transition-all hover:scale-[1.02] text-left ${
                config.font === font.id
                  ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                  : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
              }`}
            >
              <div className="flex justify-between items-center mb-1 lg:mb-2">
                <span className="font-semibold text-sm lg:text-base">{font.name}</span>
                <div 
                  className="text-xs font-bold px-1.5 lg:px-2 py-0.5 lg:py-1 bg-gray-800/50 rounded border"
                  style={{ fontFamily: `"${font.name}", sans-serif` }}
                >
                  CUSTOM
                </div>
              </div>
              <div className="text-xs lg:text-sm text-gray-400">Police personnalisée</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdvancedConfigurator;