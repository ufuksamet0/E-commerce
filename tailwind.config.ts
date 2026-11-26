import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F6',
        blush: { DEFAULT: '#E8B4B8', soft: '#F6DFE1' },
        peach: { DEFAULT: '#FFD9B8', soft: '#FFEEDD' },
        mint: { DEFAULT: '#BFE3C6', soft: '#E2F2E6' },
        lilac: { DEFAULT: '#CFC3E8', soft: '#E9E3F8' },
        sky: { DEFAULT: '#BFD9E8', soft: '#E2EFF7' },
        ink: '#3A2E2E',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
