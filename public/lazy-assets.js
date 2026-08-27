(() => {
  const root = document.documentElement
  const sources = [
    '/store/window-sets/window-set-left.png',
    '/store/window-sets/window-set-right.png',
  ]

  const loadWindowSets = async () => {
    await Promise.all(sources.map((src) => new Promise((resolve) => {
      const image = new Image()
      image.decoding = 'async'
      try { image.fetchPriority = 'low' } catch {}
      image.onload = resolve
      image.onerror = resolve
      image.src = src
    })))
    root.classList.add('window-sets-ready')
  }

  const schedule = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadWindowSets, { timeout: 900 })
    } else {
      window.setTimeout(loadWindowSets, 260)
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true })
  } else {
    schedule()
  }
})()
