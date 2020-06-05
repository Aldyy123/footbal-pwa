const cacheUrl = [
  { url: "/", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/details.html", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/pages/beranda.html", revision : '1' },
  { url: "/pages/favorite.html", revision : '1'},
  { url: "/css/mobile.css", revision: "1" },
  { url: "/css/style.css", revision: "1" },
  { url: "/css/materialize/materialize.min.css", revision: "1" },
  { url: "/images/icons.png", revision: "1" },
  { url: "/images/soccer.svg", revision: "1" },
  { url: "/images/android/android-icon-72x72.png", revision: "1" },
  { url: "/images/android/android-icon-192x192.png", revision: "1" },
  { url: "/js/app.js", revision: "1" },
  { url: "/js/main.js", revision: "1" },
  { url: "/js/nav.js", revision: "1" },
  { url: "/js/components/template.js", revision: "1" },
  { url: "/js/components/details.js", revision: "1" },
  { url: "/js/components/favorite.js", revision: "1" },
  { url: "/js/database/db.js", revision: "1" },
  { url: "/js/database/api.js", revision: "1" },
  { url: "/js/database/idb.js", revision: "1" },
  { url: "/js/materialize/materialize.min.js", revision: "1" },
];

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

const base_url = "https://api.football-data.org/";

if (workbox) console.log("Workbox berhasil");

workbox.precaching.precacheAndRoute(cacheUrl, {
ignoreUrlParametersMatching : [/.*/]
});

const matchCb = ({url, req, event}) => {
  return url.pathname === url.pathname
}

workbox.routing.registerRoute(
  matchCb,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "football",
  })
);

workbox.routing.registerRoute(
  matchCb,
  workbox.strategies.cacheFirst({
    cacheName: 'football',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener("push", (event) => {
  let body;

  if (event.body) {
    body = event.data.text();
  } else {
    body = "Halooo gaess";
  }

  const options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
