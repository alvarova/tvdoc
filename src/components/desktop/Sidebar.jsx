import React from 'react';
import { useWordPressCategories, useWordPressVideos } from '../../hooks/useWordPress';
import { Link } from 'react-router-dom';
import ArticleCard from '../common/ArticleCard';
import './DesktopLayout.css'; // Reuse styles

const Sidebar = () => {
  const { categories, loading: categoriesLoading } = useWordPressCategories();
  const { posts: popularVideos, loading: videosLoading } = useWordPressVideos({ perPage: 5, autoFetch: true });

  return (
    <aside className="desktop-layout__sidebar">
      {/* Widget de categorías */}
      <div className="desktop-layout__widget">
        <h3 className="desktop-layout__widget-title">Categorías</h3>
        {categoriesLoading ? (
          <p>Cargando categorías...</p>
        ) : (
          <ul className="desktop-layout__category-list">
            {categories.map(category => (
              <li key={category.id}>
                <Link to={`/categoria/${category.slug}`}>
                  {category.name} ({category.count})
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Widget de artículos populares */}
      <div className="desktop-layout__widget">
        <h3 className="desktop-layout__widget-title">Más Vistos</h3>
        {videosLoading ? (
          <p>Cargando videos...</p>
        ) : (
          <div className="desktop-layout__popular-articles">
            {popularVideos.map((post) => (
              <ArticleCard
                key={post.id}
                post={post}
                variant="compact"
              />
            ))}
          </div>
        )}
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
  );
};

export default Sidebar;
