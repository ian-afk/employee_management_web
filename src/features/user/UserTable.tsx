import TableHead from "../../components/table/TableHead";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TableFooter from "../../components/table/TableFooter";
import { useState, type SetStateAction } from "react";
import { usePage } from "../../hooks/usePage";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/userService";
import { isUnAuthorizedError } from "../../services/authHelper";
import { Navigate } from "react-router-dom";

type UserTableProps = {
  onSetUserId: React.Dispatch<SetStateAction<string | null>>;
};

const tableHead = [
  "Employee ID",
  "First name",
  "Last name",
  "email",
  "Role",
  "Department",
  "status",
  "Action",
];
function UserTable({ onSetUserId }: UserTableProps) {
  const [limit, setLimit] = useState<number>(10);
  const [limitInput, setLimitInput] = useState("10");
  const [{ page }, dispatch] = usePage();
  const debouncedSetLimit = useDebouncedCallback((value: string) => {
    const newLimit = Number(value);

    if (Number.isFinite(newLimit) && newLimit > 0) {
      setLimit(newLimit);
      // setPage(1);
      dispatch({
        type: "initialize",
      });
      onSetUserId("");
    }
  }, 500);
  const handleChangeLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLimitInput(value);
    debouncedSetLimit(value);
  };

  const {
    data: users = {
      results: [],
      pagination: {
        totalItems: 0,
        itemsPerPage: limit,
        totalPages: 1,
        currentPage: 1,
        previousPage: null,
        nextPage: null,
      },
    },
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", limit, page],
    queryFn: ({ signal }) =>
      getAllUsers("user", {
        page,
        limit,
        signal,
      }),
    keepPreviousData: true,
  });

  const loadSkeleton = isLoading || (isFetching && isPreviousData);
  const userResults = users.results.length > 0;
  const totalPages = users.pagination.totalPages;
  const totalUsers = users.pagination.totalItems;
  const firstUser = (page - 1) * limit + 1;
  const lastUser = Math.min(firstUser + users.results.length - 1, totalUsers);
  if (isError) {
    if (isUnAuthorizedError(error)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Failed to load employee</div>;
  }

  const handleChangePage = (pg: number) => {
    dispatch({
      type: "setPage",
      payload: pg,
    });
    onSetUserId("");
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-[#dfe6f0] bg-white shadow-[0_10px_30px_rgba(23,32,51,0.06)]">
        <div
          className="h-[431px] w-full overflow-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9bb7ff]"
          role="region"
          aria-label="Employee directory table"
          tabIndex={0}
        >
          <table className="w-full min-w-[1120px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[16%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[13%]" />
              <col className="w-[11%]" />
              <col className="w-[11%]" />
              <col className="w-[10%]" />
            </colgroup>
            <TableHead tableHead={tableHead} />
            <tbody>
              {loadSkeleton ? (
                <div>Loading...</div>
              ) : userResults ? (
                <>
                  {users.results.map((item) => {
                    const userrole = item.userRoles
                      .map((role) => role.role.roleName)
                      .join(", ");
                    return (
                      <tr key={item.id}>
                        <td>{item.employee.empId}</td>
                        <td>{item.employee.firstName}</td>
                        <td>{item.employee.lastName}</td>
                        <td>{item.email}</td>
                        <td>{userrole}</td>
                        <td>{item.department?.departmentName ?? "-"}</td>
                        <td>{item.status}</td>
                        <td className="px-2 py-[18px]">
                          <div
                            className="flex items-center gap-1"
                            aria-label="Employee actions"
                          >
                            <button
                              type="button"
                              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#c9d8f7] bg-[#eaf1ff] text-[#2f66e8] transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:border-[#aac0f2] hover:bg-[#dce8ff] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
                              onClick={() => onSetUserId(item.id)}
                              title="View employee"
                            >
                              <VisibilityOutlinedIcon className="!h-[17px] !w-[17px]" />
                            </button>
                            <button
                              type="button"
                              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#dfe6f0] bg-white text-[#536078] transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:border-[#cbd5e3] hover:bg-[#f4f7fb] hover:text-[#2f66e8] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
                              title="Edit employee"
                            >
                              <EditOutlinedIcon className="!h-[16px] !w-[16px]" />
                            </button>
                            <button
                              type="button"
                              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-transparent bg-transparent text-[#7b869a] transition-[color,background-color,box-shadow,transform] duration-150 hover:bg-[#eef2f7] hover:text-[#35415a] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
                              title="More actions"
                            >
                              <MoreHorizIcon className="!h-[18px] !w-[18px]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <div>No users found</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <TableFooter
        showDetails={`Showing ${firstUser}-${lastUser} of ${totalUsers} users`}
        limitInput={limitInput}
        onHandleChangeLimit={handleChangeLimit}
        onHandleChangePage={handleChangePage}
        dispatch={dispatch}
        totalPages={totalPages}
        page={page}
      />
    </>
  );
}

export default UserTable;
