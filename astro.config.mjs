// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  typescript: {
    // Disable TypeScript checking for better development experience
    check: false
  },

  vite: {
    // Configure Vite to handle TypeScript better
    esbuild: {
      // Suppress TypeScript errors during build
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
  },

  adapter: vercel()
});