import { useState, useEffect } from 'react';

const useOfflineStorage = () => {
  const [downloadedBooks, setDownloadedBooks] = useState(new Set());
  const [downloading, setDownloading] = useState(new Set());

  useEffect(() => {
    // Load downloaded books from localStorage
    const loadDownloadedBooks = () => {
      const stored = localStorage.getItem('downloadedBooks');
      if (stored) {
        setDownloadedBooks(new Set(JSON.parse(stored)));
      }
    };

    loadDownloadedBooks();

    // Listen for service worker messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('Received message from service worker:', event.data);
      
      if (event.data.type === 'DOWNLOAD_COMPLETE') {
        const { bookId } = event.data;
        console.log('Download completed for book:', bookId);
        setDownloadedBooks(prev => {
          const newSet = new Set(prev);
          newSet.add(bookId);
          localStorage.setItem('downloadedBooks', JSON.stringify([...newSet]));
          return newSet;
        });
      } else if (event.data.type === 'DOWNLOAD_ERROR') {
        const { bookId, error } = event.data;
        console.error('Download failed for book:', bookId, error);
        // You might want to show a toast or notification to the user here
        alert(`Failed to download book: ${error}`);
      }
    });
  }, []);

  const downloadBook = async (bookId, audioUrl) => {
    console.log('Attempting to download book:', bookId, audioUrl);
    
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service Worker not supported');
    }

    try {
      // Add to downloading set
      setDownloading(prev => {
        const newSet = new Set(prev);
        newSet.add(bookId);
        return newSet;
      });

      // Ensure the URL is absolute
      const fullUrl = audioUrl.startsWith('http') ? audioUrl : `${window.location.origin}${audioUrl}`;
      console.log('Full audio URL:', fullUrl);

      // Send download message to service worker
      const registration = await navigator.serviceWorker.ready;
      registration.active.postMessage({
        type: 'DOWNLOAD_AUDIO',
        bookId,
        url: fullUrl
      });

      // Wait for download completion
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Download timed out'));
        }, 30000); // 30 second timeout

        const messageHandler = (event) => {
          const { data } = event;
          if (data.bookId === bookId) {
            if (data.type === 'DOWNLOAD_COMPLETE') {
              clearTimeout(timeout);
              navigator.serviceWorker.removeEventListener('message', messageHandler);
              resolve();
            } else if (data.type === 'DOWNLOAD_ERROR') {
              clearTimeout(timeout);
              navigator.serviceWorker.removeEventListener('message', messageHandler);
              reject(new Error(data.error));
            }
          }
        };

        navigator.serviceWorker.addEventListener('message', messageHandler);
      });

      // Add to downloaded books list
      setDownloadedBooks(prev => {
        const newSet = new Set(prev);
        newSet.add(bookId);
        localStorage.setItem('downloadedBooks', JSON.stringify([...newSet]));
        return newSet;
      });

      console.log('Download completed successfully');
    } catch (error) {
      console.error('Error downloading book:', error);
      throw error;
    } finally {
      // Remove from downloading set
      setDownloading(prev => {
        const newSet = new Set(prev);
        newSet.delete(bookId);
        return newSet;
      });
    }
  };

  const isBookDownloaded = (bookId) => {
    return downloadedBooks.has(bookId);
  };

  const removeDownloadedBook = (bookId) => {
    setDownloadedBooks(prev => {
      const newSet = new Set(prev);
      newSet.delete(bookId);
      localStorage.setItem('downloadedBooks', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  return {
    downloadBook,
    isBookDownloaded,
    removeDownloadedBook,
    isDownloading: (bookId) => downloading.has(bookId)
  };
};

export default useOfflineStorage;
