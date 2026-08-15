import { createClient } from "@/lib/supabase/server";
import { DombaCard } from "@/components/ui/DombaCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchBar } from "@/components/ui/SearchBar";
import type { Domba } from "@/lib/types";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("domba")
    .select("*")
    .order("created_at", { ascending: false });

  if (q) query = query.ilike("kode", `%${q}%`);

  const { data } = await query;
  const daftarDomba = (data ?? []) as Domba[];

  const totalSehat = daftarDomba.filter((d) => d.kondisi_kesehatan === "sehat").length;
  const totalSakit = daftarDomba.filter((d) => d.kondisi_kesehatan === "sakit").length;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Beranda</h1>
      <p className="mt-1 text-sm text-ink-light">
        Ringkasan data domba peternakan
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard label="Total Domba" value={daftarDomba.length} />
        <StatCard label="Sehat" value={totalSehat} className="text-green-700" />
        <StatCard label="Sakit" value={totalSakit} className="text-danger" />
      </div>

      <div className="mt-6">
        <SearchBar />
      </div>

      <h2 className="mt-6 font-display text-lg font-bold text-ink">
        Daftar Domba
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {daftarDomba.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState
              title={q ? "Domba tidak ditemukan" : "Belum ada domba terdaftar"}
              description={
                q
                  ? "Coba kata kunci lain, atau periksa kembali kode domba."
                  : "Tambahkan domba pertama lewat tombol 'Tambah Domba' di menu."
              }
            />
          </div>
        ) : (
          daftarDomba.map((domba) => <DombaCard key={domba.id} domba={domba} />)
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div className="rounded-xl bg-white p-4 text-center shadow-sm">
      <p className={`font-display text-2xl font-extrabold text-primary-dark ${className ?? ""}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-ink-light">{label}</p>
    </div>
  );
}
