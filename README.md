# DLPTC — Driving License Preparation, Testing, Certification

**Application version: 1.1.3**

## Release 1.1.3 — Session-based profile protection

- Profile data at `/api/profile` is available only when a valid **server-side session** is established (cookie `dlptc.sid`, signed with `SESSION_SECRET`).
- Sessions are stored in **MongoDB** (via `connect-mongo`) so they survive server restarts.
- Cookies are **httpOnly**; in production they use **secure** + **sameSite: none** for HTTPS cross-site setups. Session records in MongoDB are **encrypted at rest** (connect-mongo `crypto` using your session secret).
- Deploy the API behind **HTTPS** so traffic is encrypted in transit (“site-wide” transport protection).
- **Administrators** (emails listed in `ADMIN_EMAILS`, synced to `role: admin` on login/register) may read another user’s profile at `GET /api/profile/admin/:userId`.
- Optional compatibility: login still returns a **JWT** for clients that need it; **profile routes do not use the JWT** and rely on the session only.
- API metadata: `GET /api/version`

### Backend environment

See `backend/.env.example`. Set a dedicated `SESSION_SECRET` in production. Configure `ADMIN_EMAILS` for administrator accounts.

Frontend requests that need the session cookie must use `credentials: 'include'` (or axios `withCredentials: true`).

Full documentation lives in the [`docs/`](./docs/README.md) folder (overview, API, setup, security).
