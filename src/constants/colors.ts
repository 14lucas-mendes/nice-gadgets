export const COLOR_MAP = {
  gold: '#FFD700',
  spaceblack: '#161617',
  silver: '#C0C0C0',
  spacegray: '#535456',
  coral: '#FF7F50',
  red: '#FF0000',
  white: '#FFFFFF',
  yellow: '#FFFF00',
  midnight: '#1F202C',
  purple: '#800080',
  graphite: '#505150',
  sierrablue: '#A0B4C6',
  blue: '#0000FF',
  pink: '#FFC0CB',
  black: '#000000',
  midnightgreen: '#4E5851',
  green: '#008000',
  rosegold: '#B76E79',
  starlight: '#FAF7F2',
  skyblue: '#87CEEB',
} as const;

export type ColorKey = keyof typeof COLOR_MAP;

export function getColorHex(color: string): string {
  const colorKey = color.toLowerCase().replace(/\s+/g, '') as ColorKey;
  return COLOR_MAP[colorKey] || '#CCCCCC'; // Fallback color
}
