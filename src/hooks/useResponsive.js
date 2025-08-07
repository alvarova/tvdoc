import { useState, useEffect } from 'react';

/**
 * Breakpoints definidos según la especificación
 */
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1024
};

/**
 * Hook para detectar el tamaño de pantalla y tipo de dispositivo
 * @returns {Object} Información sobre el dispositivo y tamaño de pantalla
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      // Determinar tipo de dispositivo basado en breakpoints
      if (width < BREAKPOINTS.mobile) {
        setDeviceType('mobile');
      } else if (width < BREAKPOINTS.tablet) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Establecer valores iniciales
    handleResize();

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    screenSize,
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    breakpoints: BREAKPOINTS
  };
};

export default useResponsive;
