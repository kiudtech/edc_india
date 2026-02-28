export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B3D91',
        secondary: '#FF6B00',
        accent: '#F5F7FA',
        ink: '#0F172A',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,107,0,0.5), 0 12px 40px rgba(11,61,145,0.25)',
      },
    },
  },
  plugins: [],
}
