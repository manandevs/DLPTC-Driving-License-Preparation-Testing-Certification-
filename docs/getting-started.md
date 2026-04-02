# Getting started

## Prerequisites

- **Node.js** (LTS recommended, e.g. v20+)
- **npm**
- **MongoDB** accessible via a connection string (`MONGO_URI`)

## Clone and install

From the repository root:

```bash
cd backend && npm install
cd ../fronted && npm install
```

## Configure environment

### Backend

Create `backend/.env` (do not commit real secrets). Use [Environment variables](./environment-variables.md) as a checklist.

Minimum typical keys:

- `MONGO_URI`
- `JWT_SECRET` (required for login token signing)
- `SESSION_SECRET` (strongly recommended; used for session signing and Mongo session encryption)
- `FRONTEND_URL` (e.g. `http://localhost:5173`)

### Frontend

Optional `fronted/.env` for variables exposed to the browser (must be prefixed with `VITE_`), e.g.:

- `VITE_BACKEND_URL=http://localhost:8000`  
  (Only needed if you call the API by full URL; in dev, Vite often proxies `/api` to the backend.)

## Run the backend

```bash
cd backend
npm run dev
```

Default listen URL: **http://localhost:8000**

## Run the frontend

In a second terminal:

```bash
cd fronted
npm run dev
```

Default dev URL: **http://localhost:5173**

The Vite config proxies **`/api`** to `http://localhost:8000`, so the browser can use relative paths like `/api/auth/login` during development.

## Useful checks

- Root API: `GET http://localhost:8000/` → plain text hello response
- Version: `GET http://localhost:8000/api/version` → JSON with version **1.1.3** and data-protection flags

## Production build (frontend)

```bash
cd fronted
npm run build
npm start
```

The production server entry is configured in `fronted/package.json` (`react-router-serve`). Ensure the deployed API URL and CORS `FRONTEND_URL` match your hosting setup.
