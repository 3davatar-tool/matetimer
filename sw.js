const CACHE_NAME = 'matetimer-v19';
const ASSETS = [
    './',
    './index.html',
    './timer_v15_ios_optimized.html',
    './manifest.json',
    './backimage/back_image.png',
    './sounds/finish.mp3',
    './avatar/welcomecat.vrm',
    './motions/VRMA_01.vrma',
    './motions/VRMA_02.vrma',
    './motions/VRMA_03.vrma',
    './motions/VRMA_04.vrma',
    './motions/VRMA_05.vrma',
    './motions/VRMA_06.vrma',
    './motions/VRMA_07.vrma'
];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache and adding assets');
            return cache.addAll(ASSETS);
        })
    );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});

// ネットワーク優先、失敗したらキャッシュを返す
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
