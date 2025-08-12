import axios from 'axios';

const WORDPRESS_API_BASE = 'https://tvdoc.com.ar/wp-json/wp/v2';

// Configuración de axios para la API de WordPress
const wordpressAPI = axios.create({
  baseURL: WORDPRESS_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para manejo de errores
wordpressAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('WordPress API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Servicio para interactuar con la API REST de WordPress
 */
export const WordPressService = {
  /**
   * Obtiene los videos más recientes
   * @param {number} page - Número de página (por defecto 1)
   * @param {number} perPage - Videos por página (por defecto 10)
   * @param {string} categories - IDs de categorías separadas por coma
   * @returns {Promise} Promesa con los datos de los videos
   */
  async getVideos(page = 1, perPage = 10, categories = '') {
    try {
      const params = {
        page,
        per_page: perPage,
        _embed: true, // Incluye media y otros datos relacionados
        status: 'publish',
        orderby: 'date',
        order: 'desc'
      };

      if (categories) {
        params.categories = categories;
      }

      const response = await wordpressAPI.get('/video', { params });
      return {
        posts: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages']) || 1,
        totalPosts: parseInt(response.headers['x-wp-total']) || 0
      };
    } catch (error) {
      throw new Error(`Error fetching videos: ${error.message}`);
    }
  },

  /**
   * Obtiene un video específico por ID
   * @param {number} id - ID del video
   * @returns {Promise} Promesa con los datos del video
   */
  async getVideo(id) {
    try {
      const response = await wordpressAPI.get(`/video/${id}`, {
        params: { _embed: true }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching video ${id}: ${error.message}`);
    }
  },

  /**
   * Busca videos por término
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} page - Número de página
   * @param {number} perPage - Videos por página
   * @returns {Promise} Promesa con los resultados de búsqueda
   */
  async searchVideos(searchTerm, page = 1, perPage = 10) {
    try {
      const response = await wordpressAPI.get('/video', {
        params: {
          search: searchTerm,
          page,
          per_page: perPage,
          _embed: true,
          status: 'publish'
        }
      });
      
      return {
        posts: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages']) || 1,
        totalPosts: parseInt(response.headers['x-wp-total']) || 0
      };
    } catch (error) {
      throw new Error(`Error searching videos: ${error.message}`);
    }
  },

  /**
   * Obtiene las categorías de videos
   * @returns {Promise} Promesa con las categorías de videos
   */
  async getVideoCategories() {
    try {
      const response = await wordpressAPI.get('/categoria_de_video');
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching video categories: ${error.message}`);
    }
  },

  /**
   * Obtiene las posiciones de los videos para la home
   * @returns {Promise} Promesa con las posiciones de los videos
   */
  async getVideoPositions() {
    try {
      const response = await wordpressAPI.get('/posicion_de_video');
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching video positions: ${error.message}`);
    }
  },

  /**
   * Obtiene las páginas (para Institucional, Contacto, etc.)
   * @returns {Promise} Promesa con los datos de las páginas
   */
  async getPages() {
    try {
      const response = await wordpressAPI.get('/pages');
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching pages: ${error.message}`);
    }
  }
};

export default WordPressService;
