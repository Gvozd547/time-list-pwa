var doCache = true;

var CACHE_NAME = 'my-time-list-cache';

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
          fetch("/time-list-pwa/asset-manifest.json")
            .then(response => {
              return response.json()
            })
            .then(assets => {
              const arrAssets = Object.values(assets.files);
            console.log(assets);
              const urlsToCache = [
                "/",
                "/db.json",
                "/favicon.ico",
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
  var payload = event.data ? event.data.text() : 'Alohomora';
  
  event.waitUntil(
    self.registration.showNotification('My first spell', {
      body: payload,
    })
  );
});
