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
  const closeDrawer = () => onShowDetails("");

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end overflow-hidden bg-[#172033]/30 backdrop-blur-[1px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeDrawer();
      }}
    >
      <aside
        className="flex h-full min-h-0 w-full max-w-[460px] flex-col overflow-hidden bg-white shadow-[-12px_0_40px_rgba(23,32,51,0.16)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-drawer-title"
        aria-describedby="details-drawer-description"
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[#dfe6f0] px-6 py-4">
          <div className="min-w-0">
            <h2
              className="truncate text-base font-bold text-[#172033]"
              id="details-drawer-title"
            >
              {drawerHeader}
            </h2>
            <p
              className="mt-0.5 truncate text-xs text-[#647089]"
              id="details-drawer-description"
            >
              {drawerInformation}
            </p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#647089] hover:bg-[#f1f4f8] hover:text-[#172033] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
            onClick={closeDrawer}
            aria-label="Close details"
          >
            <CloseIcon className="!h-5 !w-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>

        <footer className="shrink-0 border-t border-[#dfe6f0] bg-white px-6 py-4">
          <button
            type="button"
            className="w-full rounded-lg border border-[#d3dce9] bg-white px-4 py-2.5 text-sm font-semibold text-[#43506a] hover:bg-[#f4f7fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
            onClick={closeDrawer}
          >
            Close
          </button>
        </footer>
      </aside>
    </div>
  );
}

export default Drawer;
