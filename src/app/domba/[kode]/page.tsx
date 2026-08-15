import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { HealthBadge } from "@/components/ui/HealthBadge";
import type { RiwayatObat } from "@/lib/types";
import {
  hitungUsia,
  labelJenisKelamin,
  labelAsal,
  formatTanggal,
} from "@/lib/utils";

export default async function DombaPublicPage({
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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const sudahLogin = !!user;

  const { data: riwayatObat } = await supabase
    .from("riwayat_obat")
    .select("*")
    .eq("id_domba", domba.id)
    .order("tanggal_pemberian", { ascending: false });

  const [indukJantan, indukBetina] = await Promise.all([
    domba.id_induk_jantan
      ? supabase.from("domba").select("kode").eq("id", domba.id_induk_jantan).single()
      : Promise.resolve({ data: null }),
    domba.id_induk_betina
      ? supabase.from("domba").select("kode").eq("id", domba.id_induk_betina).single()
      : Promise.resolve({ data: null }),
  ]);

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <p className="font-code text-sm text-ink-light">{domba.kode}</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">
            {domba.ras || "Domba"}
          </h1>
          <div className="mt-2 flex justify-center">
            <HealthBadge status={domba.kondisi_kesehatan} />
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <InfoRow label="Jenis Kelamin" value={labelJenisKelamin(domba.jenis_kelamin)} />
          <InfoRow label="Usia" value={hitungUsia(domba.tanggal_lahir)} />
          {domba.tanggal_lahir && (
            <InfoRow label="Tanggal Lahir" value={formatTanggal(domba.tanggal_lahir)} />
          )}
          <InfoRow label="Ras" value={domba.ras || "-"} />
          <InfoRow label="Asal" value={labelAsal(domba.asal)} />
          <InfoRow label="Induk Jantan" value={indukJantan.data?.kode || "Tidak diketahui"} />
          <InfoRow label="Induk Betina" value={indukBetina.data?.kode || "Tidak diketahui"} />
          {domba.catatan_sakit && (
            <InfoRow label="Catatan Kesehatan" value={domba.catatan_sakit} />
          )}
        </div>

        <div className="mt-4 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-display text-base font-bold text-ink">
            Riwayat Obat
          </h2>
          {!riwayatObat || riwayatObat.length === 0 ? (
            <p className="mt-2 text-sm text-ink-light">
              Belum ada riwayat pemberian obat.
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {(riwayatObat as RiwayatObat[]).map((obat) => (
                <li key={obat.id} className="border-l-2 border-accent pl-3">
                  <p className="text-sm font-semibold text-ink">
                    {obat.nama_obat}
                  </p>
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

        {sudahLogin ? (
          <Link
            href={`/dashboard/domba/${domba.kode}/edit`}
            className="mt-6 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
          >
            Ubah Data Domba
          </Link>
        ) : (
          <Link
            href="/login"
            className="mt-6 block rounded-lg border-2 border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
          >
            Masuk sebagai Peternak
          </Link>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-black/5 py-2 text-sm last:border-0">
      <span className="text-ink-light">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}
