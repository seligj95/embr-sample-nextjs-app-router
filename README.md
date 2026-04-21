# Embr × Next.js — App Router sample

A minimal but non-trivial Next.js 15 App Router app designed to prove — and
stress-test — SSR on [Embr](https://github.com/coreai-microsoft/embr).

It exercises:

- **Request-time SSR** via a React Server Component with `dynamic = "force-dynamic"`
- **Client-side hydration** via a small `"use client"` counter
- **Streaming RSC** via async Server Components wrapped in `<Suspense>`
- **ISR** via `export const revalidate = 30`
- A dedicated **`/api/health`** route handler for Embr's health check

## Deploy to Embr

```bash
# Install the CLI (one-time, needs read:packages on an EMU token to pull from GH Packages)
npm install -g @coreai-microsoft/embr-cli

# Log in with your personal GitHub account (EMU not supported by Embr yet)
embr login

# Fork or "Use this template", then:
embr quickstart deploy <your-user>/embr-sample-nextjs-app-router
```

## `embr.yaml`

This sample ships with the recommended recipe for Next.js SSR on Embr:

```yaml
platform: nodejs
platformVersion: "20"
buildCommand: "npm ci && npm run build"
run:
  port: 3000
  startCommand: "npm start"        # package.json -> "next start -p ${PORT:-3000}"
healthCheck:
  path: "/api/health"               # must be a backend route, not a SPA page
  expectedStatusCode: 200
```

### Why these choices

- `platform: nodejs` + `platformVersion: "20"` — Next 15 requires Node 18.18+, 20 is the current LTS.
- `buildCommand: "npm ci && npm run build"` — we bypass Oryx's default Node pipeline and run `next build` explicitly so output paths are predictable (`.next/`, `.next/static/`).
- `run.startCommand: "npm start"` — `npm start` resolves to `next start -p ${PORT:-3000}`. `PORT` is injected by Embr.
- `run.port: 3000` — matches `next start`'s default. Must match the port Embr exposes.
- `healthCheck.path: "/api/health"` — per Embr's docs, a frontend route always returns 200 and hides crashes. Use a route handler.

### What Embr does automatically

- **`.next/static/`** is auto-detected and extracted to Azure Front Door CDN. Immutable Next.js chunks are served from the edge, not from your container.
- **`next-env.d.ts`** and other generated files don't need to be committed.

## What to check after deploy

1. `curl https://<deployment>/` twice — the timestamp + nonce on the homepage should change each request (proves SSR).
2. `curl -N https://<deployment>/streaming` — panels should arrive progressively (proves streaming is preserved through the Embr reverse proxy).
3. `curl https://<deployment>/api/health` — `{"status":"ok",…}` with HTTP 200.
4. `curl https://<deployment>/isr` repeatedly — timestamp should be stable for 30 seconds, then update.

## Local dev

```bash
npm install
npm run dev
```
