import { NeonTemplate } from '../types';

export const neonTemplates: NeonTemplate[] = [
  {
    id: 'love',
    name: 'Love',
    category: 'Romantique',
    config: {
      text: 'LOVE',
      color: '#ff0080',
      gradientColors: ['#ff0080', '#ff69b4'],
      useGradient: false,
      font: 'script',
      size: '50cm',
      effect: 'pulse',
      multiline: false,
      lines: ['LOVE'],
      border: false,
      borderColor: '#ffffff',
      premium: false,
      shape: 'text',
      haloIntensity: 15,
      glowRadius: 8
    },
    image: 'https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=400',
    popular: true
  },
  {
    id: 'open',
    name: 'OPEN',
    category: 'Business',
    config: {
      text: 'OPEN',
      color: '#00ff41',
      gradientColors: ['#00ff41', '#32cd32'],
      useGradient: false,
      font: 'industrial',
      size: '100cm',
      effect: 'blink',
      multiline: false,
      lines: ['OPEN'],
      border: true,
      borderColor: '#ffffff',
      premium: false,
      shape: 'text',
      haloIntensity: 12,
      glowRadius: 6
    },
    image: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=400',
    popular: true
  },
  {
    id: 'cafe',
    name: 'CAFÉ',
    category: 'Restaurant',
    config: {
      text: 'CAFÉ',
      color: '#ffff00',
      gradientColors: ['#ffff00', '#ffd700'],
      useGradient: false,
      font: 'modern',
      size: '100cm',
      effect: 'static',
      multiline: false,
      lines: ['CAFÉ'],
      border: false,
      borderColor: '#ffffff',
      premium: true,
      shape: 'text',
      haloIntensity: 18,
      glowRadius: 10
    },
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    popular: false
  },
  {
    id: 'dream',
    name: 'DREAM BIG',
    category: 'Inspirant',
    config: {
      text: 'DREAM\nBIG',
      color: '#8B5CF6',
      gradientColors: ['#8B5CF6', '#ec4899'],
      useGradient: true,
      font: 'script',
      size: '50cm',
      effect: 'gradient',
      multiline: true,
      lines: ['DREAM', 'BIG'],
      border: false,
      borderColor: '#ffffff',
      premium: true,
      shape: 'text',
      haloIntensity: 20,
      glowRadius: 12
    },
    image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400',
    popular: true
  },
  {
    id: 'bar',
    name: 'BAR',
    category: 'Business',
    config: {
      text: 'BAR',
      color: '#ff4500',
      gradientColors: ['#ff4500', '#ff6b35'],
      useGradient: false,
      font: 'industrial',
      size: '100cm',
      effect: 'pulse',
      multiline: false,
      lines: ['BAR'],
      border: true,
      borderColor: '#00ffff',
      premium: false,
      shape: 'text',
      haloIntensity: 14,
      glowRadius: 7
    },
    image: 'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=400',
    popular: false
  },
  {
    id: 'home',
    name: 'HOME SWEET HOME',
    category: 'Maison',
    config: {
      text: 'HOME\nSWEET\nHOME',
      color: '#ff0080',
      gradientColors: ['#ff0080', '#ff69b4'],
      useGradient: false,
      font: 'script',
      size: '50cm',
      effect: 'static',
      multiline: true,
      lines: ['HOME', 'SWEET', 'HOME'],
      shape: 'text',
      haloIntensity: 16,
      glowRadius: 9,
      textScale: 1
    },
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    popular: true
  }
];

export const templateCategories = [
  'Tous',
  'Romantique',
  'Business',
  'Restaurant',
  'Inspirant',
  'Maison'
];