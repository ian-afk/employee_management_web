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
        <div>{data?.task?.assignedDepartment}</div>
        <div>{data?.task?.id}</div>
        <div>{data?.task?.title}</div>
        <div>{data?.task?.description}</div>
        <div>
          <div>
            <span>Task details</span>
          </div>
          <div>{data?.task?.status}</div>
          <div>{data?.task?.priority}</div>
          <div>
            <span>Assignee</span>
            <span>
              {data?.task?.taskAssignments[0].assignedByUser.employee.firstName}
              {data?.task?.taskAssignments[0].assignedByUser.employee.lastName}
            </span>
          </div>
          <div>
            <span>Assigned To</span>
            <span>
              {data?.task?.taskAssignments[0].assignedToEmployee.firstName}
              {data?.task?.taskAssignments[0].assignedToEmployee.lastName}
            </span>
          </div>
          <div>
            <span>Due at</span> <span>{data?.task.dueAt}</span>
          </div>
        </div>
        <div>{<button onClick={() => onSetTaskId("")}>Close</button>}</div>
      </div>
    </>
  );
}

export default TaskDrawer;
