const CACHE_NAME = "decide-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/style.css",
  "/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Solo cachea recursos del mismo origen
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
  // Para URLs externas (CDN, APIs) no hacemos nada y dejan pasar la petición
});
