module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        orbiwork: {
          primary: {
            50: '#eef7ff',
            100: '#d6ebff',
            200: '#add6ff',
            300: '#7bbaff',
            400: '#4f9eff',
            500: '#1f7fff',
            600: '#1666d6',
            700: '#124fab',
            800: '#0e3c82',
            900: '#0b2e66'
          },
          accent: {
            500: '#22c55e',
            600: '#16a34a'
          },
          state: {
            success: '#16a34a',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#0ea5e9'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      borderRadius: {
        md: '0.5rem',
        lg: '0.75rem'
      },
      boxShadow: {
        smsoft: '0 6px 20px rgba(16,24,40,0.06)'
      }
    }
  },
  plugins: []
}
