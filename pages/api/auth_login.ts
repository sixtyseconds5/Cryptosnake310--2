
import type { NextApiRequest, NextApiResponse } from 'next'

// Redirect user to Farcaster OAuth authorize URL
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.FARCASTER_CLIENT_ID || ''
  const redirectUri = process.env.FARCASTER_REDIRECT_URI || (process.env.NEXT_PUBLIC_SITE_URL || '') + '/api/auth/callback'
  const state = Math.random().toString(36).substring(2,15)
  // You may want to save state in a cookie or DB to verify later
  const scope = 'profile' // placeholder, adjust based on Farcaster's spec
  const authUrl = `https://auth.farcaster.example/authorize?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`
  // NOTE: Replace domain above with the real Farcaster OAuth endpoint.
  res.redirect(authUrl)
}
