/**
 * Utilidades para formatear fechas
 */
export const formatDate = (dateString, locale = 'es-AR') => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString, locale = 'es-AR') => {
  const date = new Date(dateString);
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (dateString, locale = 'es-AR') => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Hace 1 día';
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? 'Hace 1 semana' : `Hace ${weeks} semanas`;
  } else {
    return formatDate(dateString, locale);
  }
};

/**
 * Utilidades para texto
 */
export const stripHtml = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
};

export const createExcerpt = (content, maxLength = 150) => {
  const plainText = stripHtml(content);
  return truncateText(plainText, maxLength);
};

/**
 * Utilidades para URLs e imágenes
 */
export const getImageUrl = (post, size = 'medium') => {
  if (!post._embedded || !post._embedded['wp:featuredmedia']) {
    return '/placeholder-image.jpg';
  }

  const media = post._embedded['wp:featuredmedia'][0];
  const sizes = media.media_details?.sizes;

  if (sizes && sizes[size]) {
    return sizes[size].source_url;
  }

  return media.source_url || '/placeholder-image.jpg';
};

export const getAuthorName = (post) => {
  if (!post._embedded || !post._embedded.author) {
    return 'TVDoc';
  }
  return post._embedded.author[0]?.name || 'TVDoc';
};

export const getCategoryNames = (post) => {
  if (!post._embedded || !post._embedded['wp:term']) {
    return [];
  }

  const categories = post._embedded['wp:term'][0] || [];
  return categories.map(cat => cat.name);
};

/**
 * Utilidades para SEO
 */
export const generateMetaTags = (post) => {
  if (!post) return {};

  const title = stripHtml(post.title?.rendered || '');
  const description = createExcerpt(post.content?.rendered || post.excerpt?.rendered || '', 160);
  const image = getImageUrl(post, 'large');
  const url = `${window.location.origin}/articulo/${post.slug}`;

  return {
    title: `${title} | TVDoc`,
    description,
    image,
    url,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.modified,
    author: getAuthorName(post),
    section: getCategoryNames(post)[0] || 'Noticias'
  };
};

/**
 * Utilidades para localStorage
 */
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Error saving to localStorage:', error);
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Error removing from localStorage:', error);
    }
  }
};

/**
 * Utilidades para compartir en redes sociales
 */
export const shareUrls = {
  facebook: (url, title) => 
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`,
  
  twitter: (url, title) => 
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  
  whatsapp: (url, title) => 
    `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  
  telegram: (url, title) => 
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  
  linkedin: (url, title) => 
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
};

/**
 * Utilidad para debounce (búsquedas, scroll, etc.)
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
