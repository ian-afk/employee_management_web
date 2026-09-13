import { memo, type SetStateAction } from "react";
type RbacTab = "overview" | "matrix" | "members";
type MenuTabType = {
  label: "Overview" | "Permission matrix" | "Members";
  tab: RbacTab;
};

const menuTab: MenuTabType[] = [
  {
    label: "Overview",
    tab: "overview",
  },
  { label: "Permission matrix", tab: "matrix" },
  { label: "Members", tab: "members" },
];

type RbacRoleMenuProps = {
  onSetTab: React.Dispatch<SetStateAction<string>>;
  selectedTab: string;
};

function RbacRoleDetailsMenu({ onSetTab, selectedTab }: RbacRoleMenuProps) {
  return (
    <div className="-mx-3 flex gap-[18px] overflow-x-auto border-b border-[#dfe6f0] px-[17px] [scrollbar-width:thin]">
      {menuTab.map((tab) => (
        <button
          key={tab.tab}
          type="button"
          onClick={() => onSetTab(tab.tab)}
          className={[
            "min-h-[45px] shrink-0 whitespace-nowrap border-b-2 bg-transparent px-1 text-xs font-bold transition-colors",
            "focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_#9bb7ff]",
            selectedTab === tab.tab
              ? "border-[#2f66e8] text-[#2f66e8]"
              : "border-transparent text-[#647089] hover:border-[#c7d7ff] hover:text-[#2f66e8]",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default memo(RbacRoleDetailsMenu);
