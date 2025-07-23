import React from 'react';
import { Heart } from 'lucide-react';
import CustomerReviews from '../CustomerReviews';

const CustomerReviewsBlock: React.FC = () => {
  return (
    <div className="neon-card p-6 border-2 border-red-500/30 hover:border-red-400/50 transition-all duration-300 shadow-lg shadow-red-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-500/20 p-3 rounded-xl border border-red-400/30 shadow-lg shadow-red-500/20">
          <Heart className="text-red-400 animate-pulse" size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-full animate-ping"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-red-400 neon-text">❤️ AVIS CLIENTS</h2>
          <p className="text-red-300 text-sm">Témoignages vérifiés</p>
        </div>
      </div>

      <CustomerReviews />
    </div>
  );
};

export default CustomerReviewsBlock;