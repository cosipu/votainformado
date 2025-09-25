const CACHE_NAME = "decide-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/style.css",
  "/script.js"
];

// Instalación del Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activación del Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: solo cachea recursos del mismo origen, ignora externos
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(() => caches.match("/index.html")) // fallback si falla
    );
  }
});
