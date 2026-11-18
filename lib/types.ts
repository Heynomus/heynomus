export type Data = Record<string, any>;
export interface Project extends Data {
  slug: string;
  name: string;
  symbol?: string;
  shortDescription?: string;
  activityStatus?: string;
  researchLevel?: string;
  primaryNarrative?: {slug: string; name: string};
  logoUrl?: string;
  url?: string;
  token?: {chainId: number; contractAddress: string};
  lastShippedAt?: string;
}
export type Meta = {provider: string; sourceUrl: string; fetchedAt: string; state: 'fresh'|'stale'|'snapshot'; cached: boolean};
export const SOURCE = 'https://heynomus.xyz';
export function safeUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return;
  try {const u = new URL(value); if (u.protocol === 'https:' && !u.username && !u.password) return u.href;} catch {}
}
export function num(value: unknown, prefix = ''): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
  return prefix + Intl.NumberFormat('en-US', {notation: Math.abs(value) >= 10000 ? 'compact' : 'standard', maximumFractionDigits: Math.abs(value) < 1 ? 6 : 1}).format(value);
}
export function money(value: unknown): string {return num(value, '$');}
export function ago(value?: string | null): string {
  if (!value) return 'Not recorded';
  const diff = Date.now() - new Date(value).getTime();
  if (!Number.isFinite(diff)) return 'Unknown date';
  if (diff < 0) return date(value);
  const m = Math.floor(diff / 60000);
  return m < 1 ? 'Just now' : m < 60 ? `${m}m ago` : m < 1440 ? `${Math.floor(m / 60)}h ago` : `${Math.floor(m / 1440)}d ago`;
}
export function date(value?: string | null): string {
  if (!value || !Number.isFinite(Date.parse(value))) return 'Not recorded';
  return new Date(value).toLocaleString('en-GB', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'UTC'}) + ' UTC';
}
export function label(value?: string): string {return (value || 'Unknown').toLowerCase().replaceAll('_', ' ').replace(/\b\w/g, c => c.toUpperCase());}
export function short(value?: string): string {return value && value.length > 18 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value || 'Not linked';}
export function validSlug(value: string): boolean {return /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,159}$/.test(value) && !value.includes('..');}
