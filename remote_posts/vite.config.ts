import federation from '@originjs/vite-plugin-federation'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: 'remote-posts',
      filename: 'remoteEntry.js',
      exposes: {
        './AppPosts': './src/app/app.root',
      },
      shared: [
        'react',
        'react-dom',
        '@mui/material',
        '@fontsource/roboto',
        '@mui/icons-material',
        '@emotion/styled',
        '@emotion/react'
      ]
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      app: path.resolve('src/app'),
      entities: path.resolve('src/entities'),
      features: path.resolve('src/features'),
      pages: path.resolve('src/pages'),
      shared: path.resolve('src/shared'),
      widgets: path.resolve('src/widgets')
    }
  }
})
