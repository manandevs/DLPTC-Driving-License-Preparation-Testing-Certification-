# Architecture

## High-level diagram

```text
┌─────────────────────────────────────────────────────────────┐
│  Browser                                                     │
│  React Router 7 + Vite (fronted/)                           │
│  Dev: http://localhost:5173 — proxies /api → backend        │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP (JSON, cookies for session)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Express API (backend/) — http://localhost:8000             │
│  • CORS + credentials                                       │
│  • express-session + connect-mongo                           │
│  • Auth routes (/api/auth)                                   │
│  • Profile routes (/api/profile)                             │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  MongoDB                                                     │
│  • Application data (e.g. users)                            │
│  • Session collection (encrypted payloads, TTL)             │
└─────────────────────────────────────────────────────────────┘
```

## Repository layout

```text
DLPTC/
├── backend/          # Express API
│   ├── config/       # DB connection
│   ├── middleware/ # sessionAuth, requireAdmin, JWT helper (legacy)
│   ├── models/       # Mongoose schemas
│   ├── routes/       # auth, profile
│   └── server.js     # App entry, session, routes
├── fronted/          # React app (note: spelling “fronted”)
│   ├── app/          # Routes, root layout, global CSS
│   └── public/       # Static assets (e.g. favicon)
└── docs/             # This documentation
```

## Request flows

### Registration / login

1. Client `POST`s JSON to `/api/auth/register` or `/api/auth/login`.
2. On success, the server creates a **session** (`userId`, `role`) and sets **`dlptc.sid`** (httpOnly cookie).
3. Login also returns a **JWT** in the JSON body for clients that still use bearer tokens (profile routes do not require it).

### Profile (session-only)

1. Client calls `GET /api/profile` with **cookies included** (`credentials: 'include'`).
2. `sessionAuth` loads the user from `req.session.userId` and attaches `req.user`.
3. Response contains the authenticated user’s profile fields (password never returned).

### Admin profile lookup

1. Admin user (see `ADMIN_EMAILS` / `role: admin`) calls `GET /api/profile/admin/:userId` with session cookie.
2. `requireAdmin` ensures `req.user.role === 'admin'`.

## Development vs production

| Concern | Development | Production |
|--------|-------------|------------|
| Frontend origin | Often `http://localhost:5173` | Your deployed URL (`FRONTEND_URL`) |
| API | `http://localhost:8000` or via Vite `/api` proxy | HTTPS recommended |
| Session cookie `secure` | `false` | `true` |
| Session cookie `sameSite` | `lax` | `none` (typical for cross-site API + SPA) |

See [Environment variables](./environment-variables.md).
