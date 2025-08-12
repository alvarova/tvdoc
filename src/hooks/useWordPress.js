import { useState, useEffect, useCallback } from 'react';
import { WordPressService } from '../services/wordpressApi';

/**
 * Hook para obtener videos de WordPress
 */
export const useWordPressVideos = ({ page = 1, perPage = 10, categories = '', autoFetch = true } = {}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await WordPressService.getVideos(page, perPage, categories);
      setVideos(response.posts);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, categories]);

  useEffect(() => {
    if (autoFetch) {
      fetchVideos();
    }
  }, [fetchVideos, autoFetch]);

  return { videos, loading, error, totalPages, fetchVideos };
};

/**
 * Hook para obtener un video específico por slug
 */
export const useWordPressVideo = (slug) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      try {
        const videoData = await WordPressService.getVideo(slug); // Assuming getVideo fetches by slug now
        setVideo(videoData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [slug]);

  return { video, loading, error };
};

/**
 * Hook para búsqueda de videos
 */
export const useWordPressSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchVideos = useCallback(async (searchTerm, page = 1, perPage = 10) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await WordPressService.searchVideos(searchTerm, page, perPage);
      setSearchResults(response.posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { searchResults, loading, error, searchVideos };
};

/**
 * Hook para obtener las categorías de videos
 */
export const useWordPressCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await WordPressService.getVideoCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
};

/**
 * Hook para obtener las páginas
 */
export const useWordPressPages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await WordPressService.getPages();
        setPages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  return { pages, loading, error };
};

/**
 * Hook para obtener las posiciones de los videos
 */
export const useWordPressVideoPositions = () => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchPositions = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await WordPressService.getVideoPositions();
          setPositions(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchPositions();
    }, []);

    return { positions, loading, error };
};
