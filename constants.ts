import { Project } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Emerald Valley Corn",
    category: "Farming",
    location: "Iowa, USA",
    imageUrl: "https://images.unsplash.com/photo-1628104533924-d922a9442078?q=80&w=2000&auto=format&fit=crop",
    roi: 12.5,
    minInvestment: 5000,
    termLength: 60,
    description: "High-yield corn production facility with advanced irrigation systems.",
    fundedPercent: 85
  },
  {
    id: 2,
    title: "Napa Organic Vine",
    category: "Vineyard",
    location: "California, USA",
    imageUrl: "https://images.unsplash.com/photo-1596245362947-f47c32791443?q=80&w=2070&auto=format&fit=crop",
    roi: 16.4,
    minInvestment: 15000,
    termLength: 84,
    description: "Premium organic vineyard supplying top-tier wineries in the Napa region.",
    fundedPercent: 45
  },
  {
    id: 3,
    title: "Highland Barley",
    category: "Farming",
    location: "Scotland, UK",
    imageUrl: "https://images.unsplash.com/photo-1574943320219-55edeb7053aa?q=80&w=2070&auto=format&fit=crop",
    roi: 14.1,
    minInvestment: 7500,
    termLength: 48,
    description: "Sustainable barley farming for local distillery supply chains.",
    fundedPercent: 92
  },
  {
    id: 4,
    title: "Delta Soy Beans",
    category: "Farming",
    location: "Mississippi, USA",
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop",
    roi: 11.8,
    minInvestment: 5000,
    termLength: 36,
    description: "Large scale soy operation leveraging river delta fertility.",
    fundedPercent: 12
  },
  {
    id: 5,
    title: "Alpine Dairy Pastures",
    category: "Livestock",
    location: "Bern, Switzerland",
    imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop",
    roi: 9.5,
    minInvestment: 10000,
    termLength: 72,
    description: "Free-range dairy cattle pastures focused on organic milk production.",
    fundedPercent: 60
  },
  {
    id: 6,
    title: "Sonora Citrus Grove",
    category: "Farming",
    location: "Sonora, Mexico",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
    roi: 13.2,
    minInvestment: 8000,
    termLength: 60,
    description: "Export-grade citrus grove specializing in oranges and limes.",
    fundedPercent: 30
  }
];