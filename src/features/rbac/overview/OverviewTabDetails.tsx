function OverviewTabDetails() {
  return (
    <div className="space-y-3 px-[5px]">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="min-w-0 rounded-[11px] border border-[#dfe6f0] bg-[#f8fafd] p-[14px]">
          <span className="block text-[10px] font-extrabold uppercase leading-4 tracking-[0.06em] text-[#647089]">
            Permissions selected
          </span>
          <span className="mt-[6px] block break-words text-sm font-bold leading-5 text-[#172033]">
            COUNT PERMISSIONS
          </span>
          <p className="mt-[5px] text-xs leading-relaxed text-[#647089]">
            Number of actions selected in the saved permission setup.
          </p>
        </div>
        <div className="min-w-0 rounded-[11px] border border-[#dfe6f0] bg-[#f8fafd] p-[14px]">
          <span className="block text-[10px] font-extrabold uppercase leading-4 tracking-[0.06em] text-[#647089]">
            Areas Covered
          </span>
          <span className="mt-[6px] block break-words text-sm font-bold leading-5 text-[#172033]">
            COUNT MODULES
          </span>
          <p className="mt-[5px] text-xs leading-relaxed text-[#647089]">
            Modules with at least one selected action. Open Permissions to see
            actions and record access.
          </p>
        </div>
      </div>
      <div>
        <div className="rounded-r-[9px] border-l-[3px] border-[#2f66e8] bg-[#f6f8fc] px-[14px] py-3">
          <span className="block text-xs font-bold leading-5 text-[#172033]">
            How multiple roles combine
          </span>
          <p className="mt-1 text-xs leading-relaxed text-[#647089]">
            Roles add access together. Removing permission from one role does
            not remove it if another assigned role still allows it. Review the
            person’s combined access before saving.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OverviewTabDetails;
