import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      // Get the clean path name without trailing slashes
      const cleanPathname = location.pathname.replace(/\/$/, '');
      
      // Get the screen name from the path
      const screenName = cleanPathname === '' 
        ? 'Home' 
        : cleanPathname.split('/').pop().replace(/-/g, ' ');

      window.gtag('event', 'page_view', {
        page_path: cleanPathname || '/',
        page_title: document.title,
        page_location: window.location.href,
        send_to: 'G-L98MCF7YSH',
        screen_name: screenName
      });
    }
  }, [location]);
};
