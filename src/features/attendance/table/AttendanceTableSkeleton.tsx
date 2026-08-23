const skeletonRows = Array.from({ length: 5 });

function SkeletonBar({ className }: { className: string }) {
  return <div className={`h-3 rounded-full bg-[#e8edf4] ${className}`} />;
}

function AttendanceTableSkeleton() {
  return (
    <>
      {skeletonRows.map((_, index) => (
        <tr
          className="h-[69px] animate-pulse border-b border-[#edf1f6]"
          key={index}
          aria-hidden="true"
        >
          <td className="px-6 py-[18px]">
            <SkeletonBar className="w-2/3 max-w-28" />
          </td>
          <td className="px-6 py-[18px]">
            <SkeletonBar className="w-3/4 max-w-24" />
          </td>
          <td className="px-6 py-[18px]">
            <SkeletonBar className="w-3/5 max-w-20" />
          </td>
          <td className="px-6 py-[18px]">
            <SkeletonBar className="w-3/5 max-w-20" />
          </td>
          <td className="px-6 py-[18px]">
            <SkeletonBar className="w-1/2 max-w-16" />
          </td>
          <td className="px-2 py-[18px]">
            <div className="h-6 w-24 max-w-full rounded-full bg-[#e8edf4]" />
          </td>
          <td className="px-4 py-[18px]">
            <div className="flex gap-1">
              <div className="h-8 w-8 rounded-lg bg-[#e8edf4]" />
              <div className="h-8 w-8 rounded-lg bg-[#e8edf4]" />
              <div className="h-8 w-8 rounded-lg bg-[#e8edf4]" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default AttendanceTableSkeleton;
