import React, { useState, useEffect } from 'react';
import { Star, Shield, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { getRandomizedReviews, getAverageRating, getTotalReviews } from '../data/reviews';
import { CustomerReview } from '../types';

const CustomerReviews: React.FC = () => {
  const [displayedReviews, setDisplayedReviews] = useState<CustomerReview[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Randomiser les avis à chaque chargement
    const randomReviews = getRandomizedReviews(showAll ? 40 : 4);
    setDisplayedReviews(randomReviews);
  }, [showAll]);

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

  const averageRating = getAverageRating();
  const totalReviews = getTotalReviews();

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-4 lg:mb-6">
        <Heart className="text-red-400" size={20} />
        <h3 className="text-lg lg:text-xl font-semibold text-white">Avis Clients Vérifiés</h3>
        <div className="flex items-center gap-1 ml-auto">
          <div className="flex">{renderStars(5)}</div>
          <span className="text-white font-semibold ml-1 lg:ml-2 text-sm lg:text-base">{averageRating}/5</span>
          <span className="text-gray-400 text-xs lg:text-sm ml-1">({totalReviews} avis)</span>
        </div>
      </div>

      <div className={`space-y-3 lg:space-y-4 transition-all duration-500 ${
        isExpanded ? 'max-h-[600px] overflow-y-auto' : 'max-h-none'
      }`}>
        {displayedReviews.map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="bg-gray-900/50 rounded-lg lg:rounded-xl p-3 lg:p-4 border border-gray-600 hover:border-gray-500 transition-all animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3 lg:gap-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 lg:mb-2 flex-wrap">
                  <h4 className="font-semibold text-white text-sm lg:text-base">{review.name}</h4>
                  {review.verified && (
                    <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-xs flex-shrink-0">
                      <Shield size={10} />
                      Vérifié
                    </div>
                  )}
                  <div className="flex ml-auto flex-shrink-0">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-300 text-xs lg:text-sm mb-1 lg:mb-2 leading-relaxed">{review.comment}</p>
                <p className="text-gray-500 text-xs">{formatDate(review.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton Voir plus/moins */}
      <div className="mt-4 lg:mt-6 text-center">
        <button
          onClick={toggleShowAll}
          className="flex items-center gap-2 mx-auto px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/50 hover:border-purple-500/50 text-white rounded-lg lg:rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl text-xs lg:text-sm font-medium"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              Voir moins
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Voir plus d'avis (40 sélectionnés)
            </>
          )}
        </button>
      </div>

      {/* Trust Badges */}
      <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-600">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 text-center text-xs lg:text-sm">
          <div className="text-center">
            <div className="text-lg lg:text-xl font-bold text-green-400">1247</div>
            <div className="text-xs text-gray-400">Avis Clients</div>
          </div>
          <div className="text-center">
            <div className="text-lg lg:text-xl font-bold text-blue-400">98%</div>
            <div className="text-xs text-gray-400">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-lg lg:text-xl font-bold text-purple-400">7-10j</div>
            <div className="text-xs text-gray-400">Production</div>
          </div>
          <div className="text-center">
            <div className="text-lg lg:text-xl font-bold text-yellow-400">2 ans</div>
            <div className="text-xs text-gray-400">Garantie</div>
          </div>
        </div>
      </div>

      {/* Indicateur de randomisation */}
      <div className="mt-3 lg:mt-4 text-center">
        <button
          onClick={() => {
            const randomReviews = getRandomizedReviews(showAll ? 40 : 4);
            setDisplayedReviews(randomReviews);
          }}
          className="text-xs text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1 mx-auto lg:text-sm"
        >
          🔄 Voir d'autres avis ({totalReviews - 40} autres disponibles)
        </button>
      </div>
    </div>
  );
};

export default CustomerReviews;