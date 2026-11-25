import { notFound } from "next/navigation";
import { requirePageView } from "@/lib/session";

// Combo Offers admin section isn't used on this site — there's no
// corresponding homepage section, nav link, or dashboard card. This route
// file is kept only so the folder isn't empty; it's disabled rather than
// left reachable.
export default async function AdminCombosPage() {
  await requirePageView("homepage");
  notFound();
}
