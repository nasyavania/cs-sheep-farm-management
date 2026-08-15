import { createClient } from "@/lib/supabase/server";
import { DombaForm } from "@/components/forms/DombaForm";
import type { Domba } from "@/lib/types";

export default async function TambahDombaPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("domba").select("*");

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-2xl font-bold text-ink">
        Tambah Domba Baru
      </h1>
      <p className="mt-1 text-sm text-ink-light">
        Isi data domba yang baru terdaftar
      </p>
      <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
        <DombaForm mode="tambah" daftarDomba={(data ?? []) as Domba[]} />
      </div>
    </div>
  );
}
