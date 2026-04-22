self.addEventListener('fetch', function (event) { });

self.addEventListener('push', function (e) {
    var body;

    if (e.data) {
        body = e.data.text();
    } else {
        body = "Message Unknown";
    }

    var options = {
        body: body,
        icon: "https://mydrasa.com/images/logo/logo-sm.png",
        badge: "https://mydrasa.com/images/favicon/android-chrome-96x96.png",
        vibrate: [200, 100, 100],
        data: {
            dateOfArrival: Date.now()
        },
        actions: [
            {
                action: "explore", title: "See on mydrasa",
                icon: "https://mydrasa.com/images/icons/open-mail.png"
            },
            {
                action: "close", title: "Later",
                icon: "https://mydrasa.com/images/icons/cancel.png"
            },
        ]
    };
    e.waitUntil(
        self.registration.showNotification("Message on mydrasa", options)
    );
});

self.addEventListener('notificationclick', function (e) {
    var notification = e.notification;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('https://mydrasa.com/dashboard');
        notification.close();
    }
});