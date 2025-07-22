import React, { useState } from 'react';
import { Upload, X, Mail, Phone, User, MessageSquare } from 'lucide-react';

interface CustomImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const CustomImageUpload: React.FC<CustomImageUploadProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    imageFile: null as File | null
  });
  const [dragOver, setDragOver] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
      setFormData(prev => ({ ...prev, imageFile: file }));
    } else {
      alert('Le fichier doit faire moins de 2MB');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.imageFile) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Upload className="text-blue-400" size={24} />
            <h2 className="text-xl font-semibold text-white">Logo Personnalisé</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Votre Logo *
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragOver
                  ? 'border-blue-400 bg-blue-400/10'
                  : formData.imageFile
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              } relative`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
            >
              {formData.imageFile ? (
                <div className="space-y-2">
                  <div className="text-green-400 font-medium">{formData.imageFile.name}</div>
                  <div className="text-sm text-gray-400">
                    {(formData.imageFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageFile: null }))}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="mx-auto text-gray-400" size={48} />
                  <div>
                    <div className="text-white font-medium">Glissez votre logo ici</div>
                    <div className="text-sm text-gray-400">ou cliquez pour parcourir</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    PNG, JPG, SVG • Max 2MB
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-4 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Nom complet *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 relative z-20 pointer-events-auto"
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 relative z-20 pointer-events-auto"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Téléphone (optionnel)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 relative z-20 pointer-events-auto"
              placeholder="06 12 34 56 78"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MessageSquare className="inline w-4 h-4 mr-1" />
              Message (optionnel)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none relative z-20 pointer-events-auto"
              placeholder="Décrivez votre projet, vos besoins spécifiques..."
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-400 mt-1">ℹ️</div>
              <div>
                <div className="text-blue-400 font-medium text-sm">Service Premium</div>
                <div className="text-blue-300 text-sm mt-1">
                  Notre équipe design analysera votre logo et vous recontactera sous 24h 
                  avec un devis personnalisé et un aperçu 3D de votre néon.
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 relative z-30 pointer-events-auto"
            disabled={!formData.name || !formData.email || !formData.imageFile}
          >
            <Upload size={24} />
            {(!formData.name || !formData.email || !formData.imageFile) ? 'Remplissez tous les champs' : 'Envoyer ma Demande'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomImageUpload;