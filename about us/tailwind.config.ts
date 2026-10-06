import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0B3B73',
          darkBlue: '#0A2540',
          navy: '#061626',
          charcoal: '#0b1320',
          lemon: '#84CC16',
          lemonHover: '#74be12',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
