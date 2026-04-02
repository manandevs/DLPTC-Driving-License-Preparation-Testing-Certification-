# Database

## MongoDB

Connection is configured in **`backend/.env`** via `MONGO_URI`.

The app uses database name **`test`** by default in `config/connectDB.js` unless `MONGO_DB_NAME` overrides it (session store uses the same default for `dbName` when set in `server.js`).

## User model (`backend/models/User.js`)

| Field | Type | Notes |
|-------|------|--------|
| `name` | String | Required, trimmed |
| `email` | String | Required, unique, trimmed, lowercased |
| `password` | String | Required; stored **hashed** (bcrypt), never returned by profile APIs |
| `cellphone` | String | Required |
| `role` | String | `user` or `admin`; default `user` |
| `createdAt` / `updatedAt` | Date | Added by `timestamps: true` |

## Session storage

**express-session** persists data through **connect-mongo**:

- Sessions live in a MongoDB collection managed by the store.
- **TTL** is configured in `server.js` (default **14 days** in seconds as passed to the store).
- **Encryption:** store `crypto.secret` uses the same secret as session signing (prefer `SESSION_SECRET`).

Session payload (server-side) includes at least:

- `userId` — stringified Mongo ObjectId  
- `role` — mirrors user role at login/register time  

The client only receives the opaque signed cookie **`dlptc.sid`**.

## Indexes

Mongoose creates indexes implied by the schema (e.g. unique `email`). The session store may create TTL/indexes on the sessions collection automatically.
