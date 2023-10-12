import { type Config } from 'tailwindcss'

import typography from '@tailwindcss/typography'
import flowbite from 'flowbite/plugin'

import theme from './tailwind.theme'

export default {
  theme,
  content: [
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{css,vue}',
  ],
  plugins: [
    typography(),
    flowbite,
  ],
  future: {
    // disableColorOpacityUtilitiesByDefault: true,
    // respectDefaultRingColorOpacity: true,
  },
  experimental: {
    // optimizeUniversalDefaults: true,
  },
} as Config
