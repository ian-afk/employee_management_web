import type { ReactNode, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
type DrawerProps = {
  children: ReactNode;
  onShowDetails: React.Dispatch<SetStateAction<string>>;
  drawerHeader: string;
  drawerInformation: string;
};
function Drawer({
  children,
  onShowDetails,
  drawerHeader,
  drawerInformation,
}: DrawerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#172033]/30">
      <aside
        className="ml-auto flex h-full w-full max-w-[440px] flex-col bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-drawer-title"
      >
        <header className="flex items-center justify-between border-b border-[#dfe6f0] px-6 py-4">
          <div>
            <h2
              className="text-base font-bold text-[#172033]"
              id="details-drawer-title"
            >
              {drawerHeader}
            </h2>
            <p className="mt-0.5 text-xs text-[#647089]">{drawerInformation}</p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg text-[#647089] hover:bg-[#f1f4f8] hover:text-[#172033] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
            onClick={() => onShowDetails("")}
            aria-label="Close details"
          >
            <CloseIcon className="!h-5 !w-5" />
          </button>
        </header>
        {children}

        <footer className="border-t border-[#dfe6f0] px-6 py-4">
          <button
            type="button"
            className="w-full rounded-lg border border-[#d3dce9] bg-white px-4 py-2.5 text-sm font-semibold text-[#43506a] hover:bg-[#f4f7fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
            onClick={() => onShowDetails("")}
          >
            Close
          </button>
        </footer>
      </aside>
    </div>
  );
}

export default Drawer;
