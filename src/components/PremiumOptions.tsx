import React, { useState } from 'react';
import { Shield, Smartphone, Clock, Wrench, Truck, Plus, Minus } from 'lucide-react';
import { PremiumOption } from '../types';
import { premiumOptions } from '../data/premiumOptions';

interface PremiumOptionsProps {
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
}

const PremiumOptions: React.FC<PremiumOptionsProps> = ({ selectedOptions, onToggleOption }) => {
  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    const icons = {
      shield: Shield,
      'remote-control': Smartphone,
      clock: Clock,
      wrench: Wrench,
      truck: Truck
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Shield;
    return <IconComponent size={24} />;
  };

  const getTotalPrice = () => {
    return premiumOptions
      .filter(option => selectedOptions.includes(option.id))
      .reduce((total, option) => total + option.price, 0);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center gap-3">
          <Shield className="text-emerald-400" size={20} />
          <h3 className="text-lg lg:text-xl font-semibold text-white">Options Premium</h3>
        </div>
        {getTotalPrice() > 0 && (
          <div className="bg-emerald-500/20 text-emerald-400 px-2 lg:px-4 py-1 lg:py-2 rounded-full font-semibold text-sm lg:text-base">
            +{getTotalPrice()}€
          </div>
        )}
      </div>

      <div className="space-y-2 lg:space-y-3">
        {premiumOptions.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          const isExpanded = expandedOption === option.id;

          return (
            <div
              key={option.id}
              className={`border rounded-lg lg:rounded-xl transition-all ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-400/10'
                  : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
              }`}
            >
              <div
                className="p-3 lg:p-4 cursor-pointer"
                onClick={() => setExpandedOption(isExpanded ? null : option.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${isSelected ? 'text-emerald-400' : 'text-gray-400'}`}>
                      {getIcon(option.icon)}
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm lg:text-base ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                        {option.name}
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-400">{option.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-sm lg:text-base ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                      +{option.price}€
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleOption(option.id);
                      }}
                      className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-400 text-white'
                          : 'border-gray-500 hover:border-emerald-400'
                      }`}
                    >
                      {isSelected ? <Minus size={12} /> : <Plus size={12} />}
                    </button>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3 lg:px-4 pb-3 lg:pb-4 border-t border-gray-600">
                  <div className="pt-3 lg:pt-4 text-xs lg:text-sm text-gray-300">
                    {option.id === 'waterproof' && (
                      <div className="space-y-1 lg:space-y-2">
                        <p>• Résistance à l'eau et à la poussière</p>
                        <p>• Parfait pour terrasses et jardins</p>
                        <p>• Garantie étanchéité 5 ans</p>
                      </div>
                    )}
                    {option.id === 'remote' && (
                      <div className="space-y-1 lg:space-y-2">
                        <p>• Contrôle de 16 millions de couleurs</p>
                        <p>• Réglage de la luminosité</p>
                        <p>• Portée jusqu'à 10 mètres</p>
                      </div>
                    )}
                    {option.id === 'timer' && (
                      <div className="space-y-1 lg:space-y-2">
                        <p>• Programmation 7 jours</p>
                        <p>• Économie d'énergie automatique</p>
                        <p>• Application mobile incluse</p>
                      </div>
                    )}
                    {option.id === 'installation' && (
                      <div className="space-y-1 lg:space-y-2">
                        <p>• Technicien certifié à domicile</p>
                        <p>• Fixation sécurisée incluse</p>
                        <p>• Garantie installation 2 ans</p>
                      </div>
                    )}
                    {option.id === 'express' && (
                      <div className="space-y-1 lg:space-y-2">
                        <p>• Expédition le jour même</p>
                        <p>• Suivi en temps réel</p>
                        <p>• Livraison garantie ou remboursé</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumOptions;