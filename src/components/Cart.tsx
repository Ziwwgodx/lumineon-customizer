import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  totalPrice: number;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
  onCheckout
}) => {
  if (!isOpen) return null;

  const getNeonStyle = (color: string) => ({
    color,
    textShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
    filter: `drop-shadow(0 0 5px ${color})`
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-pink-400" size={24} />
            <h2 className="text-xl font-semibold text-white">
              Panier ({items.length} article{items.length > 1 ? 's' : ''})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 max-h-96">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400">Votre panier est vide</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-600"
                >
                  <div className="flex items-start gap-4">
                    {/* Preview */}
                    <div className="w-20 h-20 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-600">
                      <div
                        className="text-sm font-bold"
                        style={getNeonStyle(item.config.color)}
                      >
                        {item.config.multiline 
                          ? item.config.lines[0] 
                          : item.config.text.substring(0, 6)
                        }
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        Néon Personnalisé - {item.config.size}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        "{item.config.multiline ? item.config.lines.join(' / ') : item.config.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-white">
                          {item.price * item.quantity}€
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors ml-auto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-white">{totalPrice}€</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <CreditCard size={24} />
              Procéder au Paiement
            </button>
            <p className="text-center text-sm text-gray-400 mt-3">
              Livraison gratuite • Paiement sécurisé • Garantie 2 ans
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;