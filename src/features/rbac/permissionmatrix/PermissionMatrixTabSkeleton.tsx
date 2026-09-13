import PermissionMatrixTabHeader from "./PermissionMatrixTabHeader";

const areas = [
  "EMPLOYEE PROFILES",
  "USER ACCOUNTS",
  "ATTENDANCE RECORDS",
  "TASKS",
  "ROLE & ACCESS",
];
const actions = ["VIEW", "CREATE", "EDIT", "DELETE"];

function PermissionMatrixTabSkeleton({ roleName }: { roleName: string }) {
  return (
    <div className="min-w-0 space-y-3 px-[5px]">
      <PermissionMatrixTabHeader roleName={roleName} />
      <span role="status" className="sr-only">Loading permissions...</span>
      <div
        className="overflow-x-auto rounded-[10px] border border-[#dfe6f0] bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] [scrollbar-width:thin]"
        role="region"
        aria-label="Permission matrix loading"
        tabIndex={0}
      >
        <table
          aria-busy="true"
          className={[
            "w-full min-w-[560px] border-collapse text-xs text-[#43506a]",
            "[&_th]:px-[14px] [&_th]:py-3 [&_th]:text-center [&_th]:text-[10px] [&_th]:font-extrabold [&_th]:tracking-[0.06em] [&_th:first-child]:w-[40%] [&_th:first-child]:text-left",
            "[&_thead]:border-b [&_thead]:border-[#dfe6f0] [&_thead]:bg-[#f8fafd] [&_thead]:text-[#647089]",
            "[&_tbody_tr]:border-b [&_tbody_tr]:border-[#edf1f6] [&_tbody_tr:last-child]:border-b-0",
            "[&_td]:px-[14px] [&_td]:py-[14px] [&_td]:text-center [&_td:first-child]:text-left [&_td:first-child]:text-[11px] [&_td:first-child]:font-bold [&_td:first-child]:text-[#172033]",
          ].join(" ")}
        >
          <thead>
            <tr>
              <th scope="col">AREA</th>
              {actions.map((action) => <th key={action} scope="col">{action}</th>)}
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area}>
                <td>{area}</td>
                {actions.map((action) => (
                  <td key={action}>
                    <div aria-hidden="true" className="mx-auto h-[17px] w-[17px] rounded bg-[#e8edf4] motion-safe:animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PermissionMatrixTabSkeleton;
