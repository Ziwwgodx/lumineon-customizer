import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Shield, Clock, Truck, Star, Apple, Chrome } from 'lucide-react';
import { CartItem } from '../types';

interface OnePageCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  onOrderComplete: (orderData: any) => void;
}

const OnePageCheckout: React.FC<OnePageCheckoutProps> = ({
  isOpen,
  onClose,
  items,
  totalPrice,
  onOrderComplete
}) => {
  const [step, setStep] = useState(1);
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
  const [urgencyTimer, setUrgencyTimer] = useState(0);
  const [stockLevel] = useState(Math.floor(Math.random() * 8) + 3); // 3-10 en stock

  useEffect(() => {
    // Timer pour l'urgence de livraison
    const now = new Date();
    const cutoffTime = new Date();
    cutoffTime.setHours(16, 0, 0, 0);
    
    if (now < cutoffTime) {
      const timeLeft = cutoffTime.getTime() - now.getTime();
      setUrgencyTimer(timeLeft);
    }
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
    return `${hours}h ${minutes}min`;
  };

  const handleExpressPayment = (method: string) => {
    // Simulation paiement express
    const orderData = {
      id: `ORDER-${Date.now()}`,
      items,
      total: totalPrice,
      customer: formData,
      paymentMethod: method,
      expressPayment: true
    };
    
    setTimeout(() => {
      onOrderComplete(orderData);
      onClose();
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      id: `ORDER-${Date.now()}`,
      items,
      total: totalPrice,
      customer: formData,
      paymentMethod: formData.paymentMethod
    };
    
    onOrderComplete(orderData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800/50 to-purple-900/20">
          <div>
            <h2 className="text-2xl font-bold text-white">Finaliser la commande</h2>
            <p className="text-gray-300">Paiement sécurisé en une étape</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Formulaire */}
          <div className="flex-1 p-6 space-y-6 bg-gray-900">
            {/* Urgence/Scarcité */}
            <div className="space-y-3">
              {urgencyTimer > 0 && (
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="text-orange-400" size={20} />
                    <div>
                      <div className="font-semibold text-orange-300">
                        ⚡ Livraison express disponible
                      </div>
                      <div className="text-sm text-orange-400">
                        Commandez dans les {formatTime(urgencyTimer)} pour une livraison demain !
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-semibold text-green-300">
                      🔥 Plus que {stockLevel} en stock
                    </div>
                    <div className="text-sm text-green-400">
                      Forte demande sur ce produit - Commandez maintenant !
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Paiement Express */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Paiement Express</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleExpressPayment('apple-pay')}
                  className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105"
                >
                  <Apple size={20} />
                  Apple Pay
                </button>
                <button
                  onClick={() => handleExpressPayment('google-pay')}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105"
                >
                  <Chrome size={20} />
                  Google Pay
                </button>
                <button
                  onClick={() => handleExpressPayment('paypal')}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105"
                >
                  PayPal
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">ou paiement classique</span>
                </div>
              </div>
            </div>

            {/* Formulaire classique */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="123 rue de la Paix"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Paris"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="75001"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-5 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <CreditCard size={24} />
                Finaliser la commande - {totalPrice}€
              </button>
            </form>
          </div>

          {/* Résumé commande */}
          <div className="lg:w-96 bg-gray-800/50 backdrop-blur-sm border-l border-gray-700 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Résumé de commande</h3>
            
            {/* Articles */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                  <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
                    <div
                      className="text-xs font-bold"
                      style={{
                        color: item.config.color,
                        textShadow: `0 0 5px ${item.config.color}`
                      }}
                    >
                      {item.config.text.substring(0, 4)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">
                      Néon {item.config.size}
                    </h4>
                    <p className="text-sm text-gray-300">
                      "{item.config.text}"
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {item.price}€ × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between items-center text-xl font-bold text-white">
                <span>Total</span>
                <span>{totalPrice}€</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">TTC, livraison incluse</p>
            </div>

            {/* Badges de confiance */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Shield className="text-green-500" size={16} />
                <span>Paiement 100% sécurisé</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Truck className="text-blue-500" size={16} />
                <span>Livraison gratuite</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Star className="text-yellow-500" size={16} />
                <span>Garantie 2 ans</span>
              </div>
            </div>

            {/* Avis clients */}
            <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <span className="font-semibold text-white">4.9/5</span>
              </div>
              <p className="text-sm text-gray-300">
                "Qualité exceptionnelle ! Livraison rapide et installation facile."
              </p>
              <p className="text-xs text-gray-400 mt-1">- Marie D., client vérifié</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePageCheckout;