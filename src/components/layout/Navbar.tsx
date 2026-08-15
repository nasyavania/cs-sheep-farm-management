import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-background/90 px-4 py-3 backdrop-blur md:px-6">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Image
          src="/logo-smart-sheep-care.svg"
          alt="Smart Sheep Care System"
          width={36}
          height={36}
          priority
        />
        <div className="hidden sm:block">
          <p className="font-display text-base font-bold leading-tight text-primary-dark">
            Smart Sheep Care
          </p>
          <p className="text-[11px] leading-tight text-ink-light">
            Gembala Sejahtera
          </p>
        </div>
      </Link>
    </header>
  );
}
