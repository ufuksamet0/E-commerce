export interface ColorOption {
  name: string;
  hex: string;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  priceTL: number;
  compareAtPrice: number | null;
  colors: ColorOption[];
  sizes: string[];
  images: string[];
  fabric: string;
  care: string;
  stockBySize: Record<string, number>;
  isNew: boolean;
  isBestseller: boolean;
}
export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}
