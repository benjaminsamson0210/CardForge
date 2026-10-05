export type ThemeType = 'default' | 'bold' | 'two_up' | 'e_commerce';

export type ColorMode = 'light' | 'dark';

export type AccentColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink';

export type PatternType =
  | 'none'
  | 'hideout'
  | 'bubbles'
  | 'texture'
  | 'diagonal_lines'
  | 'charlie_brown'
  | 'lines_in_motion'
  | 'topography'
  | 'bank_note';

export interface CardConfig {
  url: string;
  title: string;
  description: string;
  theme: ThemeType;
  mode: ColorMode;
  color: AccentColor;
  customHex?: string;
  pattern: PatternType;
  hideWatermark: boolean;
  imageUrl?: string;
  price?: string;
  discountedPrice?: string;
}
