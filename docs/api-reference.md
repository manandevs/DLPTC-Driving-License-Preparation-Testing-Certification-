# API reference

Base URL (local): **http://localhost:8000**

All JSON bodies use `Content-Type: application/json` unless noted.

## Root

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/` | No | Health-style text response (`Hello, World!`) |

## Version

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/version` | No | Returns API name, semver version, and data-protection metadata |

**Example response:**

```json
{
  "name": "DLPTC API",
  "version": "1.1.3",
  "dataProtection": {
    "sessionBasedAuth": true,
    "profileSessionOnly": true,
    "adminProfileAccess": true,
    "cookieHttpOnly": true,
    "cookieSigned": true,
    "sessionStoreEncrypted": true
  }
}
```

---

## Authentication (`/api/auth`)

### Register

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register` | No | Create user; on success establishes session |

**Body:**

| Field | Type | Rules |
|-------|------|--------|
| `name` | string | Required |
| `email` | string | Required |
| `password` | string | Required, min length 8 |
| `cellphone` | string | Required |

**Success:** `201` — `{ "success": true, "message": "..." }` (session cookie set when regeneration succeeds).

**Errors:** `400` validation, `409` email already registered, `500` server error.

---

### Login

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/login` | No | Validates credentials; creates session; returns JWT |

**Body:**

| Field | Type |
|-------|------|
| `email` | string |
| `password` | string |

**Success:** `200` — `{ "success": true, "message": "Login successful.", "token": "<jwt>" }`

**Errors:** `400`, `401`, `500`. Server error if `JWT_SECRET` is missing.

---

### Logout

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/logout` | Session optional | Destroys session and clears `dlptc.sid` |

**Success:** `200` — `{ "success": true, "message": "Logged out." }`

---

## Profile (`/api/profile`)

These routes use **session authentication only** (`sessionAuth`). Send cookies (`credentials: 'include'`).

### Current user profile

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/profile` | Session | Returns the logged-in user’s profile |

**Success:** `200`

```json
{
  "success": true,
  "profile": {
    "id": "...",
    "name": "...",
    "email": "...",
    "cellphone": "...",
    "role": "user",
    "createdAt": "..."
  }
}
```

**Errors:** `401` if not logged in or session invalid.

---

### Admin: user by ID

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/profile/admin/:userId` | Session + `admin` role | Returns profile for another user |

**Success:** `200` — same `profile` shape as above.

**Errors:** `400` invalid ObjectId, `403` not admin, `404` user not found, `401` not authenticated.

---

## JWT middleware (legacy / auxiliary)

`backend/middleware/authMiddleware.js` verifies `Authorization: Bearer <token>`. **Profile routes do not use this**; they use `sessionAuth`. The JWT is still returned on login for other client flows if needed.
