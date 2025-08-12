import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useWordPressVideo } from '../../hooks/useWordPress';
import { generateMetaTags, formatDateTime, getCategoryNames, getAuthorName } from '../../utils/helpers';
import Header from '../common/Header';
import '../common/ArticlePage.css'; // Reuse styles

const VideoPage = ({ isMobile }) => {
  const { slug } = useParams();

  // The hook expects an ID, but the route gives a slug.
  // This is a problem. I will need to fetch the video by slug.
  // The WordPress API can do this with `/video?slug=...`
  // I will need to update the `wordpressApi.js` and `useWordPress.js` to support this.

  // For now, I will assume the slug is the ID for prototyping purposes.
  // This will be fixed in the refactoring step.
  const { video, loading, error } = useWordPressVideo(slug);

  if (loading) {
    return (
      <div className="article-page">
        <Header isMobile={isMobile} />
        <main className="article-page__main">
          <div className="container skeleton-container">
            <div className="skeleton" style={{ height: '2rem', width: '70%', marginBottom: '1rem' }}></div>
            <div className="skeleton" style={{ height: '1rem', width: '50%', marginBottom: '2rem' }}></div>
            <div className="skeleton" style={{ height: '400px', marginBottom: '2rem' }}></div>
            <div className="skeleton" style={{ height: '1rem', marginBottom: '0.5rem' }}></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="article-page">
        <Header isMobile={isMobile} />
        <main className="article-page__main">
          <div className="container">
            <h1>Video no encontrado</h1>
            <Link to="/">Volver al inicio</Link>
          </div>
        </main>
      </div>
    );
  }

  const metaTags = generateMetaTags(video);
  const categories = getCategoryNames(video);
  const author = getAuthorName(video);
  const publishedDate = formatDateTime(video.date);

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        {/* Add other meta tags */}
      </Helmet>

      <div className="article-page">
        <Header isMobile={isMobile} />

        <main className="article-page__main">
          <div className="container">
            <article className="article-page__content">
              <header className="article-page__header">
                {categories.length > 0 && (
                  <div className="article-page__category">{categories[0]}</div>
                )}
                <h1
                  className="article-page__title"
                  dangerouslySetInnerHTML={{ __html: video.title?.rendered || '' }}
                />
                <div className="article-page__meta">
                  <span className="article-page__author">Por {author}</span>
                  <span className="article-page__separator">•</span>
                  <time className="article-page__date" dateTime={video.date}>
                    {publishedDate}
                  </time>
                </div>
              </header>

              {/* Video content */}
              <div
                className="article-page__body"
                dangerouslySetInnerHTML={{ __html: video.content?.rendered || '' }}
              />

            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default VideoPage;
