# Memardos

A meme editor application built with Angular 19 and a Node.js/Express backend.

## Project Structure

```
├── src/
│   ├── app/           # Angular frontend
│   ├── api/           # Express backend (proxy to imgflip API)
│   └── environments/  # Environment configuration
├── vercel.json        # Vercel deployment config
└── .env.example       # Environment variables template
```

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd src/api && npm install
```

### Running locally

```bash
# Terminal 1: Start the backend (port 3000)
npm run start:api

# Terminal 2: Start the frontend (port 4200)
npm run start:app
```

Open http://localhost:4200 in your browser.

---

## Deployment Guide

This project is designed to be deployed with:
- **Backend**: Railway (or any Node.js PaaS)
- **Frontend**: Vercel (or any static hosting)
- **DNS**: Cloudflare (or any DNS provider)

### Step 1: Fork the Repository

1. Fork this repository to your GitHub account
2. Clone your fork locally (optional, for customization)

### Step 2: Deploy Backend to Railway

1. Go to [Railway](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your forked repository
4. **Important**: Set the root directory to `src/api`
   - Go to Settings → Root Directory → Enter `src/api`
5. Add environment variables in the Variables tab:

| Variable | Value |
|----------|-------|
| `ALLOWED_ORIGINS` | `https://your-domain.com,https://your-app.vercel.app` |
| `NODE_ENV` | `production` |

6. Railway will automatically detect Node.js and deploy
7. Copy your Railway URL (e.g., `https://your-app.railway.app`)

### Step 3: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click "Add New" → "Project"
3. Import your forked repository
4. Configure the project:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist/test-angular/browser`
5. Add environment variables:

| Variable | Value |
|----------|-------|
| `API_URL` | `https://your-app.railway.app/api` |

6. Click "Deploy"

**Note**: After the first deploy, you may need to update `src/environments/environment.prod.ts` with your actual API URL, or configure Vercel to replace the placeholder at build time.

### Step 4: Configure Custom Domain (Cloudflare)

1. In Vercel, go to your project → Settings → Domains
2. Add your custom domain (e.g., `memardos.com`)
3. Vercel will provide DNS records to add

4. In Cloudflare:
   - Go to your domain's DNS settings
   - Add the records provided by Vercel:
     - Type: `CNAME`
     - Name: `@` (or your subdomain)
     - Target: `cname.vercel-dns.com`
   - Set Proxy status to "DNS only" (gray cloud) initially

5. Back in Vercel, verify the domain
6. Once verified, you can enable Cloudflare proxy (orange cloud) if desired

### Step 5: Update CORS (if needed)

After setting up your custom domain, update Railway's `ALLOWED_ORIGINS`:

```
ALLOWED_ORIGINS=https://memardos.com,https://www.memardos.com,https://your-app.vercel.app
```

---

## Environment Variables Reference

### Backend (Railway)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port (auto-set by Railway) | `3000` |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `https://memardos.com,https://app.vercel.app` |
| `NODE_ENV` | Environment | `production` |

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `API_URL` | Backend API URL | `https://your-app.railway.app/api` |

---

## Migrating to Different Platforms

This project is platform-agnostic. To migrate:

### Change Backend Platform (e.g., to Render, Fly.io)

1. Deploy `src/api` to your new platform
2. Set the same environment variables (`PORT`, `ALLOWED_ORIGINS`)
3. Update `API_URL` in Vercel with the new backend URL

### Change Frontend Platform (e.g., to Netlify)

1. Deploy the root directory to your new platform
2. Build command: `npm run build`
3. Output directory: `dist/test-angular/browser`
4. Set `API_URL` environment variable

### Change Domain Provider

1. Update DNS records to point to your frontend host
2. Update `ALLOWED_ORIGINS` in your backend with the new domain

---

## Angular CLI Reference

### Development server

```bash
ng serve
```

Navigate to `http://localhost:4200/`.

### Build

```bash
ng build
```

Build artifacts are stored in `dist/`.

### Running tests

```bash
ng test
```

### Code scaffolding

```bash
ng generate component component-name
```

For more information, visit the [Angular CLI documentation](https://angular.dev/tools/cli).
