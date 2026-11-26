export function trLower(s: string): string {
  return s.toLocaleLowerCase('tr-TR').replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u');
}
export function trNormalize(s: string): string {
  return trLower(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}
export function matchesQuery(name: string, q: string): boolean {
  return trNormalize(name).includes(trNormalize(q));
}
