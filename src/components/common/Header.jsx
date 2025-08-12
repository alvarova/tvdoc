import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWordPressCategories } from '../../hooks/useWordPress';
import './Header.css';

const Header = ({ isMobile, onMenuToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useWordPressCategories();

  useEffect(() => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('es-AR', options));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="site-header">
      <div className="header-top-bar">
        <div className="container">
          <div className="header-top-bar__left">
            <span className="header-top-bar__date">{currentDate}</span>
            <span className="header-top-bar__temp">16°C</span>
          </div>
          <div className="header-top-bar__right">
            <nav className="header-top-bar__nav">
              <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/institucional">Institucional</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-main__logo">
            <Link to="/">
              <img src="https://tvdoc.com.ar/wp-content/uploads/2021/03/logo.jpeg" alt="TvDoc" />
            </Link>
          </div>
          <div className="header-main__social">
            {/* Using text placeholders for icons */}
            <a href="https://www.facebook.com/tvdocsantafe" target="_blank" rel="noopener noreferrer">F</a>
            <a href="https://www.instagram.com/tvdoc.sf/" target="_blank" rel="noopener noreferrer">I</a>
            <a href="https://twitter.com/tvdoc" target="_blank" rel="noopener noreferrer">T</a>
            <a href="https://www.youtube.com/@TVDocSantaFe" target="_blank" rel="noopener noreferrer">Y</a>
          </div>
          <div className="header-main__search">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
              />
              <button type="submit">🔍</button>
            </form>
          </div>
          {isMobile && (
            <button onClick={onMenuToggle} className="mobile-menu-toggle">
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
        </div>
      </div>

      <div className="header-category-bar">
        <div className="container">
          <nav className="header-category-bar__nav">
            <ul>
              {!categoriesLoading && categories.map(category => (
                <li key={category.id}>
                  <Link to={`/categoria/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
