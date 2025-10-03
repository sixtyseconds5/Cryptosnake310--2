
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

// This endpoint handles the OAuth callback and exchanges code for token.
// It stores a lightweight session in an httpOnly cookie (not production hardened).
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query as any
  if(!code) return res.status(400).send('Missing code')

  const tokenUrl = process.env.FARCASTER_TOKEN_URL || 'https://auth.farcaster.example/token'
  const clientId = process.env.FARCASTER_CLIENT_ID || ''
  const clientSecret = process.env.FARCASTER_CLIENT_SECRET || ''
  const redirectUri = process.env.FARCASTER_REDIRECT_URI || (process.env.NEXT_PUBLIC_SITE_URL || '') + '/api/auth/callback'

  try {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code as string,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    })
    const tokenRes = await fetch(tokenUrl, { method: 'POST', body, headers: { 'Content-Type':'application/x-www-form-urlencoded' } })
    const tokenJson = await tokenRes.json()
    // tokenJson should contain access_token; with it you can request user profile from Farcaster API
    // Placeholder: fetch user info (adjust to Farcaster API)
    const userInfo = { fid: tokenJson.fid || 'farcaster-user', username: tokenJson.username || 'FarcasterUser' }
    // Set cookie (very simple session)
    res.setHeader('Set-Cookie', `session=${encodeURIComponent(JSON.stringify(userInfo))}; HttpOnly; Path=/; Max-Age=60*60*24`)
    // Redirect back to app home
    res.redirect('/')
  } catch (err:any) {
    console.error(err)
    res.status(500).send('OAuth error: ' + err.message)
  }
}
