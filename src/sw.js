const staticCacheName = 'site-static-v1'
const assets = [
    '.',
    '../public/index.html',
    'app.js',
    'main.js',
    'App.vue',
    '../public/favicon.ico'
]

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('Кэширование ресурсов')
            cache.addAll(assets)
        })
    )
})

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    )
})

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})