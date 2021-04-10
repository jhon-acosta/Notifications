console.log('Service Worker')

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data);
    self.registration.showNotification( data.title, {
        icon: 'https://pngimg.com/uploads/github/github_PNG58.png',
        body: data.message,
    })
});