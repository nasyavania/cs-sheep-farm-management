export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-white/50 px-6 py-12 text-center">
      <p className="font-display text-lg font-bold text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink-light">{description}</p>
    </div>
  );
}
