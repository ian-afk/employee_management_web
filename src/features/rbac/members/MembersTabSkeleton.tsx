function MembersTabSkeleton() {
  return (
    <div role="status" className="grid gap-2">
      <span className="sr-only">Loading members...</span>
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="flex min-h-[62px] min-w-0 items-center gap-[10px] rounded-[10px] border border-[#dfe6f0] bg-white px-3 py-[11px] motion-safe:animate-pulse"
        >
          <div className="h-9 w-9 shrink-0 rounded-full bg-[#e8edf4]" />
          <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <div className="flex h-5 items-center">
              <div className="h-3 w-28 max-w-full rounded-full bg-[#e8edf4]" />
            </div>
            <div className="flex h-4 items-center">
              <div className="h-2.5 w-44 max-w-full rounded-full bg-[#e8edf4]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MembersTabSkeleton;
