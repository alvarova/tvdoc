import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './NotFound.css';

/**
 * Componente para página 404 - No encontrado
 */
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada | TVDoc</title>
        <meta name="description" content="La página que buscas no existe o ha sido movida." />
      </Helmet>
      
      <div className="not-found">
        <div className="container">
          <div className="not-found__content">
            <div className="not-found__illustration">
              <span className="not-found__number">404</span>
            </div>
            
            <h1 className="not-found__title">
              Página no encontrada
            </h1>
            
            <p className="not-found__description">
              Lo sentimos, la página que buscas no existe o ha sido movida.
              Puedes regresar al inicio o buscar el contenido que necesitas.
            </p>
            
            <div className="not-found__actions">
              <Link to="/" className="not-found__button not-found__button--primary">
                Ir al inicio
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="not-found__button not-found__button--secondary"
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
