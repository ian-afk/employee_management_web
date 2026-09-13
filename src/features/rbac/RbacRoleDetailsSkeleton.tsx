import type { Role } from "../../types/rbac-type";
import RbacRoleDetailsMenu from "./RbacRoleDetailsMenu";

type RbacRoleDetailsSkeletonProps = {
  role?: Role;
};

function RbacRoleDetailsSkeleton({ role }: RbacRoleDetailsSkeletonProps) {
  return (
    <div className="min-w-0 rounded-[14px] border border-[#dfe6f0] bg-white px-3 py-5 shadow-[0_8px_28px_rgba(23,32,51,0.04)]">
      <span role="status" className="sr-only">Loading role details...</span>
      <header className="-mx-3 -mt-5 rounded-t-[14px] border-b border-[#edf1f6] p-[17px]">
        {role ? (
          <>
            <h3 className="break-words text-lg font-bold leading-6 tracking-[-0.01em] text-[#172033]">
              {role.roleName}
            </h3>
            <p className="mt-[5px] max-w-[42rem] break-words text-xs leading-relaxed text-[#647089]">
              {role.roleDescription}
            </p>
          </>
        ) : (
          <div aria-hidden="true" className="motion-safe:animate-pulse">
            <div className="h-6 w-36 max-w-full rounded bg-[#e8edf4]" />
            <div className="mt-[5px] flex h-[18px] items-center">
              <div className="h-3 w-4/5 rounded-full bg-[#e8edf4]" />
            </div>
          </div>
        )}
      </header>
      <div className="space-y-5">
        <RbacRoleDetailsMenu selectedTab="overview" disabled />
        <RbacRoleDetailsContentSkeleton />
      </div>
    </div>
  );
}

export default RbacRoleDetailsSkeleton;

export function RbacRoleDetailsContentSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-3 px-[5px] motion-safe:animate-pulse">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {[0, 1].map((index) => (
          <div key={index} className="min-w-0 rounded-[11px] border border-[#dfe6f0] bg-[#f8fafd] p-[14px]">
            <div className="flex h-4 items-center">
              <div className="h-2.5 w-28 max-w-full rounded-full bg-[#e8edf4]" />
            </div>
            <div className="mt-[6px] h-5 w-20 max-w-full rounded bg-[#e8edf4]" />
            <div className="mt-[5px] space-y-[10px] py-1">
              <div className="h-2 w-full rounded-full bg-[#e8edf4]" />
              <div className="h-2 w-4/5 rounded-full bg-[#e8edf4]" />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-r-[9px] border-l-[3px] border-[#2f66e8] bg-[#f6f8fc] px-[14px] py-3">
        <div className="flex h-5 items-center">
          <div className="h-3 w-40 max-w-full rounded-full bg-[#e8edf4]" />
        </div>
        <div className="mt-1 space-y-[10px] py-1">
          <div className="h-2 w-full rounded-full bg-[#e8edf4]" />
          <div className="h-2 w-full rounded-full bg-[#e8edf4]" />
          <div className="h-2 w-3/5 rounded-full bg-[#e8edf4]" />
        </div>
      </div>
    </div>
  );
}
