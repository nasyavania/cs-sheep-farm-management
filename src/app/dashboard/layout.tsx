import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Navigation } from "@/components/layout/Navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Navigation />
        <main className="flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
