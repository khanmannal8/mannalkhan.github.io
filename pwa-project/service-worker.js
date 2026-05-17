const CACHE_NAME = "prepsync-v2";

const urlsToCache = [

  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./topics.json",

  "./images/algorithms.jpg",
  "./images/operating-systems.jpg",
  "./images/networks.jpg",
  "./images/cybersecurity.jpg",
  "./images/ai.jpg",
  "./images/cloud.jpg",
  "./images/databases.jpg",
  "./images/software.jpg",

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