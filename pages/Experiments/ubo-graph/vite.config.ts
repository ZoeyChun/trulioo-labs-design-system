import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ghPagesBase = '/trulioo-labs-design-system/pages/Experiments/ubo-graph/site/'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : ghPagesBase,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'site',
    emptyOutDir: true,
  },
  server: {
    port: parseInt(process.env.PORT || '5173'),
    strictPort: false,
  },
}))
