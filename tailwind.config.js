/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
        body: ['Lato', 'Helvetica', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#040d1a',
          900: '#071426',
          800: '#0d2140',
          700: '#12305e',
          600: '#173d78',
        },
        gold: {
          300: '#f5d98b',
          400: '#f0c842',
          500: '#d4a017',
          600: '#b8880f',
        },
        slate: {
          850: '#1a2535',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'count-up': 'countUp 0.3s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }
    },
  },
  plugins: [],
}
