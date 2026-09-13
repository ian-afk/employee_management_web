function RbacRoleMenusSkeleton() {
  return (
    <div role="status" className="space-y-1">
      <span className="sr-only">Loading roles...</span>
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="flex min-h-[66px] items-center justify-between gap-3 rounded-[10px] border border-transparent px-[10px] py-[10px] motion-safe:animate-pulse"
        >
          <div className="min-w-0 flex-1">
            <div className="flex h-5 items-center">
              <div className="h-3 w-24 max-w-full rounded-full bg-[#e8edf4]" />
            </div>
            <div className="mt-[3px] space-y-2 py-1">
              <div className="h-2 w-full rounded-full bg-[#e8edf4]" />
              <div className="h-2 w-3/4 rounded-full bg-[#e8edf4]" />
            </div>
          </div>
          <div className="h-3 w-4 shrink-0 rounded-full bg-[#e8edf4]" />
        </div>
      ))}
    </div>
  );
}

export default RbacRoleMenusSkeleton;
