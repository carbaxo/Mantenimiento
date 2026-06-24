# 🔧 Garaje · App de Mantenimiento

Aplicación web para llevar el mantenimiento de:

- 🚗 **Seat Altea XL 1.6 TDI** (2010)
- 🏍️ **Voge 500R** (2020)

Hecha con **React + Vite** y desplegada en **GitHub Pages**. El acceso es por
**enlace mágico al email** (Supabase Auth) y los datos se guardan en la nube
(**Supabase / Postgres**), sincronizados entre todos tus dispositivos.

## ✨ Funciones

- **Acceso por email**: escribes tu correo, recibes un enlace y entras (sin contraseñas).
  Tus datos te siguen en cualquier dispositivo.
- **Resumen / Avisos**: calcula qué mantenimiento toca pronto o está vencido,
  según los km actuales y la fecha de la última intervención.
- **Plan**: tablas con todas las operaciones, periodicidad (km / tiempo) y
  especificaciones (aceites, normas, cantidades, holguras…), agrupadas por categoría.
- **Registrar**: anota cada operación con fecha, kilómetros, coste y notas.
- **Historial**: lista de intervenciones y totales de gasto (anual e histórico).

## ⚙️ Configuración de Supabase (una vez)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, ejecuta el script [`supabase/schema.sql`](supabase/schema.sql).
3. En **Authentication → URL Configuration**, añade la URL de la app
   (`https://carbaxo.github.io/Mantenimiento/`) como *Site URL* y *Redirect URL*.
   El acceso por email (enlace mágico) viene activado de serie; no hace falta Google Cloud.
4. Copia *Project URL* y *anon public key* en `src/lib/supabaseConfig.js`.

La *anon key* es pública por diseño; la seguridad la garantiza el Row Level
Security definido en el esquema (cada usuario sólo ve sus propios datos).

## 🗂️ Planes de mantenimiento

Los intervalos se han elaborado a partir de los manuales y programas oficiales
SEAT/VW y VOGE, contrastando varias fuentes y aplicando el criterio **más
conservador** (lo que antes ocurra entre kilómetros y tiempo). Las fuentes
consultadas aparecen al final de la pestaña «Plan» de cada vehículo.

> ⚠️ Es una guía de referencia. Para valores exactos según tu vehículo
> concreto (p. ej. el régimen de servicio del Altea o la rejilla de intervalos
> del 500R), consulta el libro de servicio o el manual oficial.

## 🚀 Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## 📦 Despliegue

Cada push a la rama de trabajo dispara el workflow de GitHub Actions
(`.github/workflows/deploy.yml`), que construye la app y la publica en
GitHub Pages.

URL: **https://carbaxo.github.io/Mantenimiento/**

## 🔒 Privacidad

El acceso requiere verificar tu email mediante un enlace de un solo uso. Tus
datos (kilómetros, registros, gastos) se guardan en tu proyecto de Supabase y,
gracias al Row Level Security, sólo son accesibles por tu propio usuario.
