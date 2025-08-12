import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import useResponsive from './hooks/useResponsive';

// Layouts
import DesktopLayout from './components/desktop/DesktopLayout';
import MobileLayout from './components/mobile/MobileLayout';

// Pages
import HomePage from './components/pages/HomePage';
import InstitucionalPage from './components/pages/InstitucionalPage';
import ContactoPage from './components/pages/ContactoPage';
// import CategoryPage from './components/pages/CategoryPage'; // Will create this later
// import SearchPage from './components/pages/SearchPage'; // Will create this later
// import VideoPage from './components/pages/VideoPage'; // Will create this later
import NotFound from './components/common/NotFound';

// Styles
import './styles/globals.css';

function App() {
  const { isMobile } = useResponsive();
  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/institucional" element={<Layout><InstitucionalPage /></Layout>} />
            <Route path="/contacto" element={<Layout><ContactoPage /></Layout>} />
            
            {/* Placeholder for future routes */}
            {/* <Route path="/categoria/:categorySlug" element={<Layout><CategoryPage /></Layout>} /> */}
            {/* <Route path="/buscar" element={<Layout><SearchPage /></Layout>} /> */}
            {/* <Route path="/video/:slug" element={<VideoPage isMobile={isMobile} />} /> */}
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
