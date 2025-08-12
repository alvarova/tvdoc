import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import useResponsive from './hooks/useResponsive';

// Importar componentes principales
import DesktopLayout from './components/desktop/DesktopLayout';
import MobileLayout from './components/mobile/MobileLayout';
import HomePage from './components/pages/HomePage';
import CategoryPage from './components/pages/CategoryPage';
import SearchPage from './components/pages/SearchPage';
import VideoPage from './components/pages/VideoPage';
import NotFound from './components/common/NotFound';

// Importar estilos
import './styles/globals.css';

/**
 * Componente principal de la aplicación TVDoc
 * Maneja el enrutamiento y la selección entre layouts móvil y desktop
 */
function App() {
  const { isMobile, isTablet } = useResponsive();

  // Determinar qué layout usar basado en el tamaño de pantalla
  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Ruta principal - Homepage */}
            <Route 
              path="/" 
              element={<Layout><HomePage /></Layout>}
            />
            
            {/* Ruta para videos individuales */}
            <Route 
              path="/video/:slug"
              element={<VideoPage isMobile={isMobile} />}
            />
            
            {/* Ruta para categorías */}
            <Route 
              path="/categoria/:categorySlug" 
              element={<Layout><CategoryPage /></Layout>}
            />
            
            {/* Ruta para búsqueda */}
            <Route 
              path="/buscar" 
              element={<Layout><SearchPage /></Layout>}
            />
            
            {/* Página 404 */}
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
