import { navItems } from "../../../../common/navigation";
import PageNavMenuLink from "./PageNavMenuLink";

type PageNavMenuSectionProps = {
  section: string;
  isExpanded: boolean;
};
function PageNavMenuSection({ section, isExpanded }: PageNavMenuSectionProps) {
  const navigation = navItems;
  return (
    <div className="border-b border-[#a4a5a7]">
      <p
        className={[
          "mb-2 mt-0 overflow-hidden whitespace-nowrap px-[10px] text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8e98aa]",
          "transition-opacity duration-200 ease-in-out",
          isExpanded ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden={!isExpanded}
      >
        {section}
      </p>
      <ul className="m-0 list-none p-0">
        {navigation
          .filter((nav) => nav.section === section)
          .map((item) => {
            return (
              <PageNavMenuLink
                isExpanded={isExpanded}
                navigation={item}
                key={item.label}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default PageNavMenuSection;
