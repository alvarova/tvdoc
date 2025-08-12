import React from 'react';
import { useWordPressPages } from '../../hooks/useWordPress';
import './Page.css'; // I'll create a generic stylesheet for pages

const InstitucionalPage = () => {
  const { pages, loading, error } = useWordPressPages();

  if (loading) {
    return <div className="page-loading">Cargando...</div>;
  }

  if (error) {
    return <div className="page-error">Error: {error}</div>;
  }

  const page = pages.find(p => p.slug === 'institucional-2');

  if (!page) {
    return <div className="page-error">Página no encontrada.</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{page.title.rendered}</h1>
      <div
        className="page-content"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </div>
  );
};

export default InstitucionalPage;
