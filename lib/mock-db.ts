import type { Product, Category } from './types';
import productsJson from '../data/products.json';
import categoriesJson from '../data/categories.json';
export const products: Product[] = productsJson as unknown as Product[];
export const categories: Category[] = categoriesJson as unknown as Category[];
