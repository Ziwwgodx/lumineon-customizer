import React, { useState } from 'react';
import { X, Smartphone, Camera, Download, Share2, Eye, Zap } from 'lucide-react';
import { NeonConfig } from '../types';

interface ARPopupProps {
  isOpen: boolean;
  onClose: () => void;
  config: NeonConfig;
}

const ARPopup: React.FC<ARPopupProps> = ({ isOpen, onClose, config }) => {
  const [selectedMethod, setSelectedMethod] = useState<'mobile' | 'web' | null>(null);

  if (!isOpen) return null;

  const handleMobileAR = () => {
    const arUrl = `${window.location.href}?ar=true&config=${encodeURIComponent(JSON.stringify(config))}`;
    
    // Générer un QR code (simulation)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(arUrl)}`;
    
    // Ouvrir dans une nouvelle fenêtre avec le QR code
    const newWindow = window.open('', '_blank', 'width=400,height=600');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>Scanner pour AR</title></head>
          <body style="font-family: Arial; text-align: center; padding: 20px; background: #111827; color: white;">
            <h2 style="color: #ff0080;">📱 Réalité Augmentée</h2>
            <p>Scannez ce QR code avec votre téléphone :</p>
            <img src="${qrUrl}" alt="QR Code AR" style="margin: 20px; border-radius: 10px;" />
            <p style="font-size: 14px; color: #9ca3af;">Ou copiez ce lien :</p>
            <input type="text" value="${arUrl}" style="width: 90%; padding: 10px; margin: 10px; border-radius: 5px; border: none;" readonly />
          </body>
        </html>
      `);
    }
  };

  const handleWebAR = () => {
    const arUrl = `${window.location.href}?ar=true&config=${encodeURIComponent(JSON.stringify(config))}`;
    window.open(arUrl, '_blank', 'width=800,height=600');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 border-2 border-blue-400 rounded-lg opacity-60"></div>
                <div className="absolute inset-0 w-8 h-8 border-2 border-purple-400 rounded-lg transform rotate-12 opacity-40"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Réalité Augmentée</h2>
                <p className="text-sm text-gray-300">Visualisez votre néon chez vous</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Aperçu de votre néon :</div>
              <div 
                className="text-2xl font-bold"
                style={{
                  color: config.color,
                  textShadow: `0 0 10px ${config.color}, 0 0 20px ${config.color}`,
                  fontFamily: config.font === 'tilt-neon' ? '"Tilt Neon", cursive' : 'inherit'
                }}
              >
                {config.multiline ? config.lines.join(' ') : config.text || 'MON NÉON'}
              </div>
            </div>
          </div>

          {/* Methods */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Eye className="text-pink-400" size={20} />
              Choisissez votre méthode
            </h3>

            {/* Mobile AR */}
            <button
              onClick={handleMobileAR}
              className="w-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 border border-pink-500/50 hover:border-purple-500/50 text-white p-4 rounded-xl transition-all hover:scale-[1.02] flex items-center gap-4"
            >
              <div className="bg-pink-500/20 p-3 rounded-xl">
                <Smartphone size={24} className="text-pink-400" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">📱 Mobile AR</div>
                <div className="text-sm text-gray-300">Scanner avec votre téléphone</div>
              </div>
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                RECOMMANDÉ
              </div>
            </button>

            {/* Web AR */}
            <button
              onClick={handleWebAR}
              className="w-full bg-gradient-to-r from-blue-500/20 to-cyan-600/20 hover:from-blue-500/30 hover:to-cyan-600/30 border border-blue-500/50 hover:border-cyan-500/50 text-white p-4 rounded-xl transition-all hover:scale-[1.02] flex items-center gap-4"
            >
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Camera size={24} className="text-blue-400" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">💻 Web AR</div>
                <div className="text-sm text-gray-300">Ouvrir dans le navigateur</div>
              </div>
            </button>
          </div>

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Zap className="text-blue-400 mt-1" size={18} />
              <div>
                <div className="text-blue-400 font-medium text-sm">Technologie AR</div>
                <div className="text-blue-300 text-sm mt-1">
                  Placez virtuellement votre néon sur vos murs et voyez le rendu en temps réel !
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARPopup;