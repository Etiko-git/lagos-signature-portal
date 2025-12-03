import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        app: resolve(__dirname, "app.html"),
      },
    },
  },
});



// /// <reference types="vite/client" />

// // Augment Window for the global function from script.js
// declare global {
//   interface Window {
//     loginWithMyIDOnSameDevice: () => void;
//   }
// }

// export {}; // Makes this a module for global augmentation to take effect