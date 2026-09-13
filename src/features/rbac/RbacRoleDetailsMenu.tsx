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
};

function RbacRoleDetailsMenu({ onSetTab }: RbacRoleMenuProps) {
  return (
    <div className="flex gap-4">
      {menuTab.map((tab) => (
        <button
          key={tab.tab}
          onClick={() => onSetTab(tab.tab)}
          className="border-2 border-solid border-red-500 px-4 py-2"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default memo(RbacRoleDetailsMenu);
