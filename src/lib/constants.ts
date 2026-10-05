import { AccentColor, CardConfig, PatternType, ThemeType } from '@/types/mugshot';

export const ACCENT_COLORS: Record<AccentColor, { label: string; hex: string; bgClass: string; textClass: string }> = {
  red: { label: 'Red', hex: '#ef4444', bgClass: 'bg-red-500', textClass: 'text-red-500' },
  orange: { label: 'Orange', hex: '#f97316', bgClass: 'bg-orange-500', textClass: 'text-orange-500' },
  yellow: { label: 'Yellow', hex: '#eab308', bgClass: 'bg-yellow-500', textClass: 'text-yellow-500' },
  green: { label: 'Green', hex: '#22c55e', bgClass: 'bg-green-500', textClass: 'text-green-500' },
  teal: { label: 'Teal', hex: '#14b8a6', bgClass: 'bg-teal-500', textClass: 'text-teal-500' },
  blue: { label: 'Blue', hex: '#3b82f6', bgClass: 'bg-blue-500', textClass: 'text-blue-500' },
  indigo: { label: 'Indigo', hex: '#6366f1', bgClass: 'bg-indigo-500', textClass: 'text-indigo-500' },
  purple: { label: 'Purple', hex: '#8b5cf6', bgClass: 'bg-purple-500', textClass: 'text-purple-500' },
  pink: { label: 'Pink', hex: '#ec4899', bgClass: 'bg-pink-500', textClass: 'text-pink-500' },
};

export const PATTERNS: { id: PatternType; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'hideout', label: 'Hideout' },
  { id: 'bubbles', label: 'Bubbles' },
  { id: 'texture', label: 'Texture' },
  { id: 'diagonal_lines', label: 'Diagonal lines' },
  { id: 'charlie_brown', label: 'Charlie brown' },
  { id: 'lines_in_motion', label: 'Lines in motion' },
  { id: 'topography', label: 'Topography' },
  { id: 'bank_note', label: 'Bank note' },
];

export const THEMES: { id: ThemeType; label: string; isPro?: boolean; description: string }[] = [
  { id: 'default', label: 'Default', isPro: false, description: 'Top accent bar with uppercase domain and clear subtitle' },
  { id: 'bold', label: 'Bold', isPro: true, description: 'High-contrast large typography for high impact announcements' },
  { id: 'two_up', label: 'Two up', isPro: true, description: 'Split layout with icon or avatar box beside title' },
  { id: 'e_commerce', label: 'E-Commerce', isPro: true, description: 'Product preview showcase with price tag' },
];

export const DEFAULT_CARD_CONFIG: CardConfig = {
  url: 'gifcoins.io',
  title: 'Peer-to-peer appreciation made easy',
  description: 'Give your team members the recognition they deserve and let them know how much you appreciate their efforts with a Gifcoin.',
  theme: 'default',
  mode: 'light',
  color: 'indigo',
  pattern: 'diagonal_lines',
  hideWatermark: false,
  imageUrl: '',
  price: '$29',
  discountedPrice: '$19',
};

// SVG pattern generators that return pure SVG markup string or JSX
export function getPatternSvg(pattern: PatternType, colorHex: string): string {
  switch (pattern) {
    case 'diagonal_lines':
      return `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="${colorHex}" fill-opacity="0.12" fill-rule="evenodd"><path d="M0 40L40 0H20L0 20M40 40V20L20 40"/></g></svg>`;
    case 'bubbles':
      return `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="${colorHex}" fill-opacity="0.14" fill-rule="evenodd"><circle cx="20" cy="20" r="8"/><circle cx="5" cy="5" r="3"/><circle cx="35" cy="35" r="4"/></g></svg>`;
    case 'texture':
      return `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="${colorHex}" fill-opacity="0.1" fill-rule="evenodd"><rect x="0" y="0" width="3" height="3"/><rect x="10" y="10" width="3" height="3"/><rect x="5" y="15" width="2" height="2"/></g></svg>`;
    case 'charlie_brown':
      return `<svg width="40" height="20" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10 L10 0 L20 10 L30 0 L40 10 L30 20 L20 10 L10 20 Z" fill="${colorHex}" fill-opacity="0.12"/></svg>`;
    case 'lines_in_motion':
      return `<svg width="60" height="30" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg"><path d="M0 15h20M30 15h20M10 5h20M40 5h20M10 25h20M40 25h20" stroke="${colorHex}" stroke-opacity="0.15" stroke-width="2"/></svg>`;
    case 'topography':
      return `<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M0 40 C 20 20, 60 20, 80 40 M 0 60 C 30 40, 50 80, 80 60 M 0 20 C 30 0, 50 40, 80 20" fill="none" stroke="${colorHex}" stroke-opacity="0.14" stroke-width="2"/></svg>`;
    case 'bank_note':
      return `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="18" fill="none" stroke="${colorHex}" stroke-opacity="0.12" stroke-width="2"/><circle cx="25" cy="25" r="10" fill="none" stroke="${colorHex}" stroke-opacity="0.12" stroke-width="1"/></svg>`;
    case 'hideout':
      return `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M0 0 L20 20 L0 40 Z M40 0 L20 20 L40 40 Z" fill="${colorHex}" fill-opacity="0.08"/></svg>`;
    case 'none':
    default:
      return '';
  }
}
