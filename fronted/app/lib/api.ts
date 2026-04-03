import axios from "axios";
import { AUTH_TOKEN_STORAGE_KEY } from "./authStorage";

/**
 * API origin without trailing slash.
 * In dev with no `VITE_BACKEND_URL`, use same-origin `/api/...` so the Vite proxy
 * forwards cookies (httpOnly session) to the backend.
 */
export function apiBaseUrl() {
  const fromEnv = String(import.meta.env.VITE_BACKEND_URL ?? "")
    .trim()
    .replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  if (import.meta.env.DEV) return "";
  return "";
}

/**
 * Authenticated API client: sends cookies (httpOnly JWT session) on every request.
 * Use this for `/api/profile`, `/api/consent`, `/api/admin/*`, etc.
 */
export const api = axios.create({
  baseURL: apiBaseUrl(),
  withCredentials: true,
});

/**
 * Optional `Authorization: Bearer` for legacy tokens in localStorage.
 * Prefer cookie sessions via `api`; middleware accepts either.
 */
export function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}
