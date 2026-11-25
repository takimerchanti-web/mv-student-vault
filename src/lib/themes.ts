import type { ThemeName } from '../types'

export const themes: { id: ThemeName; name: string; direction: string; swatch: string }[] = [
  { id: 'ivory', name: 'Ivory Studio', direction: 'Warm ivory and violet', swatch: '#6c5ce7' },
  { id: 'paper', name: 'Paper', direction: 'Neutral white and charcoal', swatch: '#35343a' },
  { id: 'lavender', name: 'Lavender', direction: 'Soft lavender and deep purple', swatch: '#8666d8' },
  { id: 'sage', name: 'Sage', direction: 'Pale green and forest accents', swatch: '#4f7b62' },
  { id: 'ocean', name: 'Ocean', direction: 'Cool white and ocean blue', swatch: '#2f7fae' },
  { id: 'sandstone', name: 'Sandstone', direction: 'Warm beige and earthy brown', swatch: '#966d47' },
  { id: 'rose', name: 'Rose Quartz', direction: 'Pale rose and burgundy', swatch: '#9c5577' },
  { id: 'midnight', name: 'Midnight', direction: 'Dark navy and blue', swatch: '#7ca7ff' },
  { id: 'graphite', name: 'Graphite', direction: 'Charcoal and silver', swatch: '#b7bccb' },
  { id: 'amoled', name: 'AMOLED', direction: 'Near-black and black', swatch: '#a88bff' },
  { id: 'forest', name: 'Forest Night', direction: 'Dark green and mint', swatch: '#76d6ab' },
  { id: 'aubergine', name: 'Aubergine', direction: 'Deep purple and lilac', swatch: '#d5a3ff' },
  { id: 'espresso', name: 'Espresso', direction: 'Dark brown and amber', swatch: '#e5a85e' },
  { id: 'nord', name: 'Nord Night', direction: 'Blue-gray and icy', swatch: '#88c0d0' },
]

export const themeVars: Record<ThemeName, Record<string, string>> = {
  ivory: { bg: '#f7f5f0', surface: '#fffdfa', surface2: '#efebe5', ink: '#222126', muted: '#716d76', line: '#e3ded8', accent: '#6c5ce7', accentSoft: '#ece9ff', good: '#3c896c', warn: '#b17539', danger: '#bd5f6e' },
  paper: { bg: '#f6f6f3', surface: '#fff', surface2: '#ededeb', ink: '#252529', muted: '#6f6f72', line: '#dededb', accent: '#46434f', accentSoft: '#e9e8e7', good: '#46745e', warn: '#a86c2f', danger: '#b24e5b' },
  lavender: { bg: '#f5f1fc', surface: '#fffaff', surface2: '#eee7f9', ink: '#2c2637', muted: '#796f88', line: '#e1d8ef', accent: '#8666d8', accentSoft: '#eee8ff', good: '#4a8c70', warn: '#b9784c', danger: '#b05c75' },
  sage: { bg: '#f2f5ef', surface: '#fbfdf9', surface2: '#e6ede1', ink: '#273129', muted: '#6e796f', line: '#d8e2d3', accent: '#4f7b62', accentSoft: '#e2f0e5', good: '#3e8164', warn: '#a27942', danger: '#ae5d63' },
  ocean: { bg: '#eff5f8', surface: '#fbfeff', surface2: '#e1edf2', ink: '#1e2c33', muted: '#6c7c83', line: '#d2e1e8', accent: '#2f7fae', accentSoft: '#e1f1fb', good: '#3a8a78', warn: '#a4773e', danger: '#b65d6d' },
  sandstone: { bg: '#f8f2e9', surface: '#fffaf2', surface2: '#eee3d3', ink: '#382d25', muted: '#806f61', line: '#e5d7c5', accent: '#966d47', accentSoft: '#f2e4d1', good: '#63825a', warn: '#b67832', danger: '#b35e5a' },
  rose: { bg: '#fbf1f4', surface: '#fffafd', surface2: '#f2e1e7', ink: '#39272e', muted: '#8b707a', line: '#ead6df', accent: '#9c5577', accentSoft: '#f9e3ed', good: '#56816d', warn: '#b37949', danger: '#b35361' },
  midnight: { bg: '#111a2b', surface: '#18243a', surface2: '#202f48', ink: '#edf2ff', muted: '#9eacc6', line: '#2c3c57', accent: '#7ca7ff', accentSoft: '#25385f', good: '#65c2a0', warn: '#e6b66a', danger: '#ff8b9c' },
  graphite: { bg: '#191b1f', surface: '#24272d', surface2: '#2d3139', ink: '#f0f2f5', muted: '#a6abb5', line: '#3b404a', accent: '#b7bccb', accentSoft: '#353a45', good: '#7fceb0', warn: '#e7bd75', danger: '#f18b99' },
  amoled: { bg: '#000', surface: '#0c0c0d', surface2: '#151517', ink: '#f5f5f7', muted: '#9a9aa2', line: '#29292d', accent: '#a88bff', accentSoft: '#211b38', good: '#6dd5ad', warn: '#e4b866', danger: '#ff8b9a' },
  forest: { bg: '#0e201b', surface: '#143027', surface2: '#1b4033', ink: '#eaf8f1', muted: '#9db9aa', line: '#2a5144', accent: '#76d6ab', accentSoft: '#1b4a3b', good: '#82d5a7', warn: '#e8bd77', danger: '#ff9a9b' },
  aubergine: { bg: '#1e1227', surface: '#2b1937', surface2: '#392448', ink: '#fcf0ff', muted: '#c0a8c8', line: '#4a3158', accent: '#d5a3ff', accentSoft: '#4b2e5b', good: '#8dd1af', warn: '#e7bc75', danger: '#ff9aa7' },
  espresso: { bg: '#211714', surface: '#30231e', surface2: '#43302a', ink: '#fff3e5', muted: '#c5a995', line: '#574037', accent: '#e5a85e', accentSoft: '#533a25', good: '#9dc68b', warn: '#e7c076', danger: '#ff9b91' },
  nord: { bg: '#1f2833', surface: '#273443', surface2: '#334253', ink: '#edf5f7', muted: '#a9bbc4', line: '#435565', accent: '#88c0d0', accentSoft: '#294652', good: '#a3d5bb', warn: '#ebcb8b', danger: '#e68a92' },
}
