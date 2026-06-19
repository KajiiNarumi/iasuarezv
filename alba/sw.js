const CACHE_NAME = 'alba-pwa-v1';
const ASSETS = [
    './',
'./index.html',
'./style.css',
'./app.js',
'./sunrise.png',
'./manifest.json',
// Rutas de tus módulos (Añade archivos específicos si lo requieres)
'./Ink/',
'./Lux/',
'./Kron/'
];

// Instalar y cachear
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

// Servir desde caché o buscar en red
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
