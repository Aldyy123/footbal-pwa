
if ("serviceWorker" in navigator) {
  registerSW();  
  Permission();
} else {
  console.log("Browser tidak didukung");
}

function registerSW() {
  return navigator.serviceWorker.register('sw.js').then(reg => {
      console.log(reg)
      return reg
  })
}

function Permission() {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      switch (result) {
        case "default":
          console.log("ditutup tabnya");
          return;
          break;
        case "denied":
          console.log("Permssion ditolak");
          return;
          break;
        default:
          pushManager();
          break;
      }
    });
  }
}

function pushManager() {
  if ("PushManager" in window) {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array("BMAC3pi1Q_NT_Xyjj4b40pD7hL-xGXjw_hF5iXvjXSA9EC0G8sk9DJj2y79jzV1lcOB5Ji7Ew0mu9enCLQgREzI"),
        })
        .then(function (subscribe) {
          console.log(
            "Berhasil melakukan subscribe dengan endpoint: ",
            subscribe.endpoint
          );
          console.log(
            "Berhasil melakukan subscribe dengan p256dh key: ",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("p256dh"))
              )
            )
          );
          console.log(
            "Berhasil melakukan subscribe dengan auth key: ",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("auth"))
              )
            )
          );
        })
        .catch(function (e) {
          console.error("Tidak dapat melakukan subscribe ", e.message);
        });
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
