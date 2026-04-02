# Frontend

## Stack

- **Framework:** React 19  
- **Routing:** React Router 7 (framework mode with `@react-router/dev`)  
- **Build:** Vite 7  
- **Styling:** Tailwind CSS 4 (`@import "tailwindcss"` in `app/app.css`)  
- **Charts (where used):** Recharts  
- **Fonts:** Inter (linked from Google Fonts in `app/root.tsx`)

## Version

Package `fronted/package.json` includes **version `1.1.3`** (aligned with backend release).

## Project layout

```text
fronted/
├── app/
│   ├── root.tsx       # HTML shell, Outlet, error boundary, global CSS import
│   ├── app.css        # Tailwind + theme (Inter)
│   ├── routes.ts      # Route configuration table
│   └── routes/
│       ├── home.tsx
│       └── register.tsx
├── public/            # Static files (e.g. favicon)
├── vite.config.ts     # React Router plugin, Tailwind, /api → backend proxy
└── package.json
```

## Routes (`app/routes.ts`)

| URL path | Module |
|----------|--------|
| `/` | `routes/home.tsx` (index) |
| `/auth/register` | `routes/register.tsx` |

Add new entries with `route("path", "routes/file.tsx")` and create the route module under `app/routes/`.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server (React Router dev) |
| `npm run build` | Production client + SSR build |
| `npm start` | Serve production build (`react-router-serve`) |
| `npm run typecheck` | Generate types + `tsc` |

## API calls from the browser

During **development**, requests to **`/api/**`** are proxied to **`http://localhost:8000`** (see `vite.config.ts`).

For **authenticated** endpoints that rely on cookies (e.g. profile):

- Use `fetch(url, { credentials: 'include' })` or axios with `withCredentials: true`.
- Ensure `FRONTEND_URL` on the backend matches the exact origin serving the frontend.

## Environment

Client-exposed variables must be prefixed with **`VITE_`**. See [Environment variables](./environment-variables.md).
