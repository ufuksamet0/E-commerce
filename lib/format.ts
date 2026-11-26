export function tl(n: number): string {
  return n.toLocaleString('tr-TR') + ' TL';
}
export function orderNo(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const r = Math.floor(1000 + Math.random() * 9000);
  return `TR-${y}${m}${day}-${r}`;
}
