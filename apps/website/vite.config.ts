import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const siteBase = '/ai-bobby/'

export default defineConfig(({ command }) => {
  const base = command === 'build' ? siteBase : '/'
  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'prompt',
        injectRegister: null,
        includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'og.png'],
        manifest: {
          name: 'AI Bobby',
          short_name: 'AI Bobby',
          description: 'All your models. One local endpoint.',
          start_url: base,
          scope: base,
          display: 'standalone',
          background_color: '#05070d',
          theme_color: '#1e4fff',
          icons: [
            { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
            { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          navigateFallback: `${siteBase}index.html`,
          globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
          cleanupOutdatedCaches: true,
        },
        devOptions: { enabled: false },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2022',
      sourcemap: false,
    },
  }
})
