/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme': 'var(--theme)',
        'text-selection': 'var(--text-selection)',
        'text-selection-background': 'var(--text-selection-background)',
        'background': 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        'foreground': 'var(--foreground)',
        'btn-background': 'var(--btn-background)',
        'btn-background-hover': 'var(--btn-background-hover)',
        'border': 'var(--border)',
        'outline-border': 'var(--outline-border)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'shimmer-highlight': 'var(--shimmer-highlight)',
        'avatar-background': 'var(--avatar-background)',
        'menu-background': 'var(--menu-background)',
        'menu-background-hover': 'var(--menu-background-hover)',
        'error-background': 'var(--error-background)',
        'error-text': 'var(--error-text)',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
      // For scrolling banner
      scroll: {
        '0%': {
          transform: 'translate(0)',
        },
        '100%': {
          transform: 'translateX(-100%)',
        },
      },
    },
  },
  plugins: [],
}
