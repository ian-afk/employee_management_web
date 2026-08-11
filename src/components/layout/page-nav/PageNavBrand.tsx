type PageNavBrandProps = {
  isExpanded: boolean;
};

function PageNavBrand({ isExpanded }: PageNavBrandProps) {
  return (
    <div>
      <div
        className={[
          "flex items-center overflow-hidden border-b border-[#edf1f6] pb-5 pt-[3px]",
          "transition-[padding,gap] duration-300 ease-in-out",
          isExpanded ? "gap-[11px] px-[7px]" : "gap-0 pb-5 pl-[15px] pr-0",
        ].join(" ")}
      >
        <div className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#2f66e8] from-[12%] to-[#21a078] text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(47,102,232,0.2)]">
          ET
        </div>
        <div
          className={[
            "min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-in-out",
            isExpanded ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0",
          ].join(" ")}
          aria-hidden={!isExpanded}
        >
          <strong className="block truncate text-[15px] font-bold tracking-[-0.01em]">
            EmployeeTrack
          </strong>
          <span className="block truncate text-[11px] text-[#647089]">
            People · Time · Work
          </span>
        </div>
      </div>
    </div>
  );
}

export default PageNavBrand;
