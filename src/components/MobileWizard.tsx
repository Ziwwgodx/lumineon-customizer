import React from 'react';
import { Type, Palette, Zap, ShoppingCart, Sparkles, Settings, Eye, CreditCard } from 'lucide-react';
import { NeonConfig } from '../types';

interface MobileWizardProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  config: NeonConfig;
}

const MobileWizard: React.FC<MobileWizardProps> = ({ currentStep, onStepClick, config }) => {
  // Provide default config values to prevent undefined errors
  const safeConfig = {
    color: '#ff0080',
    font: 'tilt-neon',
    multiline: false,
    lines: ['NÉON'],
    text: 'NÉON',
    ...config
  };

  const steps = [
    { id: 1, icon: Type, label: '✏️ Votre Texte', emoji: '✏️', color: 'text-blue-400', bgColor: 'bg-blue-500', hoverColor: 'hover:bg-blue-600', shadowColor: 'shadow-blue-500/50', guide: 'Écrivez votre message' },
    { id: 2, icon: Palette, label: '🎨 Couleurs', emoji: '🎨', color: 'text-pink-400', bgColor: 'bg-pink-500', hoverColor: 'hover:bg-pink-600', shadowColor: 'shadow-pink-500/50', guide: 'Choisissez vos couleurs' },
    { id: 3, icon: Zap, label: '✨ Style', emoji: '✨', color: 'text-yellow-400', bgColor: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600', shadowColor: 'shadow-yellow-500/50', guide: 'Personnalisez le style' },
    { id: 4, icon: Settings, label: '🔧 Options', emoji: '🔧', color: 'text-cyan-400', bgColor: 'bg-cyan-500', hoverColor: 'hover:bg-cyan-600', shadowColor: 'shadow-cyan-500/50', guide: 'Ajustez les détails' },
    { id: 5, icon: ShoppingCart, label: '🛡️ Support', emoji: '🛡️', color: 'text-green-400', bgColor: 'bg-green-500', hoverColor: 'hover:bg-green-600', shadowColor: 'shadow-green-500/50', guide: 'Type de support' },
    { id: 6, icon: Eye, label: '💎 Finition', emoji: '💎', color: 'text-indigo-400', bgColor: 'bg-indigo-500', hoverColor: 'hover:bg-indigo-600', shadowColor: 'shadow-indigo-500/50', guide: 'Finitions premium' },
    { id: 7, icon: Sparkles, label: '📏 Taille', emoji: '📏', color: 'text-purple-400', bgColor: 'bg-purple-500', hoverColor: 'hover:bg-purple-600', shadowColor: 'shadow-purple-500/50', guide: 'Dimensions parfaites' },
    { id: 8, icon: CreditCard, label: '🛒 Commander', emoji: '🛒', color: 'text-orange-400', bgColor: 'bg-orange-500', hoverColor: 'hover:bg-orange-600', shadowColor: 'shadow-orange-500/50', guide: 'Finaliser la commande' }
  ];

  const getPreviewStyle = () => ({
    color: safeConfig.color,
    textShadow: `
      0 0 3px ${safeConfig.color},
      0 0 6px ${safeConfig.color},
      0 0 9px ${safeConfig.color}
    `,
    fontFamily: safeConfig.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
  });

  return (
    <div className="lg:hidden fixed left-2 top-4 bottom-4 z-30 w-14 flex flex-col">
      {/* Mini Preview */}
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/30 rounded-2xl p-2 mb-2 shadow-xl shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 group">
        <div className="text-xs text-purple-300 mb-1 text-center font-bold flex items-center justify-center gap-1">
          <span className="animate-pulse">👁️</span>
          <span>Live</span>
        </div>
        <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-700/50">
          <div className="absolute inset-0 bg-black/60"></div>
          {/* Effet de grille subtile */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '8px 8px'
          }}></div>
          <div 
            className="text-xs font-bold text-center relative z-10 animate-pulse group-hover:scale-110 transition-transform duration-300"
            style={getPreviewStyle()}
          >
            {safeConfig.multiline 
              ? safeConfig.lines.map((line, i) => (
                  <div key={i}>{line || 'LIGNE'}</div>
                ))
              : (safeConfig.text || 'NÉON')
            }
          </div>
          {/* Particules flottantes */}
          <div className="absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-purple-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        {/* Guide contextuel */}
        <div className="text-xs text-center text-purple-200/80 mt-1 font-medium">Aperçu temps réel</div>
      </div>

      {/* Wizard Steps */}
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-purple-400/30 rounded-2xl shadow-xl shadow-purple-500/30 p-1 flex-1 transform hover:scale-[1.01] transition-all duration-300 relative overflow-hidden">
        {/* Effet de brillance de fond */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 animate-pulse"></div>
        
        {/* Guide en haut */}
        <div className="text-xs text-center text-purple-300/90 font-bold mb-1 px-1 relative z-10">
          <span className="animate-bounce inline-block">🧭</span>
          <div className="text-xs text-purple-200/70 font-medium">Guide</div>
        </div>
        
        <div className="flex flex-col gap-1.5 h-full justify-center relative z-10">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative group flex items-center"
          >
            <button
              onClick={() => onStepClick(step.id)}
              className={`w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
                currentStep === step.id 
                  ? `${step.bgColor} ${step.shadowColor} shadow-lg scale-110 ring-2 ring-white/40 animate-pulse` 
                  : `bg-gray-800/60 ${step.hoverColor} hover:scale-125 hover:shadow-lg hover:${step.shadowColor} active:scale-95 hover:ring-2 hover:ring-white/20`
              }`}
              title={step.guide}
            >
              {/* Effet de brillance magique */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500"></div>
              
              {/* Emoji mignon */}
              <div className={`text-sm relative z-10 transition-all duration-300 ${
                currentStep === step.id ? 'animate-bounce' : 'group-hover:scale-125'
              }`}>
                {step.emoji}
              </div>
              
              {/* Indicateur de progression mignon */}
              {currentStep === step.id && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping shadow-sm" />
              )}
              
              {/* Indicateur complété mignon */}
              {currentStep > step.id && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  <div className="text-xs">✓</div>
                </div>
              )}
              
              {/* Numéro mignon */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white/90 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-3 h-3 flex items-center justify-center shadow-sm">
                {step.id}
              </div>
            </button>

            {/* Tooltip guide mignon */}
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-purple-400/30 group-hover:translate-x-1 min-w-max">
              <div className="font-bold text-purple-200">{step.label}</div>
              <div className="text-gray-300 text-xs mt-0.5">{step.guide}</div>
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-4 border-transparent border-r-gray-900/95" />
            </div>
          </div>
        ))}
        </div>
        
        {/* Barre de progression mignonne */}
        <div className="mt-2 bg-gray-800/60 rounded-full h-1.5 overflow-hidden shadow-inner relative z-10">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-pink-500 via-yellow-500 via-cyan-500 via-green-500 via-indigo-500 via-purple-500 to-orange-500 rounded-full transition-all duration-700 ease-out shadow-sm animate-pulse"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
        
        {/* Compteur mignon */}
        <div className="mt-1 text-center relative z-10">
          <span className="text-xs text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-full">
            {currentStep}/8 ✨
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileWizard;