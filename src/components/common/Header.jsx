import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWordPressCategories } from '../../hooks/useWordPress';
import './Header.css';

/**
 * Componente Header común para desktop y mobile
 * @param {Object} props - Props del componente
 * @param {boolean} props.isMobile - Si es vista móvil
 * @param {Function} props.onMenuToggle - Función para toggle del menú móvil
 */
const Header = ({ isMobile = false, onMenuToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useWordPressCategories();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm('');
    }
  };

  return (
    <header className={`header ${isMobile ? 'header--mobile' : 'header--desktop'}`}>
      <div className="header__container container">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <img 
              src="/logo-tvdoc.png" 
              alt="TVDoc" 
              className="header__logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
            <span className="header__logo-text">TVDoc</span>
          </Link>
        </div>

        {/* Navegación Desktop */}
        {!isMobile && (
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link to="/" className="header__nav-link">Inicio</Link>
              </li>
              {!categoriesLoading && categories.slice(0, 6).map(category => (
                <li key={category.id} className="header__nav-item">
                  <Link to={`/categoria/${category.slug}`} className="header__nav-link">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Controles del header */}
        <div className="header__controls">
          {/* Búsqueda */}
          <div className={`header__search ${showSearch ? 'header__search--active' : ''}`}>
            {!isMobile || showSearch ? (
              <form onSubmit={handleSearchSubmit} className="header__search-form">
                <input
                  type="text"
                  placeholder="Buscar videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="header__search-input"
                />
                <button 
                  type="submit" 
                  className="header__search-button"
                >
                  🔍
                </button>
              </form>
            ) : (
              <button 
                onClick={handleSearchToggle}
                className="header__search-toggle"
                aria-label="Abrir búsqueda"
              >
                🔍
              </button>
            )}
            
            {isMobile && showSearch && (
              <button 
                onClick={handleSearchToggle}
                className="header__search-close"
                aria-label="Cerrar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Menú hamburguesa para móvil */}
          {isMobile && (
            <button 
              onClick={onMenuToggle}
              className="header__menu-toggle"
              aria-label="Abrir menú"
            >
              <span className="header__menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
