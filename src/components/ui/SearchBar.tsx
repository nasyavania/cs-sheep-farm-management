"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(value ? `/dashboard?q=${encodeURIComponent(value)}` : "/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari kode domba... (contoh: DOMBA-001)"
        className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-shadow duration-200 focus:ring-2 focus:ring-accent"
      />
      <button
        type="submit"
        className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
      >
        Cari
      </button>
    </form>
  );
}
