import { useState, type SetStateAction } from "react";
import type React from "react";
import TaskCard from "./TaskCard";
import { useQuery } from "@tanstack/react-query";
import { getTask } from "../../services/taskService";
import { isUnAuthorizedError } from "../../services/authHelper";
import { Navigate } from "react-router-dom";

type TaskTableProps = {
  onSetTaskId: React.Dispatch<SetStateAction<string>>;
  isAllTask: boolean;

  stage: {
    stage: string;
    status: string;
  };
};

function TaskStage({ onSetTaskId, stage, isAllTask }: TaskTableProps) {
  const [limit, setLimit] = useState(10);

  const assigned = isAllTask ? undefined : "me";
  const {
    data: tasks = {
      messages: "",
      results: [],
      pagination: { totalPages: 1, totalItems: 0, currentPage: 0, nextPage: 0 },
    },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", limit, stage.status, isAllTask],
    queryFn: ({ signal }) =>
      getTask("task", {
        page: 1,
        limit,
        query: stage.status,
        assigned,
        signal,
      }),
  });

  const taskResult = tasks.results.length > 0;
  const initialState = isLoading && !taskResult;

  if (!tasks) return <div>No record found</div>;
  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Something went wrong</div>;
  }

  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  const stageId = `task-stage-${stage.status.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <section
      className="flex h-full min-h-0 min-w-0 w-full flex-col overflow-hidden rounded-xl border border-[#dfe6f0] bg-[#f8fafd] p-3"
      aria-labelledby={stageId}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 px-1 pb-3 pt-1">
        <h2 id={stageId} className="text-sm font-bold text-[#172033]">
          {stage.stage}
        </h2>
        <span className="grid h-6 min-w-6 place-items-center rounded-full border border-[#dfe6f0] bg-white px-1.5 text-xs font-semibold text-[#647089]">
          {tasks.pagination.totalItems}
        </span>
      </header>

      <div className="min-h-0 min-w-0 max-w-full flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg border border-dashed border-[#dfe6f0] bg-white/40 p-2 [scrollbar-gutter:stable]">
        {initialState ? (
          <div>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {taskResult ? (
              <>
                <TaskCard onSetTaskId={onSetTaskId} task={tasks.results} />
                {tasks.pagination.totalPages > 1 && (
                  <button onClick={() => handleLoadMore}>Load more...</button>
                )}
              </>
            ) : (
              <div>No record found</div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default TaskStage;
