import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DombaForm } from "@/components/forms/DombaForm";
import type { Domba } from "@/lib/types";

export default async function EditDombaPage({
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

  const { data: semuaDomba } = await supabase.from("domba").select("*");

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-2xl font-bold text-ink">
        Ubah Data Domba
      </h1>
      <p className="mt-1 text-sm text-ink-light">Kode: {domba.kode}</p>
      <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
        <DombaForm
          mode="edit"
          dombaAwal={domba as Domba}
          daftarDomba={(semuaDomba ?? []) as Domba[]}
        />
      </div>
    </div>
  );
}
