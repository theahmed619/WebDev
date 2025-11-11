/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    // 1. Define your new semantic color names
    colors: {
      // We keep these so utility colors like bg-blue-500 still work
      transparent: 'transparent',
      current: 'currentColor',
      blue: {
        100: '#DBEAFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
      },
      // Your new theme colors
      'background': 'rgb(var(--color-background) / <alpha-value>)',
      'foreground': 'rgb(var(--color-foreground) / <alpha-value>)',
      'border': 'rgb(var(--color-border) / <alpha-value>)',
      'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
      'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
      'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
    },
    // 2. Make sure text and bg colors use the new definitions
    backgroundColor: theme => ({
      ...theme('colors'),
      'background': 'rgb(var(--color-background) / <alpha-value>)',
      'foreground': 'rgb(var(--color-foreground) / <alpha-value>)',
    }),
    textColor: theme => ({
      ...theme('colors'),
      'primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
      'secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
      'muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'border': 'rgb(var(--color-border) / <alpha-value>)',
    }),
    // --- END OF FIX ---

    extend: {
      // You can keep this 'extend' block for non-color extensions
    },
  },
  plugins: [],
}