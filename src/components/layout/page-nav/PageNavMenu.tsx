import PageNavMenuSection from "./navmenu/PageNavMenuSection";

type PageNavMenuProps = {
  isExpanded: boolean;
};

function PageNavMenu({ isExpanded }: PageNavMenuProps) {
  return (
    <>
      <nav
        className="flex-1 overflow-y-auto py-[18px] [scrollbar-width:thin] border-t border-[#a4a5a7]"
        aria-label="Primary navigation"
        id="primary-navigation"
      >
        <div className="space-y-4">
          <PageNavMenuSection isExpanded={isExpanded} section="Workspace" />
          <PageNavMenuSection
            isExpanded={isExpanded}
            section="Administration"
          />
        </div>
      </nav>
    </>
  );
}

export default PageNavMenu;
