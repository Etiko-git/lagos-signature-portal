import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        app: "app.html",
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