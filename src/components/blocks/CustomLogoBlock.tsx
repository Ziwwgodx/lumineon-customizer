import React, { useState } from 'react';
import { Upload, Sparkles, Zap, Crown } from 'lucide-react';
import CustomImageUpload from '../CustomImageUpload';

const CustomLogoBlock: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/custom-logo', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        alert('✨ Demande envoyée ! Notre équipe vous recontactera sous 24h avec un devis personnalisé.');
      } else {
        alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur de connexion. Veuillez réessayer.');
    }
  };

  return (
    <>
      <div className="neon-card p-6 border-2 border-purple-500/30 hover:border-pink-400/50 transition-all duration-300 shadow-lg shadow-purple-500/10 relative overflow-hidden">
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-pulse"></div>
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-400/30 shadow-lg shadow-purple-500/20">
            <Upload className="text-purple-400 animate-pulse" size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-ping"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-400 neon-text flex items-center gap-2">
              👑 LOGO PERSONNALISÉ
              <Crown className="text-yellow-400 animate-bounce" size={20} />
            </h2>
            <p className="text-purple-300 text-sm">Service premium sur-mesure</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="text-yellow-400 mt-1 animate-spin" size={18} />
              <div>
                <div className="text-purple-400 font-semibold text-sm">Service Premium Exclusif</div>
                <div className="text-purple-300 text-sm mt-1">
                  Transformez votre logo en néon personnalisé ! Notre équipe design crée un rendu 3D unique basé sur votre image.
                </div>
              </div>
            </div>
          </div>

          {/* Badges qualité */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2">
              <div className="text-green-400 font-bold">⚡ 24h</div>
              <div className="text-green-300">Réponse</div>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-2">
              <div className="text-blue-400 font-bold">🎨 3D</div>
              <div className="text-blue-300">Aperçu</div>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2">
              <div className="text-yellow-400 font-bold">👑 Pro</div>
              <div className="text-yellow-300">Qualité</div>
            </div>
          </div>

          <button
            onClick={() => setShowUpload(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl relative overflow-hidden"
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            
            <Upload size={24} />
            <span>🚀 Demander un Devis Gratuit</span>
            <Zap className="animate-bounce" size={20} />
          </button>
        </div>
      </div>

      <CustomImageUpload
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default CustomLogoBlock;