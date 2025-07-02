
export interface Slab {
  id: string;
  name: string;
  material: 'granite' | 'quartz';
  finish: 'polished' | 'flamed' | 'leathered' | 'honed';
  color: string;
  price: number;
  priceUnit: 'sqft' | 'sqm';
  dimensions: {
    length: number;
    width: number;
    thickness: number;
  };
  images: string[];
  thumbnail: string;
  supplier: {
    name: string;
    location: string;
    country: string;
    rating: number;
    verified: boolean;
  };
  quarry: {
    name: string;
    location: string;
  };
  blockId: string;
  grade: number;
  aiQualityScore: number;
  defects?: string[];
  certifications: string[];
  availability: 'in-stock' | 'pre-order' | 'sold';
  shippingTime: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceFilters {
  material: string[];
  finish: string[];
  colors: string[];
  countries: string[];
  priceRange: [number, number];
  gradeMin: number;
}
