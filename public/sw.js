var doCache = true;

var CACHE_NAME = 'my-pwa-cache';

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          fetch("/asset-manifest.json")
            .then(response => {
              return response.json()
            })
            .then(assets => {
              const arrAssets = Object.values(assets.files);
              const urlsToCache = [
                "/",
                "/db.json",
                "/favicon.ico",
                "/manifest.json",
                ...arrAssets
              ]
              cache.addAll(urlsToCache)
              console.log('cached');
            })
        })
    );
  }
});

self.addEventListener('fetch', function(event) {
    if (doCache) {
      event.respondWith(
          caches.match(event.request).then(function(response) {
              return response || fetch(event.request);
          })
      );
    }
});
self.addEventListener('push', function(event) {
  var payload = event.data ? event.data.text() : 'Aloha';
  
  event.waitUntil(
    self.registration.showNotification('My first push', {
      body: payload,
    })
  );
});