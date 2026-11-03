import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    // Order matters: Cloudflare first, then Start, then React.
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart({
      prerender: {
        enabled: true,
        // Follows links from `/` so every case study page gets built.
        crawlLinks: true,
        // Write /work/softr.html, not /work/softr/index.html, so Cloudflare serves
        // /work/softr directly instead of redirecting to a trailing slash.
        autoSubfolderIndex: false,
        // `/#work` and friends are the same page as `/`.
        filter: ({ path }) => !path.includes('#'),
        failOnError: true,
      },
    }),
    react(),
    tailwindcss(),
  ],
})
