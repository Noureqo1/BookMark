/* eslint-disable no-restricted-globals */
const STATIC_CACHE = 'static-cache-v4';
const DYNAMIC_CACHE = 'dynamic-cache-v4';
const AUDIO_CACHE = 'audio-cache-v4';
const API_CACHE = 'api-cache-v4';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(async cache => {
        console.log('Caching static assets');
        for (const url of urlsToCache) {
          try {
            await cache.add(url);
          } catch (error) {
            console.warn('Failed to cache:', url, error);
          }
        }
      }),
      caches.open(DYNAMIC_CACHE),
      caches.open(AUDIO_CACHE),
      caches.open(API_CACHE)
    ])
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys => {
        return Promise.all(
          keys.map(key => {
            if (![
              STATIC_CACHE,
              DYNAMIC_CACHE,
              AUDIO_CACHE,
              API_CACHE
            ].includes(key)) {
              console.log('Deleting old cache:', key);
              return caches.delete(key);
            }
            return Promise.resolve();
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle API requests
  if (event.request.url.includes('/api/')) {
    event.respondWith(handleApiRequest(event));
    return;
  }

  // Handle audio file requests
  if (event.request.url.includes('/audio/')) {
    event.respondWith(handleAudioRequest(event));
    return;
  }

  // Handle all other requests
  event.respondWith(handleStaticRequest(event));
});

// Handle API requests
async function handleApiRequest(event) {
  // Don't cache POST requests
  if (event.request.method === 'POST') {
    return fetch(event.request);
  }

  try {
    const cache = await caches.open(API_CACHE);
    const cachedResponse = await cache.match(event.request);
    
    if (cachedResponse) {
      // Return cached response and fetch update in background
      fetch(event.request).then(async response => {
        if (response.ok) {
          const clonedResponse = response.clone();
          await cache.put(event.request, clonedResponse);
        }
      }).catch(console.error);
      return cachedResponse;
    }

    const response = await fetch(event.request);
    if (response.ok) {
      const clonedResponse = response.clone();
      await cache.put(event.request, clonedResponse);
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Handle audio file requests
async function handleAudioRequest(event) {
  try {
    const cache = await caches.open(AUDIO_CACHE);
    const cachedResponse = await cache.match(event.request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(event.request);
    if (response.ok) {
      const clonedResponse = response.clone();
      await cache.put(event.request, clonedResponse);
      console.log('Audio cached successfully:', event.request.url);
    }
    return response;
  } catch (error) {
    console.error('Audio request failed:', error);
    throw error;
  }
}

// Handle static and dynamic requests
async function handleStaticRequest(event) {
  try {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(event.request);
    if (response.ok && !event.request.url.includes('.html')) {
      const cache = await caches.open(DYNAMIC_CACHE);
      const clonedResponse = response.clone();
      await cache.put(event.request, clonedResponse);
    }
    return response;
  } catch (error) {
    console.error('Static request failed:', error);
    throw error;
  }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('message', async (event) => {
  if (event.data.type === 'DOWNLOAD_AUDIO') {
    const { url, bookId } = event.data;
    
    try {
      console.log('Starting download for:', url);
      const cache = await caches.open(AUDIO_CACHE);
      
      console.log('Attempting to download from URL:', url);
      const response = await fetch(url, {
        headers: {
          'Accept': 'audio/*',
          'Range': 'bytes=0-'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      
      console.log('Download response:', response.status, response.headers.get('Content-Type'));
      
      await cache.put(url, response.clone());
      console.log('Audio file cached successfully');
      
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        self.postMessage({
          type: 'DOWNLOAD_COMPLETE',
          bookId,
          url
        });
      });
      console.log('Download complete notification sent');
    } catch (error) {
      console.error('Download failed:', error);
      // Notify clients of failure
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        self.postMessage({
          type: 'DOWNLOAD_ERROR',
          bookId,
          error: error.message
        });
      });
    }
  }
});
