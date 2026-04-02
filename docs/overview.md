# Overview

## What is DLPTC?

**DLPTC** stands for **Driving License Preparation, Testing, Certification**. It is a web application stack intended to help users prepare for driving license exams through learning content, practice tests, and related flows.

The codebase is split into:

- **`backend/`** — Node.js (Express) REST API with MongoDB
- **`fronted/`** — React 19 single-page app using React Router 7 and Vite (folder name retains the historical spelling `fronted`)

## Version 1.1.3 (highlight)

Release **1.1.3** introduces **session-based protection** for profile data:

- Profile endpoints require a valid **server-side session** (cookie `dlptc.sid`), not only a JWT.
- Session data is persisted in **MongoDB** and optionally **encrypted at rest** in the session store.
- **Administrators** (configured via `ADMIN_EMAILS`) can load other users’ profiles through a dedicated admin route.

See [Security & sessions](./security-sessions.md) for details.

## Product status

The backend implements **authentication** (register, login, logout), **user profiles**, and **version metadata**. The frontend currently exposes routes such as **home** and **registration UI**; feature coverage may expand over time.

For technical scope, see [Architecture](./architecture.md) and [API reference](./api-reference.md).
