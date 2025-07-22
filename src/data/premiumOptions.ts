import { PremiumOption } from '../types';

export const premiumOptions: PremiumOption[] = [
  {
    id: 'waterproof',
    name: 'Boîtier Étanche IP67',
    description: 'Protection maximale pour usage extérieur',
    price: 25,
    icon: 'shield'
  },
  {
    id: 'remote',
    name: 'Télécommande RGB',
    description: 'Contrôle des couleurs et effets à distance',
    price: 35,
    icon: 'remote-control'
  },
  {
    id: 'timer',
    name: 'Minuteur Programmable',
    description: 'Allumage/extinction automatique',
    price: 20,
    icon: 'clock'
  },
  {
    id: 'installation',
    name: 'Installation Professionnelle',
    description: 'Pose par nos experts (Paris & région)',
    price: 80,
    icon: 'wrench'
  },
  {
    id: 'express',
    name: 'Livraison Express 24h',
    description: 'Réception sous 24h (jours ouvrés)',
    price: 15,
    icon: 'truck'
  }
];