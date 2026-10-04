// Required Apparel identity path. Not proven on apparel.aerovista.us.
// Account is the doorway. Identity Gateway / AVCC are the authority.
// App Adapter is the only integration boundary. A failure does not fall
// back to a cookie.

export const identityStanding = Object.freeze({
  required: true,
  provenOnApparel: false,
  evidence: 'Account Session Security v1 and PR #49 are accepted outside Apparel. This host still needs identity.describe(), identity.can(), and logout/revoke evidence.',
})

export async function describeIdentity() {
  return {
    status: 'unavailable',
    identity: null,
    provenOnApparel: false,
  }
}

export async function can() {
  return false
}

export function assertProtected() {
  const error = new Error('AeroVista identity is required for this action and is not verified on this store yet.')
  error.code = 'identity_unproven'
  throw error
}
