import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#D64761',
      'primary-light': '#DE6D83',
      secondary: '#2B9CA6',
      'secondary-light': '#B1F2D7',
      white: '#E6FFF3',
      black: '#001A00',
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
        serif: ['Philosopher'],
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
