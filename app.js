// 1. Registra o Service Worker ao carregar a página
//if ('serviceWorker' in navigator && 'PushManager' in window) {

//  navigator.serviceWorker.register('sw.js')
//    .then(reg => {
//      console.log('SW registrado:', reg.scope);
//      configurarBotao(reg);
//    })
//    .catch(err => console.error('Erro ao registrar SW:', err));
//}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let reg of registrations) {
      reg.unregister();
      console.log('SW removido');
    }
  });
}
// 2. Configura o botão
function configurarBotao(registration) {
  const btn = document.getElementById('btn-subscribe');

  if (!btn) return; // evita erro se não tiver botão

  btn.addEventListener('click', async () => {
    const permissao = await Notification.requestPermission();

    if (permissao === 'granted') {
      await inscreverUsuario(registration);
      btn.disabled = true;
      btn.textContent = 'Notificações Ativadas';
    } else {
      btn.textContent = 'Permissão Negada';
    }
  });
}

// 3. Inscrição
async function inscreverUsuario(registration) {
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('SUA_CHAVE_PUBLICA_VAPID')
  });

  console.log('Subscription:', JSON.stringify(subscription));
}

// utilitário
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const raw = atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}