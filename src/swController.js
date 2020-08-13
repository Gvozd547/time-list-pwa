const check = () => {
    if (!("serviceWorker" in navigator)) {
        throw new Error("No Service Worker support!");
    }
    if (!("PushManager" in window)) {
        throw new Error("No Push API Support!");
    }
};

const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register("sw.js");
    return swRegistration;
};
    
const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if (permission !== "granted") {
        throw new Error("Permission not granted for Notification");
    }
};
const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body
    };
    swRegistration.showNotification(title, options);
}

export const showNotify = (title = 'This is titless', body = 'this is the message') => {
    navigator.serviceWorker.getRegistrations().then(registration => {
        showLocalNotification(title, body, registration[0]);
    });
}

export const main = async () => {
    check();
    const swRegistration = await registerServiceWorker();
    const permission =  await requestNotificationPermission();
    showLocalNotification('TimeList App', 'This PWA ready to GO!', swRegistration);
}