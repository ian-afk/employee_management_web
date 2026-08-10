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
      pagination: { totalPages: 1 },
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

  if (isLoading) return <div>Loading....</div>;
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

  console.log(stage.status, tasks);

  return (
    <>
      <div>{stage.stage}</div>
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
    </>
  );
}

export default TaskStage;
