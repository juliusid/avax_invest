export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  roi: number;
  minInvestment: number;
  termLength: number;
  description?: string;
  fundedPercent?: number;
}

export interface PortfolioItem extends Project {
  investedAmount: number;
  currentValue: number;
  purchaseDate: string;
}
