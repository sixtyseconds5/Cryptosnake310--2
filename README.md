
# CryptoSnake — Full Upgrade (OAuth Farcaster + Supabase + Auto-migrations)

This package is a deploy-ready Next.js app with:
- Snake game UI (Tailwind)
- OAuth login flow placeholder for Farcaster (server-side token exchange)
- Supabase integration for leaderboard & daily play limits
- GitHub Actions workflow to run Supabase migrations automatically on push
- All assets and SQL files included — upload ZIP to Vercel / GitHub & deploy

## Environment variables (set these in Vercel)
- SUPABASE_URL
- SUPABASE_KEY (service_role recommended for server-side)
- FARCASTER_CLIENT_ID
- FARCASTER_CLIENT_SECRET
- FARCASTER_REDIRECT_URI (e.g. https://yourdomain.com/api/auth/callback)
- NEXT_PUBLIC_SITE_URL (e.g. https://yourdomain.com) - used to build auth URL

## Supabase setup
1. Create Supabase project.
2. In SQL editor run `supabase_schema.sql` and `supabase_rpc_count_scores_today.sql`.
3. Copy SUPABASE_URL and SERVICE/ANON key to Vercel env vars.

## Farcaster OAuth setup (developer steps)
1. Register your app on Farcaster developer portal (if available) to obtain CLIENT_ID and CLIENT_SECRET.
2. Set the redirect URI to `https://yourdomain.com/api/auth/callback` (or your Vercel domain).
3. Add CLIENT_ID and CLIENT_SECRET as env vars in Vercel.

## Deploy
1. Push this repo to GitHub or upload ZIP to Vercel.
2. Ensure the environment variables are set in Vercel.
3. Deploy — the app will be live. Users can log in with Farcaster and play (max 5 plays per UTC day). Leaderboard resets weekly automatically.

If you want me to also setup the GitHub repository, create the Supabase project, or configure Farcaster app, tell me and I’ll guide step-by-step.
