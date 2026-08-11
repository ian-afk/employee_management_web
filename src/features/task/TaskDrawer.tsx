import { useQuery } from "@tanstack/react-query";
import type { SetStateAction } from "react";
import type React from "react";
import { getTaskById } from "../../services/taskService";
import { isUnAuthorizedError } from "../../services/authHelper";
import { Navigate } from "react-router-dom";

type TaskDrawerProps = {
  onSetTaskId: React.Dispatch<SetStateAction<string>>;
  taskId: string;
};

function TaskDrawer({ onSetTaskId, taskId }: TaskDrawerProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async ({ signal }) => getTaskById(`task/${taskId}`, signal),
  });

  if (isLoading) <div>Loading...</div>;
  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Something went wrong</div>;
  }
  if (!data) <div>No record found</div>;
  return (
    <>
      <div>
        <div>{data?.task?.id}</div>
        <div>{data?.task?.title}</div>
        <div>{<button onClick={() => onSetTaskId("")}>Close</button>}</div>
      </div>
    </>
  );
}

export default TaskDrawer;
