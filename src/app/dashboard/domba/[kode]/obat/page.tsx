import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ObatForm } from "@/components/forms/ObatForm";
import type { RiwayatObat } from "@/lib/types";
import { formatTanggal } from "@/lib/utils";

export default async function RiwayatObatPage({
  params,
}: {
  params: Promise<{ kode: string }>;
}) {
  const { kode } = await params;
  const supabase = await createClient();

  const { data: domba } = await supabase
    .from("domba")
    .select("*")
    .eq("kode", kode)
    .single();

  if (!domba) notFound();

  const { data: riwayat } = await supabase
    .from("riwayat_obat")
    .select("*")
    .eq("id_domba", domba.id)
    .order("tanggal_pemberian", { ascending: false });

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-2xl font-bold text-ink">
        Riwayat Obat
      </h1>
      <p className="mt-1 text-sm text-ink-light">Domba {domba.kode}</p>

      <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="font-display text-base font-bold text-ink">
          Tambah Catatan Baru
        </h2>
        <div className="mt-4">
          <ObatForm idDomba={domba.id} />
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="font-display text-base font-bold text-ink">Riwayat</h2>
        {!riwayat || riwayat.length === 0 ? (
          <p className="mt-2 text-sm text-ink-light">Belum ada riwayat obat.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {(riwayat as RiwayatObat[]).map((obat) => (
              <li key={obat.id} className="border-l-2 border-accent pl-3">
                <p className="text-sm font-semibold text-ink">{obat.nama_obat}</p>
                <p className="text-xs text-ink-light">
                  {formatTanggal(obat.tanggal_pemberian)}
                  {obat.dosis ? ` · ${obat.dosis}` : ""}
                </p>
                {obat.catatan && (
                  <p className="mt-0.5 text-xs text-ink-light">{obat.catatan}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
