const webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BMAC3pi1Q_NT_Xyjj4b40pD7hL-xGXjw_hF5iXvjXSA9EC0G8sk9DJj2y79jzV1lcOB5Ji7Ew0mu9enCLQgREzI",
    "privateKey": "_ZoMQc5CAcwxs9YQXbIyxf2KgGyZfTLCHOijVXA8ZD4"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e4U-Xd9V6Dw:APA91bH0LBakkRZUbAVGfZAY29Mng1TgXcOHh6pBov-jw0f089RGVnKFLCEhRgos0BeLj3SLyEpeTnqsP197zq2F4QXKCEKRgHi_iQzmCaymgkTsz6-LkQxP_B2avr1ILQMUtvWLrZAu",
    "keys": {
        "p256dh": "BB1SnCw8nIoMpkdaCoKf73D+iS4q9XIPiA2m82vdS1ODiBaz/OrO0SHKA5dvgzbJiLC9oQz57ODGN2/pLGRhbKo=",
        "auth": "KBWTcACSGUzMqPWQumBQow=="
    }
};
const payload = 'Anda menerima notifikasi';
const options = {
    gcmAPIKey: '521540739690',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);