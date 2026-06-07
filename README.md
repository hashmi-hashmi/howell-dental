# Howell Dental Group — Website

Professional dental website with booking system and admin panel.

## 🌐 Pages
- `/` — Main website (SEO optimized, booking form)
- `/admin` — Admin dashboard (login required)

## 🔐 Admin Credentials
- **URL:** yoursite.vercel.app/admin
- **Username:** admin
- **Password:** Howell@2026

## 🚀 Deploy to Vercel (3 steps)

### Option A — Vercel Website (Easiest)
1. Go to https://vercel.com and sign up / log in
2. Click **"Add New Project"**
3. Click **"Import"** and choose **"Upload folder"**
4. Upload this entire `howell-dental` folder
5. Click **Deploy** — done! Your link will be ready in ~1 minute

### Option B — Command Line
```bash
# Install Node.js from https://nodejs.org first, then:
npm install -g vercel
vercel login
cd howell-dental
vercel deploy
```

## 📦 Local Testing
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 📋 Booking Data
All bookings are stored in `/data/bookings.json` on the server.
View them at `/admin` after logging in.

> **Note:** On Vercel free tier, the filesystem resets on each deploy.
> For permanent storage, upgrade to Vercel Pro or connect a free database
> like PlanetScale or Supabase (contact developer for setup).
