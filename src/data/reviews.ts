import { CustomerReview } from '../types';

const allCustomerReviews: CustomerReview[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    rating: 5,
    comment: 'Qualité exceptionnelle ! Mon néon "CAFÉ" illumine parfaitement ma cuisine. Les couleurs sont vives et l\'effet est magique le soir.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-15'
  },
  {
    id: '2',
    name: 'Thomas Martin',
    rating: 5,
    comment: 'Livraison ultra rapide et installation facile. Mon néon "OPEN" attire beaucoup plus de clients dans ma boutique. Investissement rentabilisé !',
    image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-10'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    rating: 5,
    comment: 'Le configurateur est génial ! J\'ai pu voir exactement le rendu avant de commander. Mon néon "LOVE" est parfait pour notre chambre.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-08'
  },
  {
    id: '4',
    name: 'Pierre Moreau',
    rating: 5,
    comment: 'Service client au top ! Ils m\'ont aidé à choisir la taille parfaite pour mon restaurant. Mes clients adorent l\'ambiance créée.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-05'
  },
  {
    id: '5',
    name: 'Julie Petit',
    rating: 5,
    comment: 'Mon néon "DREAM" dans ma chambre d\'ado est parfait ! La qualité est au rendez-vous et l\'effet waouh garanti. Je recommande vivement !',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-12'
  },
  {
    id: '6',
    name: 'Antoine Rousseau',
    rating: 4,
    comment: 'Très satisfait de mon achat ! Le néon "BAR" donne une ambiance folle à ma cave. Seul bémol : j\'aurais aimé plus d\'options de couleurs.',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-07'
  },
  {
    id: '7',
    name: 'Camille Durand',
    rating: 5,
    comment: 'Commande pour mon salon de coiffure "BEAUTY". Mes clientes adorent ! L\'éclairage est parfait et ça donne un côté très pro.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-14'
  },
  {
    id: '8',
    name: 'Lucas Bernard',
    rating: 5,
    comment: 'Installation super facile ! Mon néon "GAMING" dans ma setup est juste parfait. Tous mes potes sont jaloux maintenant !',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-11'
  },
  {
    id: '9',
    name: 'Emma Leroy',
    rating: 5,
    comment: 'Cadeau parfait pour l\'anniversaire de ma sœur ! Son néon "PRINCESS" dans sa chambre la rend folle de joie. Merci LumiNéon !',
    image: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-09'
  },
  {
    id: '10',
    name: 'Maxime Girard',
    rating: 4,
    comment: 'Bon produit dans l\'ensemble. Mon néon "PIZZA" attire l\'œil dans ma pizzeria. Livraison un peu longue mais ça valait le coup.',
    image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-06'
  },
  {
    id: '11',
    name: 'Léa Moreau',
    rating: 5,
    comment: 'Absolument parfait ! Mon néon "YOGA" dans mon studio crée une ambiance zen incroyable. Mes élèves adorent l\'atmosphère.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-13'
  },
  {
    id: '12',
    name: 'Romain Blanc',
    rating: 5,
    comment: 'Service impeccable ! Mon néon personnalisé "ROMAIN" pour ma chambre est exactement ce que je voulais. Qualité premium !',
    image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-04'
  },
  {
    id: '13',
    name: 'Chloé Martin',
    rating: 5,
    comment: 'Mon néon "MUSIC" dans mon home studio est juste magique ! L\'éclairage parfait pour mes sessions d\'enregistrement. Top qualité !',
    image: 'https://images.pexels.com/photos/1239287/pexels-photo-1239287.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-16'
  },
  {
    id: '14',
    name: 'Hugo Dubois',
    rating: 4,
    comment: 'Très content de mon achat ! Le néon "GARAGE" éclaire parfaitement mon atelier. Juste un peu cher mais la qualité est là.',
    image: 'https://images.pexels.com/photos/1040879/pexels-photo-1040879.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-03'
  },
  {
    id: '15',
    name: 'Manon Petit',
    rating: 5,
    comment: 'Parfait pour ma boutique ! Mon néon "FASHION" attire tous les regards. Mes ventes ont augmenté depuis l\'installation !',
    image: 'https://images.pexels.com/photos/1181689/pexels-photo-1181689.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-17'
  },
  {
    id: '16',
    name: 'Théo Rousseau',
    rating: 5,
    comment: 'Installation facile et rendu exceptionnel ! Mon néon "CHILL" dans mon salon crée l\'ambiance parfaite pour mes soirées.',
    image: 'https://images.pexels.com/photos/1043472/pexels-photo-1043472.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-02'
  },
  {
    id: '17',
    name: 'Sarah Durand',
    rating: 5,
    comment: 'Commande pour mon food truck "TACOS". L\'effet est saisissant le soir ! Mes clients me trouvent plus facilement maintenant.',
    image: 'https://images.pexels.com/photos/1239286/pexels-photo-1239286.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-18'
  },
  {
    id: '18',
    name: 'Kevin Bernard',
    rating: 4,
    comment: 'Bon rapport qualité-prix. Mon néon "SPORT" dans ma salle de sport perso motive bien ! Quelques jours de retard à la livraison.',
    image: 'https://images.pexels.com/photos/1040878/pexels-photo-1040878.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-01'
  },
  {
    id: '19',
    name: 'Océane Leroy',
    rating: 5,
    comment: 'Magnifique ! Mon néon "OCEAN" dans ma salle de bain crée une ambiance spa incroyable. Je me sens en vacances tous les jours !',
    image: 'https://images.pexels.com/photos/1181687/pexels-photo-1181687.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-19'
  },
  {
    id: '20',
    name: 'Julien Girard',
    rating: 5,
    comment: 'Service client réactif et produit de qualité ! Mon néon "WORK" dans mon bureau me motive chaque jour. Parfait pour le télétravail !',
    image: 'https://images.pexels.com/photos/1043475/pexels-photo-1043475.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    date: '2024-12-20'
  }
];

// Fonction pour mélanger et sélectionner des avis aléatoires
export const getRandomizedReviews = (count: number = 8): CustomerReview[] => {
  const shuffled = [...allCustomerReviews].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Export des avis pour compatibilité
export const customerReviews = getRandomizedReviews(8);