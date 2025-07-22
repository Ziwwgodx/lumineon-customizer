export interface NeonConfig {
  text: string;
  color: string;
  gradientColors: string[];
  useGradient: boolean;
  font: string;
  size: string;
  effect: string;
  multiline: boolean;
  lines: string[];
  shape: string;
  haloIntensity: number;
  glowRadius: number;
  textScale: number;
}

export interface CartItem {
  id: string;
  config: NeonConfig;
  price: number;
  quantity: number;
}

export interface PremiumOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface Template {
  id: string;
  name: string;
  config: NeonConfig;
  category: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface SavedDesign {
  id: string;
  name: string;
  config: NeonConfig;
  createdAt: string;
  thumbnail?: string;
}
export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  image: string;
  verified: boolean;
  date: string;
}