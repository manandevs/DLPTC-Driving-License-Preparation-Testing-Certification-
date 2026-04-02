# Environment variables

Never commit real `.env` files. Use separate values per environment (dev/staging/production).

## Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB connection string |
| `MONGO_DB_NAME` | No | Database name (defaults to `test` in `connectDB` / session store if unset) |
| `JWT_SECRET` | Yes (login) | Secret for signing JWTs returned on login |
| `SESSION_SECRET` | **Strongly recommended** | Secret for signing session cookies and encrypting session payloads in MongoDB. If omitted, the app may fall back to `JWT_SECRET` (see `server.js`) |
| `FRONTEND_URL` | Yes (CORS) | Allowed browser origin for credentialed requests, e.g. `http://localhost:5173` |
| `ADMIN_EMAILS` | No | Comma-separated emails promoted to `role: admin` on login/register |
| `NODE_ENV` | No | Set to `production` for stricter cookie settings (`secure`, `sameSite: none`) |

### Generating `SESSION_SECRET`

Use a long random string (e.g. 64 bytes hex):

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Frontend (`fronted/.env`)

Only variables prefixed with **`VITE_`** are exposed to client code.

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_BACKEND_URL` | Optional in dev | Full API base if not using the `/api` proxy (e.g. `http://localhost:8000`) |

Example:

```env
VITE_BACKEND_URL=http://localhost:8000
```

## Cross-origin cookies

For the session cookie to be sent from the browser:

- CORS on the API must allow `FRONTEND_URL` and **`credentials: true`** (already configured in `server.js`).
- Frontend `fetch`/axios must use **`credentials: 'include'`** (or **`withCredentials: true`**).
