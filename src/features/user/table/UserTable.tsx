import TableHead from "../../../components/table/TableHead";

import TableFooter from "../../../components/table/TableFooter";
import { useState, type SetStateAction } from "react";
import { usePage } from "../../../hooks/usePage";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../services/userService";
import { isUnAuthorizedError } from "../../../services/authHelper";
import { Navigate } from "react-router-dom";
import UserTableRow from "./UserTableRow";

type UserTableProps = {
  onSetUserId: React.Dispatch<SetStateAction<string>>;
};

const tableHead = [
  "Employee ID",
  "Full Name",
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
              <col className="w-[13%]" />
              <col className="w-[13%]" />
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
                <UserTableRow users={users.results} onSetUserId={onSetUserId} />
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
