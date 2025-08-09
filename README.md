# TVDoc Web App

Aplicación web responsive que consume el contenido del sitio WordPress de TVDoc y lo presenta con interfaces optimizadas para escritorio y dispositivos móviles.

## Requisitos
- Node.js 20 LTS
- npm 10 o superior

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```
Visite `http://localhost:5173` para ver la aplicación.

## Compilación
```bash
npm run build
```
Los archivos de producción se generan en `dist/`. Para revisarlos localmente:
```bash
npm run preview
```

## Estructura del proyecto
- `src/`: componentes React, hooks, servicios y estilos.
- `src/App.jsx`: enrutamiento y selección de layout móvil o de escritorio.
- `src/services/`: consumo del WordPress REST API mediante Axios.
