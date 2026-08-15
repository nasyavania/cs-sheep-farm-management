"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const menu = [
  { href: "/dashboard", label: "Beranda", icon: "🏠" },
  { href: "/dashboard/domba/tambah", label: "Tambah Domba", icon: "➕" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleKeluar() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {/* Sidebar — tampil di layar desktop */}
      <aside className="hidden w-56 shrink-0 border-r border-black/5 bg-white p-4 md:block">
        <nav className="flex flex-col gap-1">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-ink hover:bg-primary/10"
              )}
            >
              {item.icon} {item.label}
            </Link>
          ))}
          <button
            onClick={handleKeluar}
            className="mt-4 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-danger transition-colors duration-200 hover:bg-danger/10"
          >
            🚪 Keluar
          </button>
        </nav>
      </aside>

      {/* Bottom nav — tampil di layar mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-black/5 bg-white py-2 md:hidden">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-lg px-4 py-1.5 text-xs font-medium transition-colors duration-200",
              pathname === item.href ? "text-primary" : "text-ink-light"
            )}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleKeluar}
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-xs font-medium text-danger"
        >
          <span className="text-lg">🚪</span>
          Keluar
        </button>
      </nav>
    </>
  );
}
