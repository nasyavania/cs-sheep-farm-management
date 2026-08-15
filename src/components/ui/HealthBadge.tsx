import { cn } from "@/lib/utils";
import type { KondisiKesehatan } from "@/lib/types";

const konfigurasi: Record<
  KondisiKesehatan,
  { label: string; className: string }
> = {
  sehat: { label: "Sehat", className: "bg-green-100 text-green-800" },
  kurang_fit: { label: "Kurang Fit", className: "bg-amber-100 text-amber-800" },
  sakit: { label: "Sakit", className: "bg-red-100 text-red-800" },
};

export function HealthBadge({ status }: { status: KondisiKesehatan }) {
  const config = konfigurasi[status] ?? konfigurasi.sehat;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
