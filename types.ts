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
  problem: string;
  strategy: string;
  execution: string;
  result: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
}

export enum QuizOption {
  NO_REACH = "No reach.",
  MS_PAINT = "My content looks like it was made on MS Paint.",
  GHOST_TOWN = "I post once a month (on a good month).",
  MONEY_PIT = "Ads eat my money, don't bring results."
}