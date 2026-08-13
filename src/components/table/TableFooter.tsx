import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { Dispatch } from "react";
import type { Action } from "../../types/page-type";

type TableFooterProps = {
  showDetails: string;
  limitInput: string;
  onHandleChangeLimit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleChangePage: (pg: number) => void;
  dispatch: Dispatch<Action>;
  totalPages: number;
  page: number;
};

function TableFooter({
  showDetails,
  limitInput,
  onHandleChangeLimit,
  onHandleChangePage,
  dispatch,
  totalPages,
  page,
}: TableFooterProps) {
  return (
    <div className="flex min-h-[72px] flex-col gap-4 border-t border-[#dfe6f0] bg-white px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      <span className="text-sm text-[#71809d]">{showDetails}</span>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <label
            className="text-xs font-semibold text-[#647089]"
            htmlFor="employee-limit"
          >
            Limit
          </label>
          <input
            id="employee-limit"
            className="h-10 w-16 rounded-lg border border-[#d8e1ee] bg-white px-2 text-center text-sm font-semibold text-[#43506a] outline-none transition-colors hover:border-[#b8c5d8] focus:border-[#2f66e8] focus:ring-2 focus:ring-[#dce7ff]"
            min={1}
            type="number"
            value={limitInput}
            name="limit"
            onChange={onHandleChangeLimit}
          />
        </div>
        {totalPages && (
          <div
            className="flex flex-wrap items-center gap-2 sm:border-l sm:border-[#dfe6f0] sm:pl-3"
            aria-label="Employee table pagination"
          >
            <span className="mr-1 text-xs font-semibold text-[#647089]">
              Page
            </span>
            <button
              type="button"
              className="grid h-10 min-w-10 place-items-center rounded-full text-[#283f6e] transition-[color,background-color,opacity] hover:bg-[#eef3fb] hover:text-[#2f66e8] disabled:cursor-not-allowed disabled:text-[#aeb8c8] disabled:opacity-35 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
              onClick={() => dispatch({ type: "prev" })}
              disabled={page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="!h-5 !w-5" />
            </button>
            {Array.from({ length: totalPages ?? 0 }, (_, index) => (
              <button
                type="button"
                key={index}
                className={`h-10 min-w-10 rounded-lg border px-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] ${
                  page === index + 1
                    ? "border-[#2f66e8] bg-[#2f66e8] text-white shadow-sm"
                    : "border-[#d8e1ee] bg-white text-[#71809d] hover:border-[#b8c5d8] hover:bg-[#f7f9fc] hover:text-[#43506a]"
                }`}
                onClick={() => onHandleChangePage(index + 1)}
                aria-current={page === index + 1 ? "page" : undefined}
                aria-label={`Go to page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              className="grid h-10 min-w-10 place-items-center rounded-full text-[#283f6e] transition-[color,background-color,opacity] hover:bg-[#eef3fb] hover:text-[#2f66e8] disabled:cursor-not-allowed disabled:text-[#aeb8c8] disabled:opacity-35 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
              onClick={() => dispatch({ type: "next" })}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              <ChevronRightIcon className="!h-5 !w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableFooter;
