import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { PageKey } from "./pageAccess";
import { verifySessionToken, ADMIN_COOKIE_NAME, type Session } from "./auth";

export async function getSession(): Promise<Session | null> {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

/**
 * Per-route authorization for /api/admin/* handlers. Middleware checks the
 * same thing, but a route must never rely on one layer: if middleware is ever
 * skipped (a framework bug such as CVE-2025-29927, a matcher change, a move
 * off Vercel), every write would otherwise be open.
 *
 * - no valid session → 401
 * - admin → allowed everywhere
 * - editor → allowed only for the page sections granted to them;
 *   "any-content" (uploads, media library) needs at least one granted section.
 *
 * Returns a response to send back when access is denied, or null when allowed.
 */
export async function requirePageAccess(page: PageKey | "any-content"): Promise<NextResponse | null> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role === "admin") return null;
  const allowed = page === "any-content" ? session.pages.length > 0 : session.pages.includes(page);
  return allowed ? null : NextResponse.json({ error: "You don't have access to this section." }, { status: 403 });
}

/**
 * Same rule as requirePageAccess, for admin *pages* (server components):
 * redirects instead of returning 401/403. "admin-only" is for Users and
 * Indexing. Defense in depth behind middleware, which already enforces this.
 */
export async function requirePageView(page: PageKey | "admin-only"): Promise<void> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (session.role === "admin") return;
  if (page === "admin-only" || !session.pages.includes(page)) redirect("/admin");
}
