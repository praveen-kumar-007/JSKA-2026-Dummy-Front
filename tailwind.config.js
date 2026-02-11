/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Override default `purple` to a Royal Blue palette (site-wide)
        purple: {
          50: '#f3f6fb',
          100: '#e6eef9',
          200: '#c8ddf4',
          300: '#9fb3ee',
          400: '#5772d8',
          500: '#0B3D91', // your chosen Deep Royal Blue
          600: '#0a316f',
          700: '#081f49',
          800: '#040f24',
          900: '#02060f',
        },
        // Optional alias if you prefer `royal-*` classes in future
        royal: {
          DEFAULT: '#0B3D91',
        },
      },
      boxShadow: {
        'black-effect': '0 12px 30px rgba(0,0,0,0.6)',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}