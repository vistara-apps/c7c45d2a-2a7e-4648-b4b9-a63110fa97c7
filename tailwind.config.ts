import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210, 30%, 8%)',
        foreground: 'hsl(210, 20%, 98%)',
        card: 'hsl(210, 30%, 12%)',
        'card-foreground': 'hsl(210, 20%, 98%)',
        primary: 'hsl(210, 90%, 50%)',
        'primary-foreground': 'hsl(210, 20%, 98%)',
        secondary: 'hsl(210, 30%, 18%)',
        'secondary-foreground': 'hsl(210, 20%, 98%)',
        accent: 'hsl(130, 80%, 45%)',
        'accent-foreground': 'hsl(210, 20%, 98%)',
        muted: 'hsl(210, 30%, 15%)',
        'muted-foreground': 'hsl(210, 20%, 65%)',
        border: 'hsl(210, 30%, 18%)',
        input: 'hsl(210, 30%, 18%)',
        ring: 'hsl(210, 90%, 50%)',
        success: 'hsl(130, 80%, 45%)',
        danger: 'hsl(0, 80%, 60%)',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        card: '0 4px 12px hsla(210, 30%, 20%, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
