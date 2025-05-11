const CACHE_NAME = 'bookmark-offline-v1';
const AUDIO_CACHE_NAME = 'bookmark-audio-v1';

// Using WorkerGlobalScope context
/* eslint-disable-next-line no-restricted-globals */
const worker = self;

worker.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/static/js/main.chunk.js',
        '/static/js/bundle.js',
      ]);
    })
  );
});

worker.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle audio file requests
  if (url.pathname.includes('/audio/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
    return;
  }

  // Handle other requests
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
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
