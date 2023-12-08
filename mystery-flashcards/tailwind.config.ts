import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#9300a3",
          "secondary": "#02658D",
          "accent": "#ffffff",
          "neutral": "#EEF6F6",
          "base-100": "#ffffff",
          "info": "#ffffff",
          "success": "#bbf7d0",
          "warning": "#ffffff",
          "error": "#f00",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
export default config
