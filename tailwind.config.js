/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // content: [
  //   './app/**/*.{js,ts,jsx,tsx,mdx}',
  //   './components/**/*.{js,ts,jsx,tsx,mdx}',
  // ],
  theme: {
    // Force Tailwind to be desktop-first
    // Need to manually set max-w-screen- properties
    screens: {
			'2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
		},
    extend: {
      colors: {
        'theme': 'rgb(var(--theme) / <alpha-value>)',
        'background': 'rgb(var(--background) / <alpha-value>)',
        'background-secondary': 'rgb(var(--background-secondary) / <alpha-value>)',
        'foreground': 'rgb(var(--foreground) / <alpha-value>)',
        'btn-background': 'rgb(var(--btn-background) / <alpha-value>)',
        'btn-background-hover': 'rgb(var(--btn-background-hover) / <alpha-value>)',
        'border': 'rgb(var(--border) / <alpha-value>)',
        'outline-border': 'rgb(var(--outline-border) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'selection': 'rgb(var(--selection) / <alpha-value>)',
        'error': 'rgb(var(--error) / <alpha-value>)',
      },
      keyframes: {
        // shimmer: {
        //   '100%': {
        //     transform: 'translateX(100%)',
        //   },
        // },
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
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
