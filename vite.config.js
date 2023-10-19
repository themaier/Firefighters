import { defineConfig } from 'vite';
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

const isProduction = process.env.BUILD_ENV === 'production';

export default defineConfig({
  plugins: [
    isProduction ? obfuscatorPlugin({
      options: {
        debugProtection: true,
      },
    }) : null
  ],
  build: {
    outDir: 'dist',
  }
});

// vite.config.js
// export default {
//   // base: '/Firefighters/',
//   build: {
//     outDir: 'dist',
//   }
// }