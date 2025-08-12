import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../common/ArticleCard';

const VideoPosition = ({ position }) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!position._links['wp:post_type'] || !position._links['wp:post_type'][0].href) {
        setError('No video link found for this position.');
        setLoading(false);
        return;
      }

      const videoUrl = position._links['wp:post_type'][0].href;
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(videoUrl);
        if (response.data && response.data.length > 0) {
          setVideo(response.data[0]);
        } else {
          setError('No video found for this position.');
        }
      } catch (err) {
        setError('Failed to fetch video.');
        console.error('Error fetching video for position:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [position]);

  if (loading) {
    return <div className="video-position-loading">Cargando video...</div>;
  }

  if (error) {
    return <div className="video-position-error">{error}</div>;
  }

  if (!video) {
    return null; // Or a placeholder indicating no video
  }

  return (
    <div className="video-position">
      <ArticleCard post={video} variant="featured" />
    </div>
  );
};

export default VideoPosition;
