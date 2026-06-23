# 🔧 Garaje · App de Mantenimiento

Aplicación web para llevar el mantenimiento de:

- 🚗 **Seat Altea XL 1.6 TDI** (2010)
- 🏍️ **Voge 500R** (2020)

Hecha con **React + Vite** y desplegada en **GitHub Pages**. Los datos se
guardan en el propio dispositivo (`localStorage`), no se envían a ningún servidor.

## ✨ Funciones

- **Resumen / Avisos**: calcula qué mantenimiento toca pronto o está vencido,
  según los km actuales y la fecha de la última intervención.
- **Plan**: tablas con todas las operaciones, periodicidad (km / tiempo) y
  especificaciones (aceites, normas, cantidades, holguras…), agrupadas por categoría.
- **Registrar**: anota cada operación con fecha, kilómetros, coste y notas.
- **Historial**: lista de intervenciones y totales de gasto (anual e histórico).

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

Toda la información (kilómetros, registros, gastos) se almacena únicamente en
tu navegador. Si cambias de dispositivo o borras los datos del navegador, se
perderá el historial.
