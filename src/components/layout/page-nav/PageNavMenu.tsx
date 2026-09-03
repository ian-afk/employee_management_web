import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

import { NavLink } from "react-router-dom";

type PageNavMenuProps = {
  isExpanded: boolean;
};

function PageNavMenu({ isExpanded }: PageNavMenuProps) {
  const navItems = [
    {
      label: "Home",
      path: "/",
      end: true,
      icon: DashboardOutlinedIcon,
    },
    {
      label: "Employee",
      path: "/employee",
      icon: PeopleOutlinedIcon,
    },
    {
      label: "Task",
      path: "/task",
      icon: TaskAltOutlinedIcon,
    },
    {
      label: "Attendance",
      path: "/attendance",
      icon: AccessTimeOutlinedIcon,
    },
    {
      label: "Roles & RBAC",
      path: "/rbac",
      icon: VerifiedUserOutlinedIcon,
    },
  ];

  return (
    <>
      <nav
        className="flex-1 overflow-y-auto py-[18px] [scrollbar-width:thin]"
        aria-label="Primary navigation"
        id="primary-navigation"
      >
        <p
          className={[
            "mb-2 mt-0 overflow-hidden whitespace-nowrap px-[10px] text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8e98aa]",
            "transition-opacity duration-200 ease-in-out",
            isExpanded ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-hidden={!isExpanded}
        >
          Workspace
        </p>
        <ul className="m-0 list-none p-0">
          {navItems.map((item) => {
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
                      isExpanded
                        ? "gap-[11px] px-[11px]"
                        : "gap-0 pl-[26px] pr-0",
                      isActive
                        ? `bg-[#eaf1ff] text-[#2f66e8] before:absolute ${
                            isExpanded ? "before:-left-4" : "before:-left-3"
                          } before:h-6 before:w-[3px] before:rounded-r-[3px] before:bg-[#2f66e8] before:content-['']`
                        : "text-[#43506a] hover:bg-[#f8fafd]",
                    ].join(" ")
                  }
                >
                  <Icon
                    className="shrink-0"
                    fontSize="small"
                    aria-hidden="true"
                  />
                  <span
                    className={[
                      "overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-in-out",
                      isExpanded
                        ? "max-w-[140px] opacity-100"
                        : "max-w-0 opacity-0",
                    ].join(" ")}
                    aria-hidden={!isExpanded}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default PageNavMenu;
