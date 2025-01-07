import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#DB3D5B',
      'primary-light': '#E06078',
      secondary: '#419EA6',
      'secondary-light': '#BFF2DD',
      white: '#E6FFF3',
      black: '#000800',
      yellow: '#FFE478',
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        xl: '1280px',
      },
    },
    extend: {
      fontFamily: {
        serif: ['Comfortaa'],
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
