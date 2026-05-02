const CACHE_NAME = 'pulse-vida-v5';

const urlsToCache = [
  './',
  './index.html',
  './login.html',
  './aba_a.html',
  './atendimento.html',
  './pressao.html',
  './medicamentos.html',
  './habitos.html',
  './Css/login.css',
  './Css/aba_a.css',
  './Css/atendimento.css',
  './imagens/logo_pulsevida.png'
];

// CACHE
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});




// FETCH
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});


// 🔔 ===== EVENTO PUSH =====
self.addEventListener('push', event => {

  const dados = event.data?.json() ?? {
    title: 'Nova Notificação',
    body: 'Você tem uma mensagem!',
    icon: '/icons/icon-192x192.png'
  };

  event.waitUntil(
    self.registration.showNotification(dados.title, {
      body: dados.body,
      icon: dados.icon,
      badge: '/icons/icon-72x72.png'
    })
  );

});


// 🖱️ ===== CLIQUE NA NOTIFICAÇÃO =====
self.addEventListener('notificationclick', event => {

  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );

});