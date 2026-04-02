# Security & sessions

## Summary (v1.1.3)

- **Profile data** is exposed only to the **authenticated** user via **`GET /api/profile`**, bound to a **server-side session** (not JWT for that route).
- **Administrators** may load another user’s profile via **`GET /api/profile/admin/:userId`** after `ADMIN_EMAILS` / `role` promotion.
- **Session cookie** `dlptc.sid` is **httpOnly** and **signed**.
- **Session records** in MongoDB use **connect-mongo encryption** for stored payload (`crypto.secret`).
- **Transport:** deploy the API behind **HTTPS** in production so traffic between browser and server is encrypted.

## Session lifecycle

1. **Register** or **login** calls `req.session.regenerate()` to reduce session fixation risk.
2. `req.session.userId` and `req.session.role` are set after successful authentication.
3. **Logout** calls `req.session.destroy()` and clears the cookie with aligned `secure` / `sameSite` flags.

## Cookie flags

| Flag | Development | Production (`NODE_ENV=production`) |
|------|-------------|-------------------------------------|
| `httpOnly` | `true` | `true` |
| `secure` | `false` | `true` |
| `sameSite` | `lax` | `none` (typical for cross-site SPA + API) |

Production cross-origin SPAs often need **`sameSite: 'none'`** and **`secure: true`** together.

## CORS

The API allows credentialed browser calls from **`FRONTEND_URL`** only. Do not use `*` origin with cookies.

## JWT

Login still returns a **JWT** for optional use (e.g. mobile or legacy clients). **Profile routes** use **`sessionAuth`** only. If you rely on JWT elsewhere, keep **`JWT_SECRET`** strong and rotate carefully.

## Admin access

- List privileged emails in **`ADMIN_EMAILS`** (comma-separated).
- On **login** and **register**, matching users get **`role: admin`** persisted on the document.
- **`requireAdmin`** middleware blocks non-admins from **`/api/profile/admin/:userId`**.

## Operational checklist

- Set a dedicated **`SESSION_SECRET`** in production (do not rely on defaults).
- Use **HTTPS** everywhere in production.
- Keep **`FRONTEND_URL`** exactly aligned with the real SPA origin.
- Never commit **`.env`** or real Mongo credentials to git.
