import { NavLink } from "react-router-dom";
import { type NavItemType } from "../../../../common/navigation";

type PageNavMenuLinkProps = {
  navigation: NavItemType;
  isExpanded: boolean;
};
function PageNavMenuLink({ navigation, isExpanded }: PageNavMenuLinkProps) {
  const item = navigation;
  const Icon = item.icon;

  return (
    <li key={item.path}>
      <NavLink
        to={item.path}
        end={item.end}
        aria-label={item.label}
        title={isExpanded ? undefined : item.label}
        className={({ isActive }) =>
          [
            "relative my-[3px] flex min-h-[42px] w-full items-center overflow-hidden rounded-[10px] text-left text-[13px] font-bold",
            "transition-[padding,gap,color,background-color] duration-300 ease-in-out",
            "focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_#9bb7ff]",
            isExpanded ? "gap-[11px] px-[11px]" : "gap-0 pl-[26px] pr-0",
            isActive
              ? "bg-[#eaf1ff] text-[#2f66e8] ring-1 ring-inset ring-[#c7d7ff] before:absolute before:left-0 before:h-6 before:w-[3px] before:rounded-r-[3px] before:bg-[#2f66e8] before:content-['']"
              : "text-[#43506a] hover:bg-[#f8fafd]",
          ].join(" ")
        }
      >
        <Icon className="shrink-0" fontSize="small" aria-hidden="true" />
        <span
          className={[
            "overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-in-out",
            isExpanded ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0",
          ].join(" ")}
          aria-hidden={!isExpanded}
        >
          {item.label}
        </span>
      </NavLink>
    </li>
  );
}

export default PageNavMenuLink;
