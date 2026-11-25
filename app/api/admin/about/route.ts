import { withSiteRevalidate } from "@/lib/revalidateSite";
import { NextResponse } from "next/server";
import { getAboutPage, saveAboutPage, type AboutPageContent } from "@/lib/about";
import { dbErrorMessage } from "@/lib/db";
import { requirePageAccess } from "@/lib/session";

// Force this route to always run as a live serverless function rather than
// get statically optimized at build time — see the identical comment on
// every other /api/admin/* route for why this matters.
export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requirePageAccess("about");
  if (denied) return denied;
  return NextResponse.json(await getAboutPage());
}

async function PUTHandler(req: Request) {
  const denied = await requirePageAccess("about");
  if (denied) return denied;
  try {
    const body = (await req.json().catch(() => null)) as AboutPageContent | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    if (!body.heroHeading?.trim()) {
      return NextResponse.json({ error: "Hero heading is required." }, { status: 400 });
    }
    await saveAboutPage(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}

export const PUT = withSiteRevalidate(PUTHandler);
