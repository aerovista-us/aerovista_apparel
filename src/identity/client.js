const APPAREL_AUTH_ORIGIN = 'https://apparel-auth.aerovista.us'

export const identityConfig = Object.freeze({
  origin: APPAREL_AUTH_ORIGIN,
  mode: 'app-adapter-bridge',
})

function currentReturnTarget() {
  if (typeof window === 'undefined') return 'https://apparel.aerovista.us/'
  return window.location.href
}

export function beginIdentityLogin(returnTo = currentReturnTarget()) {
  const url = new URL('/login', APPAREL_AUTH_ORIGIN)
  url.searchParams.set('return_to', returnTo)
  window.location.assign(url.toString())
}

export function beginIdentityRegistration(returnTo = currentReturnTarget()) {
  const url = new URL('/register', APPAREL_AUTH_ORIGIN)
  url.searchParams.set('return_to', returnTo)
  window.location.assign(url.toString())
}

export async function loadIdentitySession() {
  const response = await fetch(`${APPAREL_AUTH_ORIGIN}/api/session`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(payload?.error || 'Identity service unavailable')
    error.code = payload?.code || 'identity_unavailable'
    error.status = response.status
    throw error
  }

  return payload
}

export async function logoutIdentity(csrfToken) {
  const response = await fetch(`${APPAREL_AUTH_ORIGIN}/api/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-Apparel-CSRF': String(csrfToken || ''),
    },
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(payload?.error || 'Logout failed')
    error.code = payload?.code || 'logout_failed'
    error.status = response.status
    throw error
  }

  return payload
}


export async function loadAccountSummary() {
  const response = await fetch(`${APPAREL_AUTH_ORIGIN}/api/account/summary`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(payload?.error || 'Account summary unavailable')
    error.code = payload?.code || 'account_summary_unavailable'
    error.status = response.status
    throw error
  }

  return payload
}


function apiError(payload, fallback, fallbackCode, status) {
  const error = new Error(payload?.error || fallback)
  error.code = payload?.code || fallbackCode
  error.status = status
  return error
}

export async function loadSavedPieces() {
  const response = await fetch(`${APPAREL_AUTH_ORIGIN}/api/account/saved`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw apiError(payload, 'Saved Pieces unavailable', 'saved_unavailable', response.status)
  }
  return payload
}

export async function savePiece(productId, csrfToken) {
  const response = await fetch(`${APPAREL_AUTH_ORIGIN}/api/account/saved`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Apparel-CSRF': String(csrfToken || ''),
    },
    body: JSON.stringify({ productId }),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw apiError(payload, 'Could not save this piece', 'saved_write_failed', response.status)
  }
  return payload
}

export async function removeSavedPiece(productId, csrfToken) {
  const response = await fetch(`${APPAREL_AUTH_ORIGIN}/api/account/saved/remove`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Apparel-CSRF': String(csrfToken || ''),
    },
    body: JSON.stringify({ productId }),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw apiError(payload, 'Could not remove this piece', 'saved_remove_failed', response.status)
  }
  return payload
}
