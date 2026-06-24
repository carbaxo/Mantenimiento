// Service worker mínimo: "network-first" con respaldo en caché.
// Permite que la app sea instalable y funcione sin conexión, sirviendo la
// última versión cuando hay red y la copia en caché cuando no la hay.
// No intercepta peticiones a otros orígenes (Supabase, fuentes): se dejan pasar.

const CACHE = 'garaje-v1'
const SHELL = '/Mantenimiento/'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return // no tocar Supabase ni fuentes

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE)
      try {
        const fresh = await fetch(req)
        if (fresh && fresh.status === 200) cache.put(req, fresh.clone())
        return fresh
      } catch {
        const cached = await cache.match(req)
        if (cached) return cached
        if (req.mode === 'navigate') {
          const shell = await cache.match(SHELL)
          if (shell) return shell
        }
        throw new Error('offline')
      }
    })(),
  )
})
