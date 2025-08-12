import React from 'react';
import { useWordPressVideos } from '../../hooks/useWordPress';
import ArticleCard, { ArticleCardSkeleton } from '../common/ArticleCard';
import '../desktop/DesktopLayout.css'; // I'll reuse styles for now

const HomePage = () => {
  const {
    posts: videos,
    loading,
    error,
    refreshPosts: refreshVideos
  } = useWordPressVideos({
    page: 1,
    perPage: 13, // 1 featured + 12 in grid
    autoFetch: true
  });

  if (loading && videos.length === 0) {
    return (
      <div className="desktop-layout__primary">
        <section className="desktop-layout__hero">
          <ArticleCardSkeleton variant="featured" />
        </section>
        <section className="desktop-layout__articles">
          <h2 className="desktop-layout__section-title">Últimos Videos</h2>
          <div className="articles-grid">
            {Array.from({ length: 12 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="desktop-layout__error">
        <p>Error al cargar los videos. Por favor, intenta nuevamente.</p>
        <button
          onClick={refreshVideos}
          className="desktop-layout__retry-button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const featuredVideo = videos[0];
  const latestVideos = videos.slice(1);

  return (
    <div className="desktop-layout__primary">
      {/* Sección hero con artículo destacado */}
      {featuredVideo && (
        <section className="desktop-layout__hero">
          <ArticleCard
            post={featuredVideo}
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

        <div className="articles-grid">
          {latestVideos.map((video) => (
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
      </section>
    </div>
  );
};

export default HomePage;
