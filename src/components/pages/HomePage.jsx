import React from 'react';
import { useWordPressVideoPositions } from '../../hooks/useWordPress';
import VideoPosition from './VideoPosition';
import './HomePage.css';

const HomePage = () => {
  const { positions, loading, error } = useWordPressVideoPositions();

  if (loading) {
    return <div className="homepage-loading">Cargando la portada...</div>;
  }

  if (error) {
    return <div className="homepage-error">Error al cargar la portada: {error}</div>;
  }

  return (
    <div className="homepage">
      <div className="homepage-grid">
        {positions && positions.length > 0 ? (
          positions.map(position => (
            <VideoPosition key={position.id} position={position} />
          ))
        ) : (
          <p>No se encontraron videos para mostrar en la portada.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
