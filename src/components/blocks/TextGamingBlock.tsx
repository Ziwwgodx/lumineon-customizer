import React from 'react';
import { Type, Zap } from 'lucide-react';
import { NeonConfig } from '../../types';
import MobileOptimizedInput from '../MobileOptimizedInput';

interface TextGamingBlockProps {
  config: NeonConfig;
  updateConfig: (updates: Partial<NeonConfig>) => void;
}

const TextGamingBlock: React.FC<TextGamingBlockProps> = ({ config, updateConfig }) => {
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

  return (
    <div className="neon-card p-6 border-2 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-lg shadow-cyan-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-500/20 p-3 rounded-xl border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
          <Type className="text-cyan-400 animate-pulse" size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-ping"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 neon-text">⚡ TEXTE GAMING</h2>
          <p className="text-cyan-300 text-sm">Configurez votre message néon</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Message principal */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
            <label className="text-pink-400 font-bold text-lg neon-text">VOTRE MESSAGE</label>
          </div>
          
          {!config.multiline ? (
            <MobileOptimizedInput
              value={config.text}
              onChange={(value) => updateConfig({ text: value })}
              placeholder="MON NÉON"
              maxLength={30}
            />
          ) : (
            <div className="space-y-3">
              {config.lines.map((line, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => updateLine(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    placeholder={`Ligne ${index + 1}`}
                    maxLength={20}
                  />
                  {config.lines.length > 1 && (
                    <button
                      onClick={() => removeLine(index)}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg transition-all hover:scale-105"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              
              {config.lines.length < 4 && (
                <button
                  onClick={addLine}
                  className="w-full py-3 border-2 border-dashed border-cyan-500/50 hover:border-cyan-400 text-cyan-400 rounded-xl transition-all hover:bg-cyan-500/10"
                >
                  + Ajouter une ligne
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mode multiligne */}
        <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-600">
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-400" size={20} />
            <span className="text-white font-medium">Mode Multi-lignes</span>
          </div>
          <button
            onClick={handleMultilineToggle}
            className={`relative w-12 h-6 rounded-full transition-all ${
              config.multiline ? 'bg-cyan-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                config.multiline ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Suggestions populaires */}
        <div>
          <div className="text-sm text-gray-300 mb-3">Suggestions populaires</div>
          <div className="grid grid-cols-3 gap-2">
            {['LOVE', 'OPEN', 'CAFÉ', 'BAR', 'PIZZA', 'SHOP', 'MUSIC', 'BEER', 'HOTEL'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => updateConfig({ text: suggestion })}
                className="px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 hover:border-cyan-500/50 text-white rounded-lg transition-all hover:scale-105 text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextGamingBlock;