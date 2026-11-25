import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";

// Belt-and-suspenders alongside the X-Robots-Tag header middleware already
// sets on every /admin response — this covers the <meta name="robots">
// tag specifically, in case anything ever reads/renders this HTML outside
// that middleware's reach. Applies to every page under this layout.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  // Middleware already redirects signed-out visitors, but pages must not rely
  // on a single layer (e.g. CVE-2025-29927 skips middleware entirely).
  if (!session) redirect("/admin/login");
  const isAdmin = session?.role === "admin";
  const pages = session?.pages || [];

  return (
    <AdminShell
      isAdmin={isAdmin}
      pages={pages}
      sessionEmail={session?.email}
      sessionRole={session?.role}
      brandName="Amsterdam Boat Cruise"
      brandColorClass="text-canal-orange"
      avatarColorClass="bg-canal-ink"
    >
      {children}
    </AdminShell>
  );
}
