import React, { useState } from 'react';
import { useWordPressVideos } from '../../hooks/useWordPress';
import Header from '../common/Header';
import './MobileLayout.css';

/**
 * Layout principal para vista móvil
 * Implementa el sistema de slides con artículos y publicidad rotativa
 */
const MobileLayout = ({ showCategory = false, showSearch = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Obtener videos para los diferentes slides
  const { 
    posts, 
    loading, 
    error, 
    refreshPosts 
  } = useWordPressVideos({ 
    page: 1, 
    perPage: 15, // 7 para el primer slide + 4 + 4 para los siguientes
    autoFetch: true 
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Dividir posts en grupos para los slides
  const firstSlideArticles = posts.slice(0, 7);
  const secondSlideArticles = posts.slice(7, 11);
  const thirdSlideArticles = posts.slice(11, 15);

  return (
    <div className="mobile-layout">
      <Header 
        isMobile={true} 
        onMenuToggle={toggleMenu}
      />
      
      {/* Menú móvil overlay */}
      {menuOpen && (
        <div className="mobile-layout__menu-overlay">
          <div className="mobile-layout__menu">
            <div className="mobile-layout__menu-header">
              <h3>Menú</h3>
              <button 
                onClick={toggleMenu}
                className="mobile-layout__menu-close"
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>
            <nav className="mobile-layout__nav">
              <ul className="mobile-layout__nav-list">
                <li><a href="/" onClick={toggleMenu}>Inicio</a></li>
                <li><a href="/categoria/noticias" onClick={toggleMenu}>Noticias</a></li>
                <li><a href="/categoria/documentales" onClick={toggleMenu}>Documentales</a></li>
                <li><a href="/categoria/entretenimiento" onClick={toggleMenu}>Entretenimiento</a></li>
                <li><a href="/categoria/deportes" onClick={toggleMenu}>Deportes</a></li>
                <li><a href="/categoria/tecnologia" onClick={toggleMenu}>Tecnología</a></li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      <main className="mobile-layout__main">
        {loading ? (
          <div className="mobile-layout__loading">
            <div className="mobile-layout__loading-spinner"></div>
            <p>Cargando videos...</p>
          </div>
        ) : error ? (
          <div className="mobile-layout__error">
            <p>Error al cargar los videos</p>
            <button onClick={refreshPosts}>Reintentar</button>
          </div>
        ) : (
          <>
            {/* Primer slide - 7 videos más recientes */}
            {firstSlideArticles.length > 0 && (
              <section className="mobile-layout__slide-section">
                <h2 className="mobile-layout__slide-title">Últimos Videos</h2>
                <div className="mobile-layout__articles-slider" id="slider-1">
                  <div className="mobile-layout__articles-container">
                    {firstSlideArticles.map((post, index) => (
                      <article key={post.id} className="mobile-layout__article-slide">
                        <a href={`/articulo/${post.slug}`} className="mobile-layout__article-link">
                          <div className="mobile-layout__article-image">
                            <img 
                              src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg'}
                              alt={post.title?.rendered || ''}
                              loading="lazy"
                            />
                          </div>
                          <div className="mobile-layout__article-content">
                            <h3 
                              className="mobile-layout__article-title"
                              dangerouslySetInnerHTML={{ __html: post.title?.rendered || '' }}
                            />
                            <p className="mobile-layout__article-excerpt">
                              {post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                            </p>
                            <div className="mobile-layout__article-meta">
                              <span className="mobile-layout__article-date">
                                {new Date(post.date).toLocaleDateString('es-AR')}
                              </span>
                            </div>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>
                  
                  {/* Indicadores de slide */}
                  <div className="mobile-layout__slide-indicators">
                    {firstSlideArticles.map((_, index) => (
                      <button 
                        key={index}
                        className={`mobile-layout__slide-indicator ${index === 0 ? 'active' : ''}`}
                        aria-label={`Ir al artículo ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Primera sección de publicidad */}
            <section className="mobile-layout__ad-section">
              <div className="mobile-layout__ad-container">
                <div className="mobile-layout__ad-placeholder">
                  <span>Publicidad</span>
                </div>
              </div>
            </section>

            {/* Segundo slide - 4 videos */}
            {secondSlideArticles.length > 0 && (
              <section className="mobile-layout__slide-section">
                <h2 className="mobile-layout__slide-title">Más Videos</h2>
                <div className="mobile-layout__articles-slider" id="slider-2">
                  <div className="mobile-layout__articles-container">
                    {secondSlideArticles.map((post) => (
                      <article key={post.id} className="mobile-layout__article-slide">
                        <a href={`/articulo/${post.slug}`} className="mobile-layout__article-link">
                          <div className="mobile-layout__article-image">
                            <img 
                              src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg'}
                              alt={post.title?.rendered || ''}
                              loading="lazy"
                            />
                          </div>
                          <div className="mobile-layout__article-content">
                            <h3 
                              className="mobile-layout__article-title"
                              dangerouslySetInnerHTML={{ __html: post.title?.rendered || '' }}
                            />
                            <p className="mobile-layout__article-excerpt">
                              {post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                            </p>
                            <div className="mobile-layout__article-meta">
                              <span className="mobile-layout__article-date">
                                {new Date(post.date).toLocaleDateString('es-AR')}
                              </span>
                            </div>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>
                  
                  <div className="mobile-layout__slide-indicators">
                    {secondSlideArticles.map((_, index) => (
                      <button 
                        key={index}
                        className={`mobile-layout__slide-indicator ${index === 0 ? 'active' : ''}`}
                        aria-label={`Ir al artículo ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Segunda sección de publicidad */}
            <section className="mobile-layout__ad-section">
              <div className="mobile-layout__ad-container">
                <div className="mobile-layout__ad-placeholder">
                  <span>Publicidad</span>
                </div>
              </div>
            </section>

            {/* Tercer slide - 4 videos */}
            {thirdSlideArticles.length > 0 && (
              <section className="mobile-layout__slide-section">
                <h2 className="mobile-layout__slide-title">Videos Destacados</h2>
                <div className="mobile-layout__articles-slider" id="slider-3">
                  <div className="mobile-layout__articles-container">
                    {thirdSlideArticles.map((post) => (
                      <article key={post.id} className="mobile-layout__article-slide">
                        <a href={`/articulo/${post.slug}`} className="mobile-layout__article-link">
                          <div className="mobile-layout__article-image">
                            <img 
                              src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg'}
                              alt={post.title?.rendered || ''}
                              loading="lazy"
                            />
                          </div>
                          <div className="mobile-layout__article-content">
                            <h3 
                              className="mobile-layout__article-title"
                              dangerouslySetInnerHTML={{ __html: post.title?.rendered || '' }}
                            />
                            <p className="mobile-layout__article-excerpt">
                              {post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                            </p>
                            <div className="mobile-layout__article-meta">
                              <span className="mobile-layout__article-date">
                                {new Date(post.date).toLocaleDateString('es-AR')}
                              </span>
                            </div>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>
                  
                  <div className="mobile-layout__slide-indicators">
                    {thirdSlideArticles.map((_, index) => (
                      <button 
                        key={index}
                        className={`mobile-layout__slide-indicator ${index === 0 ? 'active' : ''}`}
                        aria-label={`Ir al artículo ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MobileLayout;
