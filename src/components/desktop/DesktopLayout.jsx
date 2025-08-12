import React, { useState } from 'react';
import Header from '../common/Header';
import Sidebar from './Sidebar'; // Assuming Sidebar component is created
import './DesktopLayout.css';

/**
 * Layout principal para vista desktop
 * Proporciona la estructura de la página con Header, Footer y Sidebar
 */
const DesktopLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="desktop-layout">
      <Header 
        isMobile={false} 
        onMenuToggle={toggleMenu}
      />
      
      <main className="desktop-layout__main">
        <div className="container">
          <div className="desktop-layout__content">
            {/* Área principal de contenido (renderiza la página actual) */}
            <div className="desktop-layout__primary">
              {children}
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="desktop-layout__footer">
        <div className="container">
          <div className="desktop-layout__footer-content">
            <div className="desktop-layout__footer-section">
              <h4>TVDoc</h4>
              <p>Tu fuente de noticias y entretenimiento confiable.</p>
            </div>
            
            <div className="desktop-layout__footer-section">
              <h4>Enlaces</h4>
              <ul>
                <li><a href="/about">Acerca de</a></li>
                <li><a href="/contact">Contacto</a></li>
                <li><a href="/privacy">Privacidad</a></li>
              </ul>
            </div>
            
            <div className="desktop-layout__footer-section">
              <h4>Síguenos</h4>
              <div className="desktop-layout__social-links">
                <a href="#" aria-label="Facebook">Facebook</a>
                <a href="#" aria-label="Twitter">Twitter</a>
                <a href="#" aria-label="Instagram">Instagram</a>
              </div>
            </div>
          </div>
          
          <div className="desktop-layout__footer-bottom">
            <p>&copy; 2024 TVDoc. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DesktopLayout;
