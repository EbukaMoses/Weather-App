const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const asset = [
    '/'
    '/index.html',
    '/js/app.js',
    '/css/main.css',
    '/img/dish.ng'


];

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}
// install service worker
self.addEventListener('install', evt => {
    //console.log('service walke has been installed');
    evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
        cache.addAll(assets);
    })
    );
});

// activate service worker
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return promise.all(keys.filter(key => key !== staticCacheName && key !== dynamicCacheName)
            .map(key => caches.delete())
            )
        })
    )
});

// fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
            return cachesRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cach => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 3);
                    return fetchRes;
                })
            });
        })
    );
});