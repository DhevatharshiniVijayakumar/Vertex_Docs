
import { useColorScheme } from 'react-native';

export const luxuryTheme = {
  light: {
    background: '#F5F2EB',
    surface: '#FFFDFA',
    surfaceAlt: '#EDE9E0',
    foreground: '#172B3A',
    secondary: '#747D80',
    muted: '#9A9D98',
    border: '#E5E0D6',
    primary: '#172F40',
    accent: '#168477',
    accentSoft: '#E1EFEB',
    hero: '#172F40',
    heroText: '#FFFDF7',
    heroMuted: '#B9C8C8',
    progressTrack: '#E6E2D9',
    danger: '#B65F55',
  },
  dark: {
    background: '#101A20',
    surface: '#19262D',
    surfaceAlt: '#223139',
    foreground: '#F3F0E8',
    secondary: '#B1BCBD',
    muted: '#849294',
    border: '#304047',
    primary: '#E8EDE8',
    accent: '#55B9A6',
    accentSoft: '#203D3A',
    hero: '#20363F',
    heroText: '#F8F5ED',
    heroMuted: '#B9CCCA',
    progressTrack: '#35464B',
    danger: '#E18B80',
  },
} as const;

export const luxurySpacing = {
  screen: 24,
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 44,
} as const;

export const luxuryRadius = {
  small: 10,
  medium: 16,
  large: 24,
} as const;

export function useLuxuryTheme() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? luxuryTheme.dark : luxuryTheme.light;
}
