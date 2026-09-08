import { type SetStateAction } from "react";
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
    <div>
      {menuTab.map((tab) => (
        <button key={tab.tab} onClick={() => onSetTab(tab.tab)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default RbacRoleDetailsMenu;
