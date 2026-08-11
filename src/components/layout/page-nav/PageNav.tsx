import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import PageNavBrand from "./PageNavBrand";
import PageNavMenu from "./PageNavMenu";
import PageNavAccount from "./PageNavAccount";

function getInitialNavState() {
  if (typeof window === "undefined") return true;

  return window.matchMedia("(min-width: 768px)").matches;
}

function PageNav() {
  const [isExpanded, setIsExpanded] = useState(getInitialNavState);

  return (
    <aside
      className={[
        "sticky top-0 z-30 flex h-screen shrink-0 flex-col border-r border-[#dfe6f0] bg-white py-5 text-[#172033]",
        "transition-[width,padding] duration-300 ease-in-out",
        isExpanded ? "w-[248px] px-3" : "w-[88px] px-2",
      ].join(" ")}
    >
      <button
        type="button"
        className="absolute right-0 top-[68px] z-10 grid h-8 w-8 translate-x-1/2 place-items-center rounded-[10px] border border-[#dfe6f0] bg-white text-[#43506a] shadow-[0_5px_15px_rgba(23,32,51,0.12)] transition-colors hover:bg-[#f8fafd] hover:text-[#2f66e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
        aria-controls="primary-navigation"
        aria-label={isExpanded ? "Minimize navigation" : "Expand navigation"}
        title={isExpanded ? "Minimize navigation" : "Expand navigation"}
      >
        {isExpanded ? (
          <CloseIcon className="!h-4 !w-4" />
        ) : (
          <MenuIcon className="!h-4 !w-4" />
        )}
      </button>

      <PageNavBrand isExpanded={isExpanded} />
      <PageNavMenu isExpanded={isExpanded} />
      <PageNavAccount isExpanded={isExpanded} />
    </aside>
  );
}

export default PageNav;
