import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function injectSiteUrlForMeta(siteOrigin: string): Plugin {
  return {
    name: 'inject-site-url-meta',
    transformIndexHtml(html) {
      const origin = siteOrigin.replace(/\/+$/, '')
      return html.split('%VITE_SITE_URL%').join(origin)
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL ?? ''

  return {
  plugins: [vue(), injectSiteUrlForMeta(siteUrl)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: ['..']
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('pinia')) {
              return 'vendor'
            }
            if (id.includes('markdown-it') || id.includes('highlight.js')) {
              return 'markdown'
            }
            if (id.includes('mermaid')) {
              return 'mermaid'
            }
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'markdown-it', 'mermaid', 'fuse.js']
  }
  }
})
