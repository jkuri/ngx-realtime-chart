const colors: Record<string, string> = {
  blue: '#32A8E4',
  green: '#34AA44',
  yellow: '#FACF55',
  red: '#E6492D',
  gray: '#6B6C6F',
  violet: '#6758F3',
  orange: '#F6AB2F'
};

export const Colors = Object.keys(colors).map(key => colors[key]);

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
