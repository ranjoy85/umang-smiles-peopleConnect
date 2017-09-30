self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('installed');
});

self.addEventListener('activate', function(event) {
	console.log('activated');
    if (self.clients && clients.claim) {
        clients.claim();
    }
});

self.addEventListener('sync', function(event) {
  console.log('firing: sync');
  if (event.tag == 'image-fetch') {
    console.log('sync event fired');
    event.waitUntil(fetchDogImage());
  }
});

function fetchDogImage()
{
  console.log('firing: doSomeStuff()');
  fetch('./doge.png')
    .then(function(response) {
      return response;
    })
    .then(function(text) {
      console.log('Request successful', text);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
}
