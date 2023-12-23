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
      keyframes: {
        'wiggle': {
          '0%': { transform: 'scale(1)', color: "#9300a3" },
          '100%': { transform: 'scale(1)', color: "black" },
        },
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        "cards3": "1150px",
        'xl': '1280px',
        'sidebarOpen': '1380px',
        '2xl': '1536px'
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
