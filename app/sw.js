// Briefly — service worker só para os avisos no celular.
// Não guarda cache: o app continua carregando sempre a versão do servidor.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// Toque no aviso: volta para o Briefly aberto (ou abre de novo) e mostra Meus números.
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((abas) => {
      for (const aba of abas) {
        if ('focus' in aba) {
          aba.postMessage({ tipo: 'abrir-numeros' });
          return aba.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
