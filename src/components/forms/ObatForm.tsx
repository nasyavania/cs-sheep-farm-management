"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export function ObatForm({ idDomba }: { idDomba: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nama_obat: "",
    tanggal_pemberian: "",
    dosis: "",
    catatan: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.from("riwayat_obat").insert({
      ...form,
      dosis: form.dosis || null,
      catatan: form.catatan || null,
      id_domba: idDomba,
    });

    setLoading(false);

    if (error) {
      setError("Gagal menyimpan catatan obat. Coba lagi.");
      return;
    }

    setForm({ nama_obat: "", tanggal_pemberian: "", dosis: "", catatan: "" });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        placeholder="Nama obat"
        value={form.nama_obat}
        onChange={(e) => setForm({ ...form, nama_obat: e.target.value })}
        className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
      />
      <input
        required
        type="date"
        value={form.tanggal_pemberian}
        onChange={(e) => setForm({ ...form, tanggal_pemberian: e.target.value })}
        className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
      />
      <input
        placeholder="Dosis (contoh: 5ml)"
        value={form.dosis}
        onChange={(e) => setForm({ ...form, dosis: e.target.value })}
        className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
      />
      <textarea
        placeholder="Catatan (opsional)"
        rows={2}
        value={form.catatan}
        onChange={(e) => setForm({ ...form, catatan: e.target.value })}
        className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
      />

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Menyimpan..." : "Simpan Catatan Obat"}
      </Button>
    </form>
  );
}
