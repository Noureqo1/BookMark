const CACHE_NAME = 'bookmark-offline-v1';
const AUDIO_CACHE_NAME = 'bookmark-audio-v1';
const API_CACHE_NAME = 'bookmark-api-v1';

// Using WorkerGlobalScope context
/* eslint-disable-next-line no-restricted-globals */
const worker = self;

worker.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/static/js/main.chunk.js',
          '/static/js/bundle.js',
        ]);
      }),
      caches.open(API_CACHE_NAME)
    ])
  );
});

worker.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(
        keys.filter(key => key.startsWith('bookmark-') && 
          ![CACHE_NAME, AUDIO_CACHE_NAME, API_CACHE_NAME].includes(key))
          .map(key => caches.delete(key))
      ))
    ])
  );
});

worker.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then((cache) => 
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            }
            return caches.match(event.request);
          })
          .catch(() => caches.match(event.request))
      )
    );
    return;
  }

  // Handle audio file requests
  if (url.pathname.includes('/audio/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) return response;
          
          return fetch(event.request).then(networkResponse => {
            if (!networkResponse.ok) throw new Error('Network response was not ok');
            
            const responseToCache = networkResponse.clone();
            caches.open(AUDIO_CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
            
            return networkResponse;
          });
        })
        .catch(error => {
          console.error('Error fetching audio:', error);
          worker.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'DOWNLOAD_ERROR',
                error: error.message
              });
            });
          });
        })
    );
    return;
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;
        
        return fetch(event.request).then(networkResponse => {
          if (!networkResponse.ok) throw new Error('Network response was not ok');
          
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        });
      })
  );
});

// Listen for messages from the client
worker.addEventListener('message', (event) => {
  if (event.data.type === 'DOWNLOAD_AUDIO') {
    const { url, bookId } = event.data;
    event.waitUntil(
      caches.open(AUDIO_CACHE_NAME)
        .then((cache) => {
          return fetch(url)
            .then((response) => {
              cache.put(url, response.clone());
              // Notify client that download is complete
              worker.clients.matchAll().then((clients) => {
                clients.forEach((client) => {
                  client.postMessage({
                    type: 'DOWNLOAD_COMPLETE',
                    bookId,
                    url
                  });
                });
              });
            });
        })
    );
  }
});