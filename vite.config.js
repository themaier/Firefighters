import { defineConfig } from 'vite';
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import { ViteMinifyPlugin } from 'vite-plugin-minify'

const isProduction = process.env.BUILD_ENV === 'production';

export default defineConfig({
  base: '/Firefighters/',
  plugins: [
    isProduction ? obfuscatorPlugin({
      options: {
        debugProtection: true,
      },
    }) : null,
    // also minify html-file, JS-minification is automatically done
    isProduction ? ViteMinifyPlugin({}) : null
  ]
});