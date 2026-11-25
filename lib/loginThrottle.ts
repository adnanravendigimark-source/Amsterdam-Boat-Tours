import { sql } from "./db";

// Admin login throttling, stored in Postgres so it works across serverless
// instances. Only failed attempts are recorded. Limits per 15 minutes:
//   - 5 failures for one email from one IP
//   - 100 failures for one email from any IP (a high safety net only: a low
//     cap here would let anyone lock the owner out by failing on purpose)
//   - 30 failures from one IP across any emails
// If the table can't be reached, login still works (the captcha remains in
// front of it) and the error is logged, so a database hiccup never locks the
// owner out.

const WINDOW_MINUTES = 15;
const MAX_PER_EMAIL_IP = 5;
const MAX_PER_EMAIL = 100;
const MAX_PER_IP = 30;

let tableReady: Promise<void> | null = null;

function ensureTable(): Promise<void> {
  tableReady ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS login_attempts (
        id BIGSERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        ip TEXT NOT NULL,
        attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS login_attempts_email_at ON login_attempts (email, attempted_at)`;
    await sql`CREATE INDEX IF NOT EXISTS login_attempts_ip_at ON login_attempts (ip, attempted_at)`;
  })().catch((err) => {
    tableReady = null; // retry on the next request
    throw err;
  });
  return tableReady;
}

const key = (email: string) => email.trim().toLowerCase().slice(0, 254);
const ipKey = (ip: string | null) => (ip || "unknown").slice(0, 64);

/** True when this email/IP has failed too often recently and must wait. */
export async function isLoginThrottled(email: string, ip: string | null): Promise<boolean> {
  try {
    await ensureTable();
    const rows = await sql`
      SELECT
        count(*) FILTER (WHERE email = ${key(email)} AND ip = ${ipKey(ip)}) AS by_email_ip,
        count(*) FILTER (WHERE email = ${key(email)}) AS by_email,
        count(*) FILTER (WHERE ip = ${ipKey(ip)}) AS by_ip
      FROM login_attempts
      WHERE attempted_at > now() - make_interval(mins => ${WINDOW_MINUTES})
        AND (email = ${key(email)} OR ip = ${ipKey(ip)})
    `;
    const r = rows[0] ?? {};
    return (
      Number(r.by_email_ip) >= MAX_PER_EMAIL_IP ||
      Number(r.by_email) >= MAX_PER_EMAIL ||
      Number(r.by_ip) >= MAX_PER_IP
    );
  } catch (err) {
    console.error("[login-throttle] check failed; allowing attempt", err instanceof Error ? err.message : err);
    return false;
  }
}

/** Record a failed attempt; old rows are pruned now and then. */
export async function recordLoginFailure(email: string, ip: string | null): Promise<void> {
  try {
    await ensureTable();
    await sql`INSERT INTO login_attempts (email, ip) VALUES (${key(email)}, ${ipKey(ip)})`;
    if (Math.random() < 0.05) {
      await sql`DELETE FROM login_attempts WHERE attempted_at < now() - interval '1 day'`;
    }
  } catch (err) {
    console.error("[login-throttle] record failed", err instanceof Error ? err.message : err);
  }
}

/** A successful sign-in clears that email's failures from this IP. */
export async function clearLoginFailures(email: string, ip: string | null): Promise<void> {
  try {
    await ensureTable();
    await sql`DELETE FROM login_attempts WHERE email = ${key(email)} AND ip = ${ipKey(ip)}`;
  } catch (err) {
    console.error("[login-throttle] clear failed", err instanceof Error ? err.message : err);
  }
}
