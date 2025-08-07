import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useWordPressPost } from '../../hooks/useWordPress';
import { generateMetaTags, formatDateTime, getCategoryNames, getAuthorName } from '../../utils/helpers';
import Header from './Header';
import './ArticlePage.css';

/**
 * Componente para mostrar un artículo completo
 * @param {Object} props - Props del componente
 * @param {boolean} props.isMobile - Si es vista móvil
 * @param {boolean} props.isTablet - Si es vista tablet
 */
const ArticlePage = ({ isMobile, isTablet }) => {
  const { slug } = useParams();
  const { post, loading, error } = useWordPressPost(slug);

  if (loading) {
    return (
      <div className="article-page">
        <Header isMobile={isMobile} />
        <main className="article-page__main">
          <div className="container">
            <div className="article-page__skeleton">
              <div className="skeleton" style={{ height: '2rem', width: '70%', marginBottom: '1rem' }}></div>
              <div className="skeleton" style={{ height: '1rem', width: '50%', marginBottom: '2rem' }}></div>
              <div className="skeleton" style={{ height: '300px', marginBottom: '2rem' }}></div>
              <div className="skeleton" style={{ height: '1rem', marginBottom: '0.5rem' }}></div>
              <div className="skeleton" style={{ height: '1rem', marginBottom: '0.5rem' }}></div>
              <div className="skeleton" style={{ height: '1rem', width: '80%' }}></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="article-page">
        <Header isMobile={isMobile} />
        <main className="article-page__main">
          <div className="container">
            <div className="article-page__error">
              <h1>Artículo no encontrado</h1>
              <p>Lo sentimos, el artículo que buscas no existe o ha sido removido.</p>
              <Link to="/" className="article-page__back-button">
                Volver al inicio
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const metaTags = generateMetaTags(post);
  const categories = getCategoryNames(post);
  const author = getAuthorName(post);
  const publishedDate = formatDateTime(post.date);

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={metaTags.image} />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:type" content={metaTags.type} />
        <meta property="article:published_time" content={metaTags.publishedTime} />
        <meta property="article:modified_time" content={metaTags.modifiedTime} />
        <meta property="article:author" content={metaTags.author} />
        <meta property="article:section" content={metaTags.section} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={metaTags.image} />
      </Helmet>

      <div className="article-page">
        <Header isMobile={isMobile} />
        
        <main className="article-page__main">
          <div className="container">
            <article className="article-page__content">
              {/* Breadcrumb */}
              <nav className="article-page__breadcrumb">
                <Link to="/">Inicio</Link>
                {categories.length > 0 && (
                  <>
                    <span>/</span>
                    <Link to={`/categoria/${categories[0].toLowerCase()}`}>
                      {categories[0]}
                    </Link>
                  </>
                )}
                <span>/</span>
                <span>{post.title?.rendered}</span>
              </nav>

              {/* Header del artículo */}
              <header className="article-page__header">
                {categories.length > 0 && (
                  <div className="article-page__category">
                    {categories[0]}
                  </div>
                )}
                
                <h1 
                  className="article-page__title"
                  dangerouslySetInnerHTML={{ __html: post.title?.rendered || '' }}
                />
                
                <div className="article-page__meta">
                  <span className="article-page__author">Por {author}</span>
                  <span className="article-page__separator">•</span>
                  <time className="article-page__date" dateTime={post.date}>
                    {publishedDate}
                  </time>
                </div>
              </header>

              {/* Imagen destacada */}
              {post._embedded?.['wp:featuredmedia']?.[0] && (
                <div className="article-page__featured-image">
                  <img 
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title?.rendered}
                    className="article-page__image"
                  />
                  {post._embedded['wp:featuredmedia'][0].caption?.rendered && (
                    <figcaption 
                      className="article-page__image-caption"
                      dangerouslySetInnerHTML={{ 
                        __html: post._embedded['wp:featuredmedia'][0].caption.rendered 
                      }}
                    />
                  )}
                </div>
              )}

              {/* Contenido del artículo */}
              <div 
                className="article-page__body"
                dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }}
              />

              {/* Footer del artículo */}
              <footer className="article-page__footer">
                {categories.length > 0 && (
                  <div className="article-page__tags">
                    <span className="article-page__tags-label">Categorías:</span>
                    {categories.map((category, index) => (
                      <Link 
                        key={index}
                        to={`/categoria/${category.toLowerCase()}`}
                        className="article-page__tag"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Botones de compartir */}
                <div className="article-page__share">
                  <span className="article-page__share-label">Compartir:</span>
                  <div className="article-page__share-buttons">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-page__share-button article-page__share-button--facebook"
                      aria-label="Compartir en Facebook"
                    >
                      Facebook
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title?.rendered || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-page__share-button article-page__share-button--twitter"
                      aria-label="Compartir en Twitter"
                    >
                      Twitter
                    </a>
                    <a 
                      href={`https://wa.me/?text=${encodeURIComponent(`${post.title?.rendered} ${window.location.href}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-page__share-button article-page__share-button--whatsapp"
                      aria-label="Compartir en WhatsApp"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default ArticlePage;
