/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Variables de entorno personalizadas (PUBLIC_* / VITE_*)
  // readonly PUBLIC_API_URL: string;

  // BASE_URL viene de Vite pero se declara aquí por compatibilidad con el TS server
  readonly BASE_URL: string;
}
