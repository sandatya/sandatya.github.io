importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox){
  console.log('Workbox berhasil dimuat');
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/football.ico', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
    { url: '/pages/teams.html', revision: '1' },
    { url:  '/pages/favorite.html', revision: '1' },
    { url: '/icon.png', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/main.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/page.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/listener.js', revision: '1' },
    { url: '/js/registersw.js', revision: '1' },
    ]);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );


    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2'),
        workbox.strategies.staleWhileRevalidate()
        )

 
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
    );

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

}else{
  console.log('Workbox gagal dimuat');
}

self.addEventListener('push', event => {
    let body

    event.data ? body = event.data.text() : body = 'No Payload'
    const options = {
        body : body,
        icon : '/icon.jpg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})


/* const CACHE_NAME = 'subsmission-v7';
const urlsToCache = [
    '/',
    '/manifest.json',
    '/index.html',
    '/nav.html',
    '/push.js',
    '/football.ico',
    '/pages/standings.html',
    '/pages/teams.html',
    '/pages/favorite.html',
    '/icon.png',
    '/js/idb.js',
    '/css/materialize.min.css',
    '/js/main.js',
    '/js/materialize.min.js',
    '/js/api.js',
    '/js/nav.js',
    '/js/page.js',
    '/js/db.js',
    '/js/listener.js',
    '/js/registersw.js'
]


self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
}); 

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', event => {
    let base_url = 'https://api.football-data.org/v2'
    if(event.request.url.indexOf(base_url) > -1){
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return fetch(event.request)
                            .then(response => {
                                cache.put(event.request.url, response.clone())
                                return response
                            })
                })
        )
    } else {
		event.respondWith(
			caches.match(event.request, { ignoreSearch: true }).then(function(response) {
				return response || fetch (event.request);
		})
	  )
	}
  });

self.addEventListener('push', event => {
    let body

    event.data ? body = event.data.text() : body = 'No Payload'
    const options = {
        body : body,
        icon : '/icon.jpg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})
*/
