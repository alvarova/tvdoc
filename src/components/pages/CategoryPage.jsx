import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWordPressVideos, useWordPressCategories } from '../../hooks/useWordPress';
import ArticleCard, { ArticleCardSkeleton } from '../common/ArticleCard';
import '../desktop/DesktopLayout.css'; // Reusing styles

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [categoryId, setCategoryId] = useState(null);

  // 1. Fetch all categories
  const { categories, loading: categoriesLoading } = useWordPressCategories();

  // 2. Find the category ID from the slug once categories are loaded
  useEffect(() => {
    if (categories.length > 0) {
      const currentCategory = categories.find(cat => cat.slug === categorySlug);
      if (currentCategory) {
        setCategoryId(currentCategory.id);
      }
    }
  }, [categories, categorySlug]);

  // 3. Fetch videos for the found category ID
  const {
    posts: videos,
    loading: videosLoading,
    error,
    refreshPosts: refreshVideos
  } = useWordPressVideos({
    categories: categoryId,
    perPage: 12,
    autoFetch: !!categoryId // Only fetch when categoryId is known
  });

  const loading = categoriesLoading || (videosLoading && videos.length === 0);

  if (loading) {
    return (
      <div className="desktop-layout__primary">
        <h2 className="desktop-layout__section-title">Cargando videos...</h2>
        <div className="articles-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="desktop-layout__error">
        <p>Error al cargar los videos de esta categoría.</p>
        <button
          onClick={refreshVideos}
          className="desktop-layout__retry-button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="desktop-layout__primary">
      <h2 className="desktop-layout__section-title">
        Categoría: {categorySlug}
      </h2>

      {videos.length > 0 ? (
        <div className="articles-grid">
          {videos.map((video) => (
            <ArticleCard
              key={video.id}
              post={video}
              variant="default"
              showExcerpt={true}
              showCategory={false} // Already in a category context
              showDate={true}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron videos en esta categoría.</p>
      )}
    </div>
  );
};

export default CategoryPage;
