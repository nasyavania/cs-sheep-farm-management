"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email atau kata sandi salah. Coba lagi.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo-smart-sheep-care.svg"
            alt="Smart Sheep Care System"
            width={72}
            height={72}
          />
          <h1 className="mt-3 font-display text-xl font-bold text-ink">
            Smart Sheep Care System
          </h1>
          <p className="mt-1 text-sm text-ink-light">
            Kelompok Ternak Gembala Sejahtera
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </div>
    </div>
  );
}
