import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})




/// <reference types="vite/client" />

// Augment Window for the global function from script.js
declare global {
  interface Window {
    loginWithMyIDOnSameDevice: () => void;
  }
}

export {}; // Makes this a module for global augmentation to take effect