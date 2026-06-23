import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El repositorio se publica en https://carbaxo.github.io/Mantenimiento/
// por lo que el base path debe coincidir con el nombre del repo.
export default defineConfig({
  plugins: [react()],
  base: '/Mantenimiento/',
})
