const CACHE_NAME = 'alba-v1';
const ASSETS = [
    './',
'./index.html',
'./styles.css',
'./script.js',
'./manifest.json'
];

// Instalación: Guarda los archivos base
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Estrategia: Carga desde caché y actualiza si hay red
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => res || fetch(e.request))
    );
});
