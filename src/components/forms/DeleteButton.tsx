"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleHapus() {
    const yakin = window.confirm(
      "Yakin ingin menghapus data domba ini? Data yang sudah dihapus tidak bisa dikembalikan."
    );
    if (!yakin) return;

    setLoading(true);
    const supabase = createClient();
    await supabase.from("domba").delete().eq("id", id);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Button variant="danger" onClick={handleHapus} disabled={loading}>
      {loading ? "Menghapus..." : "Hapus"}
    </Button>
  );
}
