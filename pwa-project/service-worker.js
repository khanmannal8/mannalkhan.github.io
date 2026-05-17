const CACHE_NAME = "prepsync-v3";

const urlsToCache = [

  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./topics.json",

  "./images/algorithms.jpg",
  "./images/os.jpg",
  "./images/networks.jpg",
  "./images/security.jpg",
  "./images/ai.jpg",
  "./images/cloud.jpg",
  "./images/databases.jpg",
  "./images/software.jpg",
  "./images/icon.png",

  "./audio/algorithms.mp3",
  "./audio/os.mp3",
  "./audio/networks.mp3",
  "./audio/security.mp3",
  "./audio/study-audio.mp3"

];

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => {

        return cache.addAll(urlsToCache);

      })

  );

});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)

      .then(response => {

        return response || fetch(event.request);

      })

  );

});