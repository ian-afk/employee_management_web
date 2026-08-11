import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useLogout } from "../../../hooks/useLogout";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
type PageNavAccountProps = {
  isExpanded: boolean;
};

function PageNavAccount({ isExpanded }: PageNavAccountProps) {
  const logout = useLogout();
  const { data: user } = useCurrentUser();

  const role = user?.role?.replaceAll("_", " ") ?? "Account";
  const initials = role
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <>
      <div className="border-t border-[#edf1f6] px-[5px] pb-0 pt-[15px]">
        <div
          className={[
            "flex min-w-0 items-center overflow-hidden transition-[padding,gap] duration-300 ease-in-out",
            isExpanded ? "gap-[10px] pl-0" : "gap-0 pl-[13px]",
          ].join(" ")}
          title={
            isExpanded ? undefined : `${role} · ${user?.email ?? "Signed in"}`
          }
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#14213d] text-[11px] font-extrabold text-white">
            {initials || "U"}
          </div>
          <div
            className={[
              "min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-in-out",
              isExpanded ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0",
            ].join(" ")}
            aria-hidden={!isExpanded}
          >
            <strong className="block truncate text-xs font-bold">{role}</strong>
            <span
              className="mt-0.5 block truncate text-[10px] text-[#647089]"
              title={user?.email}
            >
              {user?.email ?? "Signed in"}
            </span>
          </div>
        </div>

        <button
          type="button"
          className={[
            "mt-3 flex min-h-10 w-full items-center overflow-hidden rounded-[10px] border-0 bg-transparent text-left text-[13px] font-bold text-[#c64242]",
            "transition-[padding,gap,color,background-color] duration-300 ease-in-out",
            "hover:bg-[#ffeded] focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_#e79a9a] disabled:cursor-not-allowed disabled:opacity-60",
            isExpanded ? "gap-[11px] px-[11px]" : "gap-0 pl-[21px] pr-0",
          ].join(" ")}
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          aria-label={logout.isPending ? "Logging out" : "Logout"}
          title={isExpanded ? undefined : "Logout"}
        >
          <LogoutOutlinedIcon
            className="shrink-0"
            fontSize="small"
            aria-hidden="true"
          />
          <span
            className={[
              "overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-in-out",
              isExpanded ? "max-w-[130px] opacity-100" : "max-w-0 opacity-0",
            ].join(" ")}
            aria-hidden={!isExpanded}
          >
            {logout.isPending ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </>
  );
}

export default PageNavAccount;
