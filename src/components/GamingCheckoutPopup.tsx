import React, { useState, useEffect } from 'react';
import { X, CreditCard, Shield, Truck, Star, Crown, Zap, Timer, Apple, Chrome, Lock, CheckCircle } from 'lucide-react';
import { NeonConfig } from '../types';

interface GamingCheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  config: NeonConfig;
  price: number;
  onOrderComplete: (orderData: any) => void;
}

const GamingCheckoutPopup: React.FC<GamingCheckoutPopupProps> = ({
  isOpen,
  onClose,
  config,
  price,
  onOrderComplete
}) => {
  const [step, setStep] = useState(1);
  const [urgencyTimer, setUrgencyTimer] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Timer d'urgence (15 minutes)
      const endTime = new Date(Date.now() + 15 * 60 * 1000);
      setUrgencyTimer(endTime.getTime() - Date.now());
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleExpressPayment = (method: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderData = {
        id: `NEON-${Date.now()}`,
        config,
        price,
        customer: formData,
        paymentMethod: method,
        expressPayment: true
      };
      onOrderComplete(orderData);
      onClose();
      setIsProcessing(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const orderData = {
        id: `NEON-${Date.now()}`,
        config,
        price,
        customer: formData,
        paymentMethod: formData.paymentMethod
      };
      onOrderComplete(orderData);
      onClose();
      setIsProcessing(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gray-900 rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl border-4 border-gradient-rainbow">
        {/* Background animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-orange-900/30 animate-pulse"></div>
        
        {/* Header Gaming */}
        <div className="relative z-10 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 border-b-2 border-gradient-rainbow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 p-3 rounded-2xl border-2 border-yellow-400/50">
                <Crown className="text-yellow-400 animate-bounce" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  👑 CHECKOUT GAMING PREMIUM
                </h2>
                <p className="text-purple-300 text-lg">Finalisez votre commande néon</p>
              </div>
            </div>
            
            {/* Timer d'urgence */}
            <div className="flex items-center gap-4">
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-center">
                <Timer className="text-red-400 mx-auto mb-1 animate-pulse" size={20} />
                <div className="text-red-400 font-mono text-lg font-bold">{formatTime(urgencyTimer)}</div>
                <div className="text-red-300 text-xs">Prix spécial</div>
              </div>
              
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors hover:scale-110"
              >
                <X size={32} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Formulaire */}
          <div className="flex-1 p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Paiement Express Gaming */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="text-yellow-400 animate-bounce" />
                ⚡ PAIEMENT EXPRESS GAMING
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleExpressPayment('apple-pay')}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 disabled:opacity-50 shadow-xl"
                >
                  <Apple size={24} />
                  Apple Pay
                </button>
                
                <button
                  onClick={() => handleExpressPayment('google-pay')}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 disabled:opacity-50 shadow-xl"
                >
                  <Chrome size={24} />
                  Google Pay
                </button>
                
                <button
                  onClick={() => handleExpressPayment('paypal')}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 disabled:opacity-50 shadow-xl"
                >
                  PayPal
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gradient-rainbow"></div>
                </div>
                <div className="relative flex justify-center text-lg">
                  <span className="px-4 bg-gray-900 text-purple-400 font-bold">ou paiement classique</span>
                </div>
              </div>
            </div>

            {/* Formulaire classique */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-bold text-purple-400 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-4 bg-gray-800/80 border-2 border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-purple-400 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-4 bg-gray-800/80 border-2 border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-purple-400 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-4 bg-gray-800/80 border-2 border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-purple-400 mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-4 bg-gray-800/80 border-2 border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                  placeholder="123 rue de la Gaming"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-bold text-purple-400 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-4 bg-gray-800/80 border-2 border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                    placeholder="Paris"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-purple-400 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="w-full px-4 py-4 bg-gray-800/80 border-2 border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                    placeholder="75001"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white font-black py-6 px-8 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-4 shadow-2xl text-2xl disabled:opacity-50 relative overflow-hidden"
              >
                {isProcessing ? (
                  <>
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    TRAITEMENT EN COURS...
                  </>
                ) : (
                  <>
                    <CreditCard size={32} />
                    🚀 FINALISER - {price}€
                    <Crown size={32} className="animate-bounce" />
                  </>
                )}
                
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
            </form>
          </div>

          {/* Résumé Gaming */}
          <div className="lg:w-96 bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-l-2 border-gradient-rainbow p-6 space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Crown className="text-yellow-400" />
              RÉSUMÉ GAMING
            </h3>
            
            {/* Preview du néon */}
            <div className="bg-gray-900/80 rounded-2xl p-6 border-2 border-purple-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
              <div className="text-center relative z-10">
                <div 
                  className="text-3xl font-bold mb-2 animate-pulse"
                  style={{
                    color: config.color,
                    textShadow: `0 0 10px ${config.color}`,
                    fontFamily: config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
                  }}
                >
                  {config.multiline ? config.lines.join(' ') : config.text || 'MON NÉON'}
                </div>
                <div className="text-purple-300">
                  {config.size} • {config.font}
                </div>
              </div>
            </div>

            {/* Prix */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-gradient-rainbow">
              <div className="text-center">
                <div className="text-gray-400 mb-2">Prix Gaming Premium</div>
                <div className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {price}€
                </div>
                <div className="text-green-400 font-bold mt-2">TTC • Livraison incluse</div>
              </div>
            </div>

            {/* Badges de confiance */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-green-400">
                <Shield size={20} />
                <span className="font-bold">Paiement 100% sécurisé</span>
              </div>
              <div className="flex items-center gap-3 text-blue-400">
                <Truck size={20} />
                <span className="font-bold">Livraison gratuite</span>
              </div>
              <div className="flex items-center gap-3 text-yellow-400">
                <Star size={20} />
                <span className="font-bold">Garantie 2 ans</span>
              </div>
              <div className="flex items-center gap-3 text-purple-400">
                <Lock size={20} />
                <span className="font-bold">Données protégées</span>
              </div>
            </div>

            {/* Social proof */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5</span>
              </div>
              <p className="text-sm text-green-300">
                "Qualité gaming exceptionnelle ! Mon setup est maintenant parfait."
              </p>
              <p className="text-xs text-green-400 mt-1">- Alex G., gamer vérifié</p>
            </div>

            {/* Urgence */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
              <div className="text-red-400 font-bold mb-2">🔥 OFFRE LIMITÉE</div>
              <div className="text-white font-mono text-2xl mb-1">{formatTime(urgencyTimer)}</div>
              <div className="text-red-300 text-sm">Prix spécial expire bientôt !</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingCheckoutPopup;