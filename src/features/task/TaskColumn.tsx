import { useDroppable } from "@dnd-kit/react";
import TaskCard from "./TaskCard";

import { isUnAuthorizedError } from "../../services/authHelper";
import { getTask } from "../../services/taskService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import type { SetStateAction } from "react";
import type { TaskColumnId } from "../../types/task-type";

type TaskColumnProps = {
  id: string;
  label: string;
  isAllTask: boolean;
  stage: {
    stage: TaskColumnId;
    status: string;
  };
  onSetTaskId: React.Dispatch<SetStateAction<string>>;
};

function TaskColumn({
  id,
  label,
  isAllTask,
  stage,
  onSetTaskId,
}: TaskColumnProps) {
  const { ref } = useDroppable({ id });

  const assigned = isAllTask ? undefined : "me";
  const {
    data: tasks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["task", isAllTask, stage.status],
    queryFn: ({ pageParam, signal }) =>
      getTask("task", {
        page: pageParam,
        limit: 5,
        query: stage.status,
        assigned,
        signal,
      }),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages, nextPage } = lastPage.pagination;
      return currentPage < totalPages ? nextPage || currentPage + 1 : undefined;
    },
  });

  if (!tasks) return <div> No record found</div>;
  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Something went wrong</div>;
  }

  const taskResults = tasks?.pages?.flatMap((page) => page.results) ?? [];

  const initialState = isLoading && !taskResults;
  const handleLoadMore = () => {
    fetchNextPage();
  };
  return (
    <section
      className="flex h-full min-h-0 min-w-0 w-full flex-col overflow-hidden rounded-xl border border-[#dfe6f0] bg-[#f8fafd] p-3"
      aria-labelledby={stage.stage}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 px-1 pb-3 pt-1">
        <h2 id={stage.stage} className="text-sm font-bold text-[#172033]">
          {label}
        </h2>
        <span className="grid h-6 min-w-6 place-items-center rounded-full border border-[#dfe6f0] bg-white px-1.5 text-xs font-semibold text-[#647089]">
          {tasks.pages[0].pagination.totalItems}
        </span>
      </header>
      <div className="min-h-0 min-w-0 max-w-full flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg border border-dashed border-[#dfe6f0] bg-white/40 p-2 [scrollbar-gutter:stable]">
        {initialState ? (
          <div>Loading...</div>
        ) : (
          <>
            <div ref={ref} id={id} className="min-h-[150px] flex-1">
              {taskResults.map((task) => (
                <TaskCard task={task} key={task.id} onSetTaskId={onSetTaskId} />
              ))}
            </div>
            {hasNextPage && (
              <button
                onClick={() => handleLoadMore()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading"
                  : hasNextPage
                    ? "Load more..."
                    : "No more records"}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default TaskColumn;
