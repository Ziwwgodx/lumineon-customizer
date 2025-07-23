import React, { useState, useEffect } from 'react';
import { ShoppingCart, Zap, Crown, Star, Flame, Rocket, Trophy, Target, Timer, Shield } from 'lucide-react';
import { NeonConfig } from '../../types';

interface GamingCheckoutStepProps {
  config: NeonConfig;
  price: number;
  onCheckout: () => void;
}

const GamingCheckoutStep: React.FC<GamingCheckoutStepProps> = ({ config, price, onCheckout }) => {
  const [urgencyTimer, setUrgencyTimer] = useState(0);
  const [stockLevel] = useState(Math.floor(Math.random() * 5) + 3); // 3-7 en stock
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    // Timer d'urgence (2 heures)
    const now = new Date();
    const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const timeLeft = endTime.getTime() - now.getTime();
    setUrgencyTimer(timeLeft);

    // Animation de pulse périodique
    const pulseInterval = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 2000);
    }, 8000);

    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Urgence & Scarcité */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Timer d'urgence */}
        <div className="neon-card p-4 border-2 border-red-500/40 hover:border-red-400/60 transition-all duration-300 shadow-lg shadow-red-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 animate-pulse"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-red-500/30 p-2 rounded-xl">
              <Timer className="text-red-400 animate-pulse" size={20} />
            </div>
            <div>
              <div className="text-red-400 font-bold text-sm">🔥 OFFRE LIMITÉE</div>
              <div className="text-white font-mono text-lg">{formatTime(urgencyTimer)}</div>
              <div className="text-red-300 text-xs">Prix spécial expire bientôt !</div>
            </div>
          </div>
        </div>

        {/* Stock limité */}
        <div className="neon-card p-4 border-2 border-orange-500/40 hover:border-orange-400/60 transition-all duration-300 shadow-lg shadow-orange-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 animate-pulse"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-orange-500/30 p-2 rounded-xl">
              <Target className="text-orange-400 animate-bounce" size={20} />
            </div>
            <div>
              <div className="text-orange-400 font-bold text-sm">⚡ STOCK LIMITÉ</div>
              <div className="text-white font-bold text-lg">Plus que {stockLevel} disponibles</div>
              <div className="text-orange-300 text-xs">Forte demande sur ce modèle !</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bloc principal de finalisation */}
      <div className={`neon-card p-8 border-4 transition-all duration-500 shadow-2xl relative overflow-hidden ${
        showPulse 
          ? 'border-gradient-rainbow shadow-rainbow-500/30 scale-[1.02]' 
          : 'border-gradient-to-r from-purple-500/50 via-pink-500/50 to-orange-500/50 shadow-purple-500/20'
      }`}>
        {/* Background animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-pulse"></div>
        
        {/* Header premium */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative bg-gradient-to-r from-purple-500/30 to-pink-500/30 p-4 rounded-2xl border-2 border-gradient-rainbow shadow-xl">
              <Crown className="text-yellow-400 animate-bounce" size={40} />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
                👑 FINALISER VOTRE NÉON GAMING
              </h2>
              <p className="text-xl text-purple-300 font-semibold">Votre chef-d'œuvre néon vous attend !</p>
            </div>
          </div>
          
          {/* Badge premium */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-6 py-3 rounded-full font-black text-lg shadow-xl animate-bounce">
            ⭐ PREMIUM
          </div>
        </div>

        {/* Preview du néon */}
        <div className="bg-gray-900/80 rounded-2xl p-8 mb-8 border-2 border-purple-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
          <div className="text-center relative z-10">
            <div className="text-sm text-purple-300 mb-4 flex items-center justify-center gap-2">
              <Star className="animate-spin" size={16} />
              VOTRE CRÉATION GAMING
              <Star className="animate-spin" size={16} />
            </div>
            <div 
              className="text-6xl font-bold mb-4 animate-pulse"
              style={{
                color: config.color,
                textShadow: `
                  0 0 5px ${config.color},
                  0 0 10px ${config.color},
                  0 0 20px ${config.color},
                  0 0 40px ${config.color}
                `,
                fontFamily: config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
              }}
            >
              {config.multiline ? config.lines.join(' ') : config.text || 'MON NÉON'}
            </div>
            <div className="text-purple-300 text-lg">
              {config.size} • {config.font} • {config.effect}
            </div>
          </div>
        </div>

        {/* Specs gaming */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-xl p-4 text-center">
            <Shield className="mx-auto text-green-400 mb-2 animate-pulse" size={24} />
            <div className="text-green-400 font-bold text-sm">QUALITÉ PRO</div>
            <div className="text-green-300 text-xs">LED Premium</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/40 rounded-xl p-4 text-center">
            <Zap className="mx-auto text-blue-400 mb-2 animate-bounce" size={24} />
            <div className="text-blue-400 font-bold text-sm">ULTRA RAPIDE</div>
            <div className="text-blue-300 text-xs">7-10 jours</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-xl p-4 text-center">
            <Trophy className="mx-auto text-purple-400 mb-2 animate-pulse" size={24} />
            <div className="text-purple-400 font-bold text-sm">GARANTIE</div>
            <div className="text-purple-300 text-xs">2 ans</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/40 rounded-xl p-4 text-center">
            <Flame className="mx-auto text-orange-400 mb-2 animate-bounce" size={24} />
            <div className="text-orange-400 font-bold text-sm">GAMING</div>
            <div className="text-orange-300 text-xs">Style Pro</div>
          </div>
        </div>

        {/* Prix avec effet wow */}
        <div className="text-center mb-8 relative z-10">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-gradient-rainbow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 animate-pulse"></div>
            <div className="relative z-10">
              <div className="text-gray-400 text-lg mb-2">Prix Gaming Premium</div>
              <div className="text-7xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse mb-2">
                {price}€
              </div>
              <div className="text-green-400 font-bold text-xl">✅ TTC • Livraison GRATUITE • Garantie 2 ans</div>
            </div>
          </div>
        </div>

        {/* CTA MEGA BUTTON */}
        <button
          onClick={onCheckout}
          className={`w-full relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
            showPulse ? 'animate-pulse scale-[1.05]' : ''
          }`}
        >
          {/* Background gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700"></div>
          
          {/* Contenu du bouton */}
          <div className="relative z-10 flex items-center justify-center gap-4 py-8 px-8">
            <Rocket className="text-white animate-bounce" size={32} />
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">
                🚀 COMMANDER MON NÉON GAMING
              </div>
              <div className="text-yellow-300 font-bold text-lg">
                ⚡ Paiement sécurisé • Livraison express disponible
              </div>
            </div>
            <Crown className="text-yellow-400 animate-spin" size={32} />
          </div>
          
          {/* Effet de lueur */}
          <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/50 transition-all duration-300"></div>
        </button>

        {/* Social proof */}
        <div className="mt-6 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-current animate-pulse" size={20} style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <div className="text-white font-semibold">
            🎮 <span className="text-green-400">2,847 gamers</span> ont déjà commandé leur néon !
          </div>
          <div className="text-gray-400 text-sm mt-1">
            ⭐ Note moyenne: 4.9/5 • 🚀 Livraison dans toute la France
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingCheckoutStep;