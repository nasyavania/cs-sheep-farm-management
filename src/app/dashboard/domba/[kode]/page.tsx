import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { HealthBadge } from "@/components/ui/HealthBadge";
import { DeleteButton } from "@/components/forms/DeleteButton";
import {
  hitungUsia,
  labelJenisKelamin,
  labelAsal,
} from "@/lib/utils";

export default async function DombaDetailDashboardPage({
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

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-code text-sm text-ink-light">{domba.kode}</p>
          <h1 className="font-display text-2xl font-bold text-ink">
            {domba.ras || "Domba"}
          </h1>
        </div>
        <HealthBadge status={domba.kondisi_kesehatan} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/dashboard/domba/${kode}/edit`}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
        >
          Ubah Data
        </Link>
        <Link
          href={`/dashboard/domba/${kode}/obat`}
          className="rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
        >
          Riwayat Obat
        </Link>
        <DeleteButton id={domba.id} />
      </div>

      <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
        <Row label="Usia" value={hitungUsia(domba.tanggal_lahir)} />
        <Row label="Jenis Kelamin" value={labelJenisKelamin(domba.jenis_kelamin)} />
        <Row label="Asal" value={labelAsal(domba.asal)} />
        {domba.catatan_sakit && <Row label="Catatan" value={domba.catatan_sakit} />}
      </div>

      <Link
        href={`/domba/${domba.kode}`}
        target="_blank"
        className="mt-4 inline-block text-sm text-accent underline underline-offset-2"
      >
        Lihat versi publik (hasil tap NFC) ↗
      </Link>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-black/5 py-2 text-sm last:border-0">
      <span className="text-ink-light">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}
