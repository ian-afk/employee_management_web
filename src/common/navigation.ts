import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

export type NavItemType = {
  label: string;
  path: string;
  end?: boolean;
  icon: SvgIconComponent;
  section: string;
};
export const navItems: NavItemType[] = [
  {
    label: "Home",
    path: "/",
    end: true,
    icon: DashboardOutlinedIcon,
    section: "Workspace",
  },
  {
    label: "Employees",
    path: "/employees",
    icon: PeopleOutlinedIcon,
    section: "Workspace",
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: TaskAltOutlinedIcon,
    section: "Workspace",
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: AccessTimeOutlinedIcon,
    section: "Workspace",
  },
  {
    label: "Users",
    path: "/administration/users",
    icon: BadgeOutlinedIcon,
    section: "Administration",
  },

  {
    label: "Roles & RBAC",
    path: "/administration/rbac",
    icon: VerifiedUserOutlinedIcon,
    section: "Administration",
  },
];
