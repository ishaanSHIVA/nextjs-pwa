const CACHE_DYNAMIC_NAME = 'dynamic-v1'

self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker 🤙");
});
self.addEventListener('sync', function(event) {
  console.log('[Service Worker] Background syncing', event);
  if (event.tag === 'sync-new-posts') {
    console.log('[Service Worker] Syncing new Posts');
    fetch('https://random-data-api.com/api/code/random_code')
      .then(response => response.json())
      .then(data => {
        console.log("[Background sync]  ",data)
      })
  }
});
/*
fetch('https://random-data-api.com/api/code/random_code')
      .then(response => response.json())
      .then(data => {
        console.log("[Background sync]  ",data)
      })*/

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  var options = {
    body: 'You successfully subscribed to our Notification service!'
  };
  self.registration.showNotification('Notification',options)
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {

  event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function (res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(function (cache) {
                    // trimCache(CACHE_DYNAMIC_NAME, 3);
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              })
          }
        })
    );
});