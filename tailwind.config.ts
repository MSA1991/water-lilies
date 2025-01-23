import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#D95D74',
      'primary-light': '#DE7C8F',
      secondary: '#419EA6',
      'secondary-light': '#BFF2DD',
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
