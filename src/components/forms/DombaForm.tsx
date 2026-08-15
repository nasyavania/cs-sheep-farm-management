"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import type { Domba, JenisKelamin, AsalDomba, KondisiKesehatan } from "@/lib/types";

type Props = {
  mode: "tambah" | "edit";
  dombaAwal?: Domba;
  daftarDomba: Domba[];
};

export function DombaForm({ mode, dombaAwal, daftarDomba }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    kode: dombaAwal?.kode ?? "",
    tanggal_lahir: dombaAwal?.tanggal_lahir ?? "",
    jenis_kelamin: dombaAwal?.jenis_kelamin ?? ("jantan" as JenisKelamin),
    ras: dombaAwal?.ras ?? "",
    id_induk_jantan: dombaAwal?.id_induk_jantan ?? "",
    id_induk_betina: dombaAwal?.id_induk_betina ?? "",
    asal: dombaAwal?.asal ?? ("lahir_di_peternakan" as AsalDomba),
    kondisi_kesehatan: dombaAwal?.kondisi_kesehatan ?? ("sehat" as KondisiKesehatan),
    catatan_sakit: dombaAwal?.catatan_sakit ?? "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const payload = {
      kode: form.kode,
      tanggal_lahir: form.tanggal_lahir || null,
      jenis_kelamin: form.jenis_kelamin,
      ras: form.ras || null,
      id_induk_jantan: form.id_induk_jantan || null,
      id_induk_betina: form.id_induk_betina || null,
      asal: form.asal,
      kondisi_kesehatan: form.kondisi_kesehatan,
      catatan_sakit: form.catatan_sakit || null,
    };

    const { error } =
      mode === "tambah"
        ? await supabase.from("domba").insert(payload)
        : await supabase.from("domba").update(payload).eq("id", dombaAwal!.id);

    setLoading(false);

    if (error) {
      setError(
        error.code === "23505"
          ? "Kode domba ini sudah dipakai. Gunakan kode lain."
          : "Gagal menyimpan data. Coba lagi."
      );
      return;
    }

    router.push(`/dashboard/domba/${form.kode}`);
    router.refresh();
  }

  const calonInduk = daftarDomba.filter((d) => d.id !== dombaAwal?.id);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Kode Domba">
        <input
          required
          value={form.kode}
          onChange={(e) => update("kode", e.target.value)}
          placeholder="Contoh: DOMBA-001"
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 font-code text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
        />
      </Field>

      <Field label="Tanggal Lahir">
        <input
          type="date"
          value={form.tanggal_lahir}
          onChange={(e) => update("tanggal_lahir", e.target.value)}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
        />
      </Field>

      <Field label="Jenis Kelamin">
        <select
          value={form.jenis_kelamin}
          onChange={(e) => update("jenis_kelamin", e.target.value as JenisKelamin)}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
        >
          <option value="jantan">Jantan</option>
          <option value="betina">Betina</option>
        </select>
      </Field>

      <Field label="Ras">
        <input
          value={form.ras}
          onChange={(e) => update("ras", e.target.value)}
          placeholder="Contoh: Garut, Merino, Ekor Gemuk"
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
        />
      </Field>

      <Field label="Induk Jantan">
        <select
          value={form.id_induk_jantan}
          onChange={(e) => update("id_induk_jantan", e.target.value)}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
        >
          <option value="">Tidak diketahui</option>
          {calonInduk
            .filter((d) => d.jenis_kelamin === "jantan")
            .map((d) => (
              <option key={d.id} value={d.id}>
                {d.kode}
              </option>
            ))}
        </select>
      </Field>

      <Field label="Induk Betina">
        <select
          value={form.id_induk_betina}
          onChange={(e) => update("id_induk_betina", e.target.value)}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
        >
          <option value="">Tidak diketahui</option>
          {calonInduk
            .filter((d) => d.jenis_kelamin === "betina")
            .map((d) => (
              <option key={d.id} value={d.id}>
                {d.kode}
              </option>
            ))}
        </select>
      </Field>

      <Field label="Asal Domba">
        <select
          value={form.asal}
          onChange={(e) => update("asal", e.target.value as AsalDomba)}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
        >
          <option value="lahir_di_peternakan">Lahir di peternakan</option>
          <option value="beli_luar">Beli dari luar</option>
        </select>
      </Field>

      <Field label="Kondisi Kesehatan">
        <select
          value={form.kondisi_kesehatan}
          onChange={(e) => update("kondisi_kesehatan", e.target.value as KondisiKesehatan)}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
        >
          <option value="sehat">Sehat</option>
          <option value="kurang_fit">Kurang Fit</option>
          <option value="sakit">Sakit</option>
        </select>
      </Field>

      <Field label="Catatan Kesehatan (opsional)">
        <textarea
          value={form.catatan_sakit}
          onChange={(e) => update("catatan_sakit", e.target.value)}
          rows={3}
          placeholder="Contoh: Demam ringan sejak 2 hari lalu"
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
        />
      </Field>

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? "Menyimpan..."
          : mode === "tambah"
          ? "Simpan Domba Baru"
          : "Simpan Perubahan"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink">{label}</label>
      {children}
    </div>
  );
}
