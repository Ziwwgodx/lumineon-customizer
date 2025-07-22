import React, { useState } from 'react';
import { Upload, X, Image, Palette } from 'lucide-react';

interface BackgroundUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBackground: (background: string) => void;
}

const BackgroundUpload: React.FC<BackgroundUploadProps> = ({
  isOpen,
  onClose,
  onSelectBackground
}) => {
  const [dragOver, setDragOver] = useState(false);

  if (!isOpen) return null;

  // Couleurs de fond basées sur l'image fournie
  const backgroundColors = [
    { name: 'White', color: '#ffffff', textColor: '#000000' },
    { name: 'Warm White', color: '#fff8dc', textColor: '#000000' },
    { name: 'Turquoise', color: '#40e0d0', textColor: '#000000' },
    { name: 'Ice Blue', color: '#87ceeb', textColor: '#000000' },
    { name: 'Blue', color: '#0066ff', textColor: '#ffffff' },
    { name: 'Deep Blue', color: '#003366', textColor: '#ffffff' },
    { name: 'Lemon Yellow', color: '#fff700', textColor: '#000000' },
    { name: 'Golden Yellow', color: '#ffd700', textColor: '#000000' },
    { name: 'Yellow', color: '#ffff00', textColor: '#000000' },
    { name: 'Orange', color: '#ff8c00', textColor: '#000000' },
    { name: 'Tomato', color: '#ff6347', textColor: '#000000' },
    { name: 'Light Pink', color: '#ffb6c1', textColor: '#000000' },
    { name: 'Hot Pink', color: '#ff1493', textColor: '#ffffff' },
    { name: 'Purple', color: '#8a2be2', textColor: '#ffffff' },
    { name: 'Light Purple', color: '#dda0dd', textColor: '#000000' },
    { name: 'Red', color: '#ff0000', textColor: '#ffffff' },
    { name: 'Deep Green', color: '#006400', textColor: '#ffffff' },
    { name: 'Green', color: '#32cd32', textColor: '#000000' }
  ];

  // Fonds d'écran prédéfinis
  const presetBackgrounds = [
    { name: 'Salon Moderne', url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Café Cosy', url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Boutique Chic', url: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Restaurant', url: 'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Chambre', url: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Bureau', url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Bar Lounge', url: 'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Terrasse', url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ];

  const handleFileChange = (file: File) => {
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onSelectBackground(e.target.result as string);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Le fichier doit faire moins de 5MB');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Image className="text-blue-400" size={24} />
            <h2 className="text-xl font-semibold text-white">Fonds d'Écran Personnalisés</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Upload Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Upload size={20} />
              Importer Votre Image
            </h3>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragOver
                  ? 'border-blue-400 bg-blue-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              } relative`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
            >
              <div className="space-y-3">
                <Upload className="mx-auto text-gray-400" size={48} />
                <div>
                  <div className="text-white font-medium">Glissez votre image ici</div>
                  <div className="text-sm text-gray-400">ou cliquez pour parcourir</div>
                </div>
                <div className="text-xs text-gray-500">
                  JPG, PNG • Max 5MB • Recommandé: 1920x1080px
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Preset Backgrounds */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Image size={20} />
              Environnements Prédéfinis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {presetBackgrounds.map((bg) => (
                <button
                  key={bg.name}
                  onClick={() => {
                    onSelectBackground(bg.url);
                    onClose();
                  }}
                  className="group relative aspect-video rounded-xl overflow-hidden border-2 border-gray-600 hover:border-white transition-all hover:scale-105"
                >
                  <img
                    src={bg.url}
                    alt={bg.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-white font-semibold text-sm bg-black/50 rounded px-2 py-1 backdrop-blur-sm">
                      {bg.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-400 mt-1">💡</div>
              <div>
                <div className="text-blue-400 font-medium text-sm">Conseils pour de meilleurs résultats</div>
                <div className="text-blue-300 text-sm mt-1 space-y-1">
                  <div>• Utilisez des images haute résolution (1920x1080px minimum)</div>
                  <div>• Privilégiez des fonds sombres pour faire ressortir les néons</div>
                  <div>• Évitez les images trop chargées qui peuvent distraire</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundUpload;