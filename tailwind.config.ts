import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Peachy Pink Palette - Main Brand Colors
        pink: {
          50: '#FFF5F6',   // Lightest - backgrounds
          100: '#FFE8EB',  // Light - cards, sections
          200: '#FFD1D7',  // Soft - borders, dividers
          300: '#FFB3BA',  // ★ MAIN BRAND (logo background)
          400: '#FF9AA3',  // Medium - hover states
          500: '#FF818C',  // Strong - CTAs
          600: '#FF6875',  // Deep - active states
          700: '#FF4F5E',  // Rich - emphasis
          800: '#E63947',  // Dark - text on light
          900: '#CC2330',  // Darker - strong contrast
          950: '#991A24',  // Darkest - dark mode
        },
        rose: {
          50: '#FFF5F6',
          100: '#FFE8EB',
          200: '#FFD1D7',
          300: '#FFB3BA',
          400: '#FF9AA3',
          500: '#FF818C',
          600: '#FF6875',
          700: '#FF4F5E',
          800: '#E63947',
          900: '#CC2330',
          950: '#991A24',
        },
        // Complementary Colors
        cream: {
          50: '#FFFBF8',   // Warm white
          100: '#FFF9F5',  // Cream
          200: '#FFF5F0',  // Light cream
          300: '#FFE8DC',  // Peachy cream
        },
        // Warm Grays (softer than default)
        warmGray: {
          50: '#FAFAF9',
          100: '#F5F3F0',
          200: '#E8E6E3',
          300: '#D4D2CF',
          400: '#9B9B9B',
          500: '#6B6B6B',
          600: '#4A4A4A',
          700: '#2D2D2D',  // Warm charcoal for text
          800: '#1F1F1F',
          900: '#0F0F0F',
        },
        // Accent Colors
        coral: '#FF9B8A',
        peach: '#FFCBA4',
        gold: '#FFD4A3',
        // Primary (for compatibility)
        primary: {
          DEFAULT: '#FFB3BA',
          light: '#FFF5F6',
          dark: '#FF6875',
        },
        // Neutral Palette
        neutral: {
          25: '#FFFCFC',
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        // Semantic Colors
        success: '#769F84',
        warning: '#D9A66C',
        error: '#E63947',
        info: '#7CA5B8',
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
        heading: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Quicksand', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'title': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading': ['2rem', { lineHeight: '1.3' }],
        'subheading': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'tiny': ['0.75rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '40px',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(255, 179, 186, 0.08)',
        'soft-md': '0 4px 12px rgba(255, 179, 186, 0.1)',
        'soft-lg': '0 8px 24px rgba(255, 179, 186, 0.12)',
        'soft-xl': '0 12px 32px rgba(255, 179, 186, 0.15)',
        'glow': '0 0 24px rgba(255, 179, 186, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 179, 186, 0.4)',
        'card': '0 2px 16px rgba(255, 179, 186, 0.08)',
        'card-hover': '0 8px 32px rgba(255, 179, 186, 0.16)',
        'inner-soft': 'inset 0 2px 8px rgba(255, 179, 186, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-peachy': 'linear-gradient(135deg, #FFB3BA 0%, #FF9AA3 100%)',
        'gradient-soft': 'linear-gradient(180deg, #FFF5F6 0%, #FFFBF8 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFCBA4 0%, #FFB3BA 100%)',
        'gradient-hero': 'linear-gradient(180deg, #FFF5F6 0%, #FFFBF8 50%, #FFE8EB 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

export default config;
