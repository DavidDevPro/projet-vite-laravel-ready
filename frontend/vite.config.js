/* global process */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Plugin existant
  ],
  //name_files correspond au nom du dossier ou se trouvera le site en production (hors racine domaine)
  //si racine il faut mettre "/"
  base: process.env.NODE_ENV === "production" ? "/name_files" : "/",
  //permet de rediriger les routes vers index.html
  server: {
    historyApiFallback: true,
  },
  //déclaration des alias pour les chemins
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@react': fileURLToPath(new URL('./src/react', import.meta.url)),
      '@redux': fileURLToPath(new URL('./src/redux', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config.js', import.meta.url)),
      '@apiConfig': fileURLToPath(new URL('./src/apiConfig.js', import.meta.url)),
      '@pictureConfig': fileURLToPath(new URL('./src/pictureConfig.js', import.meta.url)),
    },    
  },
});
