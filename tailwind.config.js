/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1F14',
          50: '#122D1E',
          100: '#1A3D28',
          200: '#224D32',
        },
        accent: {
          DEFAULT: '#00C87A',
          50: '#00A066',
          100: '#00E08A',
        },
        urgency: {
          red: '#EF4444',
          yellow: '#F59E0B',
          green: '#00C87A',
        },
        surface: {
          DEFAULT: '#122D1E',
          light: '#1A3D28',
          lighter: '#224D32',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
