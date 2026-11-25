import type { PageKey } from "./pageAccess";

export const ADMIN_COOKIE_NAME = "abt_admin_session";

/** Sessions last 8 hours; the expiry is inside the signed token, not just the cookie. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

const DEV_FALLBACK_SECRET = "amsterdam-admin-dev-secret-change-me";

/**
 * The HMAC secret. In production a missing or short ADMIN_SESSION_SECRET fails
 * closed (no session can be created or verified) instead of falling back to a
 * known string anyone could use to forge an admin cookie.
 */
function sessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    console.error("[auth] ADMIN_SESSION_SECRET is missing or shorter than 32 characters; admin sign-in is disabled.");
    return null;
  }
  return secret || DEV_FALLBACK_SECRET;
}

export type SessionRole = "admin" | "editor";

export interface Session {
  email: string;
  role: SessionRole;
  pages: PageKey[];
}

async function getKey(): Promise<CryptoKey | null> {
  const secret = sessionSecret();
  if (!secret) return null;
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(input: string | ArrayBuffer) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string) {
  const bin = atob(input.replace(/-/g, "+").replace(/_/g, "/"));
  return bin;
}

function base64UrlToBytes(input: string): ArrayBuffer | null {
  try {
    return Uint8Array.from(fromBase64Url(input), (c) => c.charCodeAt(0)).buffer as ArrayBuffer;
  } catch {
    return null;
  }
}

export async function createSessionToken(session: Session): Promise<string> {
  const key = await getKey();
  if (!key) throw new Error("Admin sessions are disabled: ADMIN_SESSION_SECRET is not configured.");
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const payload = toBase64Url(JSON.stringify({ ...session, exp }));
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toBase64Url(sigBuf)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<Session | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const key = await getKey();
  const sigBytes = base64UrlToBytes(sig);
  if (!key || !sigBytes) return null;
  // crypto.subtle.verify compares the MAC in constant time.
  const valid = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(payload));
  if (!valid) return null;
  try {
    const parsed = JSON.parse(fromBase64Url(payload));
    if (!parsed?.email || (parsed.role !== "admin" && parsed.role !== "editor")) return null;
    // Tokens without an expiry (issued before this change) or past it are rejected.
    if (typeof parsed.exp !== "number" || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    const pages = Array.isArray(parsed.pages) ? (parsed.pages as PageKey[]) : [];
    return { email: parsed.email, role: parsed.role, pages };
  } catch {
    return null;
  }
}
