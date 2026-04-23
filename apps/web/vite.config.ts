import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path'

export default defineConfig({
  plugins: [react(), svgr()],
   resolve: {
    alias: {
      modules: path.resolve(__dirname, './src/modules'),
      layout: path.resolve(__dirname, './src/layout'),
    }
  },
  base: "/SudokuFlow/"
})
