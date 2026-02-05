const CACHE_NAME = 'dar-furniture-v1';
const urlsToCache = [
  '/',
  '/products',
  '/projects',
  '/offers',
  '/contact',
  '/manifest.json',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Network first, then cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME)
          .then((cache) => {
            // Only cache successful responses from our origin
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, responseToCache);
            }
          });
        
        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request);
      })
  );
});
