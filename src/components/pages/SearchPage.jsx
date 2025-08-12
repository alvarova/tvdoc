import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWordPressVideoSearch } from '../../hooks/useWordPress';
import ArticleCard, { ArticleCardSkeleton } from '../common/ArticleCard';
import '../desktop/DesktopLayout.css'; // Reusing styles

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  const {
    searchResults: videos,
    loading,
    error,
    search
  } = useWordPressVideoSearch();

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);

  if (loading) {
    return (
      <div className="desktop-layout__primary">
        <h2 className="desktop-layout__section-title">Buscando videos...</h2>
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
        <p>Error al realizar la búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="desktop-layout__primary">
      <h2 className="desktop-layout__section-title">
        Resultados para: "{query}"
      </h2>

      {videos.length > 0 ? (
        <div className="articles-grid">
          {videos.map((video) => (
            <ArticleCard
              key={video.id}
              post={video}
              variant="default"
              showExcerpt={true}
              showCategory={true}
              showDate={true}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron videos para tu búsqueda.</p>
      )}
    </div>
  );
};

export default SearchPage;
