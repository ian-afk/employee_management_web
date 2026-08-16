import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../../services/taskService";
import { isUnAuthorizedError } from "../../services/authHelper";
import { Navigate } from "react-router-dom";
import TaskDrawerDetail from "./drawer/TaskDrawerDetail";
import TaskDrawerAssignment from "./drawer/TaskDrawerAssignment";
import SomethingWentWrong from "../../components/initials/SomethingWentWrong";
import NoRecordFound from "../../components/initials/NoRecordFound";

type TaskDrawerProps = {
  taskId: string;
};

function TaskDrawer({ taskId }: TaskDrawerProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async ({ signal }) => getTaskById(`task/${taskId}`, signal),
  });

  if (isLoading) {
    return (
      <div className="grid min-h-48 place-items-center px-6 py-8 text-sm font-medium text-[#647089]">
        Loading task details...
      </div>
    );
  }

  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <SomethingWentWrong />;
  }

  if (!data) {
    return <NoRecordFound />;
  }

  const assignedByUser = data.task.taskAssignments[0]?.assignedByUser ?? null;
  const assignedToEmployee =
    data.task.taskAssignments[0]?.assignedToEmployee ?? null;

  const assignedToName = assignedToEmployee
    ? `${assignedToEmployee.firstName} ${assignedToEmployee.lastName}`
    : "Unassigned";
  const assignedByName = assignedByUser
    ? `${assignedByUser.employee.firstName} ${assignedByUser.employee.lastName}`
    : "Not available";
  const assignedToInitials = assignedToEmployee
    ? `${assignedToEmployee.firstName[0] ?? ""}${assignedToEmployee.lastName[0] ?? ""}`
    : "—";

  return (
    <article className="px-6 py-6">
      <section className="rounded-2xl border border-[#dfe6f0] bg-[#f8fafd] p-5">
        <span className="inline-flex max-w-full rounded-md bg-[#e8efff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[#2f66e8]">
          <span className="truncate">
            {data.task.assignedDepartment ?? "No department"}
          </span>
        </span>
        <h3 className="mt-4 [overflow-wrap:anywhere] text-xl font-bold leading-7 text-[#172033]">
          {data.task.title}
        </h3>
        <p className="mt-2 whitespace-pre-wrap [overflow-wrap:anywhere] text-sm leading-6 text-[#647089]">
          {data.task.description || "No description provided."}
        </p>
      </section>

      <TaskDrawerDetail task={data.task} />
      <TaskDrawerAssignment
        assignedToInitials={assignedToInitials}
        assignedToName={assignedToName}
        assignedToEmployee={assignedToEmployee}
        assignedByName={assignedByName}
      />

      <section className="mt-7 rounded-xl bg-[#f8fafd] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#71809d]">
          Task ID
        </p>
        <p className="mt-1 break-all font-mono text-xs text-[#536078]">
          {data.task.id}
        </p>
      </section>
    </article>
  );
}

export default TaskDrawer;
