import React from 'react';
import { Star, Shield, Heart } from 'lucide-react';
import { getRandomizedReviews } from '../data/reviews';

const CustomerReviews: React.FC = () => {
  const customerReviews = getRandomizedReviews(8);
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="text-red-400" size={24} />
        <h3 className="text-xl font-semibold text-white">Avis Clients Vérifiés</h3>
        <div className="flex items-center gap-1 ml-auto">
          <div className="flex">{renderStars(5)}</div>
          <span className="text-white font-semibold ml-2">4.8/5</span>
          <span className="text-gray-400 text-sm ml-1">(3,247 avis)</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-700">
        {customerReviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-900/50 rounded-xl p-4 border border-gray-600 hover:border-gray-500 transition-all"
          >
            <div className="flex items-start gap-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  {review.verified && (
                    <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      <Shield size={12} />
                      Vérifié
                    </div>
                  )}
                  <div className="flex ml-auto">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{review.comment}</p>
                <p className="text-gray-500 text-xs">{formatDate(review.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-gray-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">3,247</div>
            <div className="text-sm text-gray-400">Avis Positifs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">96%</div>
            <div className="text-sm text-gray-400">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">24-48h</div>
            <div className="text-sm text-gray-400">Livraison</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">2 ans</div>
            <div className="text-sm text-gray-400">Garantie</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;