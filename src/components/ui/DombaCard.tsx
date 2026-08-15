import Link from "next/link";
import type { Domba } from "@/lib/types";
import { HealthBadge } from "./HealthBadge";
import { hitungUsia, labelJenisKelamin } from "@/lib/utils";

export function DombaCard({ domba }: { domba: Domba }) {
  return (
    <Link
      href={`/dashboard/domba/${domba.kode}`}
      className="block rounded-xl bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-code text-xs text-ink-light">{domba.kode}</p>
          <p className="mt-1 font-display font-bold text-ink">
            {domba.ras || "Ras tidak diketahui"}
          </p>
          <p className="mt-0.5 text-sm text-ink-light">
            {labelJenisKelamin(domba.jenis_kelamin)} · {hitungUsia(domba.tanggal_lahir)}
          </p>
        </div>
        <HealthBadge status={domba.kondisi_kesehatan} />
      </div>
    </Link>
  );
}
