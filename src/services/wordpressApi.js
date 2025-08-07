import axios from 'axios';

const WORDPRESS_API_BASE = 'https://www.tvdoc.com.ar/wp-json/wp/v2';

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
   * Obtiene los posts más recientes
   * @param {number} page - Número de página (por defecto 1)
   * @param {number} perPage - Posts por página (por defecto 10)
   * @param {string} categories - IDs de categorías separadas por coma
   * @returns {Promise} Promesa con los datos de los posts
   */
  async getPosts(page = 1, perPage = 10, categories = '') {
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

      const response = await wordpressAPI.get('/posts', { params });
      return {
        posts: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages']) || 1,
        totalPosts: parseInt(response.headers['x-wp-total']) || 0
      };
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  },

  /**
   * Obtiene un post específico por ID
   * @param {number} id - ID del post
   * @returns {Promise} Promesa con los datos del post
   */
  async getPost(id) {
    try {
      const response = await wordpressAPI.get(`/posts/${id}`, {
        params: { _embed: true }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching post ${id}: ${error.message}`);
    }
  },

  /**
   * Obtiene las categorías disponibles
   * @returns {Promise} Promesa con las categorías
   */
  async getCategories() {
    try {
      const response = await wordpressAPI.get('/categories');
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  },

  /**
   * Busca posts por término
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} page - Número de página
   * @param {number} perPage - Posts por página
   * @returns {Promise} Promesa con los resultados de búsqueda
   */
  async searchPosts(searchTerm, page = 1, perPage = 10) {
    try {
      const response = await wordpressAPI.get('/posts', {
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
      throw new Error(`Error searching posts: ${error.message}`);
    }
  }
};

export default WordPressService;
