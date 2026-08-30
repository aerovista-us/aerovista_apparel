(() => {
  const root = document.documentElement
  const windowSources = [
    '/store/window-sets/window-set-left.png',
    '/store/window-sets/window-set-right.png',
  ]
  const interiorSources = [
    '/store/window-sets/inside-left.png',
    '/store/window-sets/inside-right.png',
  ]

  const loadSources = (sources) => Promise.all(sources.map((src) => new Promise((resolve) => {
      const image = new Image()
      image.decoding = 'async'
      try { image.fetchPriority = 'low' } catch {}
      image.onload = resolve
      image.onerror = resolve
      image.src = src
    })))

  const loadWindowSets = async () => {
    await loadSources(windowSources)
    root.classList.add('window-sets-ready')

    // The interior portraits are not needed for first paint. Load them only
    // after the facade photography is ready, preserving the fast entrance.
    await loadSources(interiorSources)
    root.classList.add('interior-displays-ready')
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
