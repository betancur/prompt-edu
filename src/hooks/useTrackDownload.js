import { useCallback } from 'react';

export const useTrackDownload = () => {
  const trackDownload = useCallback((fileInfo) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'download', {
        event_category: fileInfo.category || 'Document',
        event_label: fileInfo.title,
        file_name: fileInfo.title,
        file_type: fileInfo.type || 'pdf',
        file_source: fileInfo.source || 'document_library',
        send_to: 'G-L98MCF7YSH'
      });
    }
  }, []);

  return {
    trackDownload,
    trackAndDownload: useCallback((fileInfo) => {
      trackDownload(fileInfo);
      
      // Handle the download
      if (fileInfo.link) {
        window.open(fileInfo.link, '_blank');
      }
    }, [trackDownload])
  };
};
