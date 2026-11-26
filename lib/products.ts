import { products, categories } from './mock-db';
import { matchesQuery } from './normalize';
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
export function categoryProducts(slug: string) {
  return products.filter((p) => p.category === slug);
}
export function bestsellers(n = 8) {
  return products.filter((p) => p.isBestseller).slice(0, n);
}
export function related(p: { slug: string; category: string }, n = 4) {
  return products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, n);
}
export function searchProducts(q: string, limit = 20) {
  const t = q.trim();
  if (t.length < 2) return [];
  return products.filter((p) => matchesQuery(p.name, t)).slice(0, limit);
}
export function suggestProducts(q: string, limit = 6) {
  return searchProducts(q, limit);
}
