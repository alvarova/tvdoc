import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, createExcerpt, formatDate, getCategoryNames } from '../../utils/helpers';
import './ArticleCard.css';

/**
 * Componente para mostrar una tarjeta de artículo
 * @param {Object} props - Props del componente
 * @param {Object} props.post - Datos del post de WordPress
 * @param {string} props.variant - Variante del diseño ('default', 'featured', 'compact')
 * @param {boolean} props.showExcerpt - Si mostrar el extracto
 * @param {boolean} props.showCategory - Si mostrar la categoría
 * @param {boolean} props.showDate - Si mostrar la fecha
 */
const ArticleCard = ({ 
  post, 
  variant = 'default',
  showExcerpt = true,
  showCategory = true,
  showDate = true,
  className = ''
}) => {
  if (!post) return null;

  const imageUrl = getImageUrl(post, 'medium');
  const excerpt = createExcerpt(post.content?.rendered || post.excerpt?.rendered || '', 120);
  const categories = getCategoryNames(post);
  const formattedDate = formatDate(post.date);

  const cardClasses = [
    'article-card',
    `article-card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <article className={cardClasses}>
      <Link to={`/articulo/${post.slug}`} className="article-card__link">
        {/* Imagen del artículo */}
        <div className="article-card__image-container">
          <img 
            src={imageUrl}
            alt={post.title?.rendered || ''}
            className="article-card__image"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          
          {/* Overlay con categoría */}
          {showCategory && categories.length > 0 && (
            <div className="article-card__category">
              {categories[0]}
            </div>
          )}
        </div>

        {/* Contenido del artículo */}
        <div className="article-card__content">
          {/* Título */}
          <h3 
            className="article-card__title"
            dangerouslySetInnerHTML={{ __html: post.title?.rendered || '' }}
          />

          {/* Extracto */}
          {showExcerpt && excerpt && (
            <p className="article-card__excerpt">
              {excerpt}
            </p>
          )}

          {/* Meta información */}
          <div className="article-card__meta">
            {showDate && (
              <time className="article-card__date" dateTime={post.date}>
                {formattedDate}
              </time>
            )}
            
            {/* Tiempo de lectura estimado */}
            <span className="article-card__read-time">
              {Math.max(1, Math.ceil((post.content?.rendered?.length || 0) / 1000))} min de lectura
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

/**
 * Componente para mostrar el esqueleto de carga de un artículo
 */
export const ArticleCardSkeleton = ({ variant = 'default' }) => {
  return (
    <div className={`article-card article-card--${variant} article-card--skeleton`}>
      <div className="article-card__image-container skeleton">
        <div className="article-card__image skeleton"></div>
      </div>
      <div className="article-card__content">
        <div className="article-card__title skeleton" style={{ height: '1.5rem', marginBottom: '0.5rem' }}></div>
        <div className="article-card__title skeleton" style={{ height: '1.5rem', width: '70%', marginBottom: '1rem' }}></div>
        <div className="article-card__excerpt skeleton" style={{ height: '1rem', marginBottom: '0.25rem' }}></div>
        <div className="article-card__excerpt skeleton" style={{ height: '1rem', width: '80%', marginBottom: '1rem' }}></div>
        <div className="article-card__meta">
          <div className="skeleton" style={{ height: '0.875rem', width: '120px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
