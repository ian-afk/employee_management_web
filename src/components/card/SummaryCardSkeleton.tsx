function SummaryCardSkeleton() {
  return (
    <article
      className="animate-pulse rounded-xl border border-[#dfe6f0] bg-white p-5 shadow-[0_6px_18px_rgba(23,32,51,0.04)]"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="mt-1 h-3 w-24 rounded-full bg-[#e8edf4]" />
        <div className="h-10 w-10 rounded-lg bg-[#e8edf4]" />
      </div>
      <div className="mt-4 h-8 w-16 rounded-lg bg-[#e8edf4]" />
      <div className="mt-3 h-3 w-36 rounded-full bg-[#e8edf4]" />
    </article>
  );
}

export default SummaryCardSkeleton;
