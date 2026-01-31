# Admin area security

This document describes how the admin area is protected and what you must do to keep it secure.

## What is protected

- **Pages**: All routes under `/admin` except `/admin/login` require a valid session. The protected layout checks the `admin_session` cookie and verifies the JWT before rendering any content.
- **APIs**: All routes under `/api/admin/*` (except login `POST /api/admin/auth`) require a valid session. Each handler calls `verifyAdmin(request)` and returns `401 Unauthorized` if the session is missing or invalid.

## How it works

1. **Login** (`POST /api/admin/auth`): Password is checked against `ADMIN_PASSWORD_HASH` (bcrypt). On success, a JWT is created and set in an `admin_session` HTTP-only, secure (in production), SameSite=Lax cookie.
2. **Protected pages**: The `(protected)` layout reads the cookie, verifies the JWT with `JWT_SECRET`, and redirects to `/admin/login` if invalid or missing.
3. **Protected APIs**: Each admin API reads the cookie and verifies the JWT; if invalid, it returns 401.
4. **Logout** (`DELETE /api/admin/auth`): Clears the session cookie with the same path and options so the session is fully removed.

## Security measures in code

- **Password**: Stored only as bcrypt hash; never logged or sent to the client.
- **Session cookie**: `httpOnly` (not readable by JS), `secure` in production (HTTPS only), `sameSite: 'lax'` (CSRF mitigation), 24h expiry.
- **JWT**: Signed with `JWT_SECRET`; in production the app refuses to run with a missing or weak default secret (see below).
- **Rate limiting**: Login is limited to 5 attempts per IP per 15 minutes to reduce brute-force risk.
- **Headers**: Middleware sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` for `/admin`.

## What you must do

1. **Set a strong `JWT_SECRET` in production**  
   At least 32 characters, random. Example:
   ```bash
   openssl rand -base64 32
   ```
   Set it in your hosting env (e.g. Vercel → Project → Settings → Environment Variables). In production, the app will error if `JWT_SECRET` is missing or still the default placeholder.

2. **Use a strong admin password**  
   Generate a good password and store only its bcrypt hash in `ADMIN_PASSWORD_HASH`. In `.env` escape every `$` in the hash with a backslash (e.g. `ADMIN_PASSWORD_HASH=\$2b\$10\$...`).

3. **Use HTTPS in production**  
   The session cookie is set `secure` in production so it is only sent over HTTPS. Ensure your host serves the site over HTTPS and redirects HTTP to HTTPS.

4. **Keep dependencies and env safe**  
   Run `npm audit` and update packages. Do not commit `.env` or expose `JWT_SECRET` or `ADMIN_PASSWORD_HASH` in client code or logs.

## Limitations

- **Rate limiting** is in-memory per process. On multiple instances (e.g. serverless), each instance has its own counter; for stricter limits across instances, use a shared store (e.g. Redis/Vercel KV) and plug it into `lib/rate-limit.ts`.
- **“100% certain”**: No system is invulnerable. The above gives strong protection for a single-admin, cookie-based setup; for higher assurance you could add 2FA, audit logging, or a dedicated auth provider (e.g. Auth0, Clerk).
