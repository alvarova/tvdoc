import React, { useState } from 'react';
import { useWordPressVideos } from '../../hooks/useWordPress';
import Header from '../common/Header';
import ArticleCard, { ArticleCardSkeleton } from '../common/ArticleCard';
import './DesktopLayout.css';

/**
 * Layout principal para vista desktop
 * Replica el diseño completo del sitio web original
 */
const DesktopLayout = ({ showCategory = false, showSearch = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Obtener videos principales
  const {
    posts,
    loading,
    error,
    totalPages,
    refreshPosts
  } = useWordPressVideos({
    page: 1,
    perPage: 12,
    autoFetch: true
  });

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
            {/* Área principal de contenido */}
            <section className="desktop-layout__primary">
              {/* Sección hero con artículo destacado */}
              {posts.length > 0 && !loading && (
                <section className="desktop-layout__hero">
                  <ArticleCard
                    post={posts[0]}
                    variant="featured"
                    showExcerpt={true}
                    showCategory={true}
                    showDate={true}
                  />
                </section>
              )}

              {/* Grid de videos principales */}
              <section className="desktop-layout__articles">
                <h2 className="desktop-layout__section-title">
                  Últimos Videos
                </h2>

                {loading ? (
                  <div className="articles-grid">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <ArticleCardSkeleton key={index} />
                    ))}
                  </div>
                ) : error ? (
                  <div className="desktop-layout__error">
                    <p>Error al cargar los videos. Por favor, intenta nuevamente.</p>
                    <button
                      onClick={refreshPosts}
                      className="desktop-layout__retry-button"
                    >
                      Reintentar
                    </button>
                  </div>
                ) : (
                  <div className="articles-grid">
                    {posts.slice(1).map((post) => (
                      <ArticleCard
                        key={post.id}
                        post={post}
                        variant="default"
                        showExcerpt={true}
                        showCategory={true}
                        showDate={true}
                      />
                    ))}
                  </div>
                )}
              </section>
            </section>

            {/* Sidebar */}
            <aside className="desktop-layout__sidebar">
              {/* Widget de categorías */}
              <div className="desktop-layout__widget">
                <h3 className="desktop-layout__widget-title">Categorías</h3>
                <ul className="desktop-layout__category-list">
                  <li><a href="/categoria/noticias">Noticias</a></li>
                  <li><a href="/categoria/documentales">Documentales</a></li>
                  <li><a href="/categoria/entretenimiento">Entretenimiento</a></li>
                  <li><a href="/categoria/deportes">Deportes</a></li>
                  <li><a href="/categoria/tecnologia">Tecnología</a></li>
                </ul>
              </div>

              {/* Widget de artículos populares */}
              <div className="desktop-layout__widget">
                <h3 className="desktop-layout__widget-title">Más Leídos</h3>
                <div className="desktop-layout__popular-articles">
                  {posts.slice(0, 5).map((post, index) => (
                    <ArticleCard
                      key={post.id}
                      post={post}
                      variant="compact"
                      showExcerpt={false}
                      showCategory={false}
                      showDate={true}
                    />
                  ))}
                </div>
              </div>

              {/* Espacio para publicidad */}
              <div className="desktop-layout__widget">
                <div className="desktop-layout__ad-space">
                  <div className="desktop-layout__ad-placeholder">
                    <span>Espacio Publicitario</span>
                  </div>
                </div>
              </div>
            </aside>
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
