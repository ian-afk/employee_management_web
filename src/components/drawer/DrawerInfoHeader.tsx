import { statusStyles } from "../../utils/color-palette";

import type { SvgIconComponent } from "@mui/icons-material";

type DrawerInfoHeaderProps = {
  name: string;
  jobTitle: string;
  department: string;
  status: string;
  icon: SvgIconComponent;
};

function DrawerInfoHeader({
  name,
  jobTitle,
  department,
  status,
  icon,
}: DrawerInfoHeaderProps) {
  const Icon = icon;
  return (
    <section className="flex items-center gap-5 rounded-2xl bg-[#f7f9fc] p-6">
      <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#3562d4] text-white">
        <Icon className="!h-9 !w-9" />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-2xl font-bold text-[#172033]">{name}</h3>
        <p className="mt-1 flex flex-col gap-2 truncate text-sm text-[#65718b]">
          <span>{jobTitle}</span>
          <span>{department}</span>
        </p>
        <span
          className={`mt-4 inline-flex w-24 items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
            statusStyles[status] ?? "bg-[#eef3fb] text-[#43506a] ring-[#d8e1ee]"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          {status}
        </span>
      </div>
    </section>
  );
}

export default DrawerInfoHeader;
