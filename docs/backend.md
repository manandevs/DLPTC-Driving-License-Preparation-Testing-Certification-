# Backend

## Stack

- **Runtime:** Node.js  
- **Framework:** Express 5  
- **Database:** MongoDB via Mongoose  
- **Auth:** bcrypt (passwords), jsonwebtoken (optional bearer), express-session + connect-mongo (sessions)

## Entry point

`backend/server.js` wires:

1. `dotenv`
2. **CORS** — `origin: FRONTEND_URL`, `credentials: true`
3. **JSON body** parser
4. **Session** — cookie name `dlptc.sid`, Mongo store with encrypted payloads (`crypto.secret`)
5. Routes: `/api/auth`, `/api/profile`
6. Mongo connection then `listen(8000)`

## Scripts (`package.json`)

| Script | Command | Purpose |
|--------|---------|---------|
| `start` | `node ./server.js` | Production-style run |
| `dev` | `nodemon ./server.js` | Development with restart |

## Modules

### Config

- **`config/connectDB.js`** — Connects Mongoose with `MONGO_URI` and default `dbName: 'test'` unless overridden.

### Models

- **`models/User.js`** — User schema (see [Database](./database.md)).

### Middleware

- **`middleware/sessionAuth.js`** — Requires `req.session.userId`, loads user from DB, sets `req.user`.
- **`middleware/requireAdmin.js`** — Requires `req.user.role === 'admin'` (use after `sessionAuth`).
- **`middleware/authMiddleware.js`** — JWT bearer verification; not used by profile routes.

### Routes

- **`routes/authRouters.js`** — Register, login, logout; session regeneration on register/login; `syncAdminRole` from `ADMIN_EMAILS`.
- **`routes/profileRoutes.js`** — `GET /` (own profile), `GET /admin/:userId` (admin only).

## Error handling pattern

Auth routes return JSON `{ success: false, message: "..." }` with appropriate HTTP status codes. Unhandled errors may include `error` with message in development responses where implemented.
