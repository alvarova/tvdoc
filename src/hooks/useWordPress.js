import { useState, useEffect } from 'react';
import { WordPressService } from '../services/wordpressApi';

/**
 * Hook personalizado para obtener videos de WordPress
 * @param {Object} options - Opciones de configuración
 * @param {number} options.page - Página actual
 * @param {number} options.perPage - Videos por página
 * @param {string} options.categories - Categorías a filtrar
 * @param {boolean} options.autoFetch - Si debe cargar automáticamente
 * @returns {Object} Estado y funciones para manejar videos
 */
export const useWordPressVideos = ({ 
  page = 1, 
  perPage = 10, 
  categories = '', 
  autoFetch = true 
} = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await WordPressService.getVideos(page, perPage, categories);
      setPosts(response.posts);
      setTotalPages(response.totalPages);
      setTotalPosts(response.totalPosts);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = () => {
    fetchVideos();
  };

  useEffect(() => {
    if (autoFetch) {
      fetchVideos();
    }
  }, [page, perPage, categories, autoFetch]);

  return {
    posts,
    loading,
    error,
    totalPages,
    totalPosts,
    refreshPosts,
    fetchPosts: fetchVideos
  };
};

/**
 * Hook personalizado para obtener posts de WordPress
 * @param {Object} options - Opciones de configuración
 * @param {number} options.page - Página actual
 * @param {number} options.perPage - Posts por página
 * @param {string} options.categories - Categorías a filtrar
 * @param {boolean} options.autoFetch - Si debe cargar automáticamente
 * @returns {Object} Estado y funciones para manejar posts
 */
export const useWordPressPosts = ({ 
  page = 1, 
  perPage = 10, 
  categories = '', 
  autoFetch = true 
} = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await WordPressService.getPosts(page, perPage, categories);
      setPosts(response.posts);
      setTotalPages(response.totalPages);
      setTotalPosts(response.totalPosts);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = () => {
    fetchPosts();
  };

  useEffect(() => {
    if (autoFetch) {
      fetchPosts();
    }
  }, [page, perPage, categories, autoFetch]);

  return {
    posts,
    loading,
    error,
    totalPages,
    totalPosts,
    refreshPosts,
    fetchPosts
  };
};

/**
 * Hook para obtener un post específico
 * @param {number} postId - ID del post
 * @returns {Object} Estado del post
 */
export const useWordPressPost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const postData = await WordPressService.getPost(postId);
        setPost(postData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};

/**
 * Hook para búsqueda de posts
 * @returns {Object} Estado y funciones de búsqueda
 */
export const useWordPressSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const search = async (term, page = 1, perPage = 10) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchTerm(term);
    
    try {
      const response = await WordPressService.searchPosts(term, page, perPage);
      setSearchResults(response.posts);
    } catch (err) {
      setError(err.message);
      console.error('Error searching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setSearchTerm('');
    setError(null);
  };

  return {
    searchResults,
    loading,
    error,
    searchTerm,
    search,
    clearSearch
  };
};
