
export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  explainer: string;
}

export interface PortfolioItem {
  id: string;
  client: string;
  image: string;
  label: string;
  result?: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  features: string[];
  cta: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Growth' | 'Design' | 'Productivity';
  readTime: string;
  summary: string;
  content: string;
  takeaways: string[];
  sources: { title: string; url: string }[];
}

export enum QuizOption {
  NO_REACH = "No reach.",
  MS_PAINT = "Content looks unprofessional.",
  GHOST_TOWN = "I post once a month.",
  MONEY_PIT = "Ads eat my money."
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  performance: boolean;
  personalization: boolean;
  marketing: boolean;
}
