import React, { useState, useEffect } from 'react';
import { Clock, Zap, Gift } from 'lucide-react';

const FlashPromo: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60 * 1000); // 15 minutes en ms
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          // Redémarre le timer quand il arrive à 0
          return 15 * 60 * 1000;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white p-2 text-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      
      <div className="relative z-10 flex items-center justify-center gap-2 text-sm font-bold">
        <Zap className="animate-bounce" size={16} />
        <span>PROMO FLASH</span>
        <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-full">
          <Clock size={14} />
          <span className="font-mono">{formatTime(timeLeft)}</span>
        </div>
        <Gift className="animate-bounce" size={16} />
        <span>-15% CODE: FLASH15</span>
        
        <button
          onClick={() => setIsVisible(false)}
          className="ml-2 text-white/80 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default FlashPromo;