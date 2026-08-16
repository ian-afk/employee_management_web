import type { AssignedByEmployee } from "../../../types/task-type";

type TaskDrawerAssignmentProps = {
  assignedToInitials: string;
  assignedToName: string;
  assignedToEmployee: AssignedByEmployee;
  assignedByName: string;
};
function TaskDrawerAssignment({
  assignedToInitials,
  assignedToName,
  assignedToEmployee,
  assignedByName,
}: TaskDrawerAssignmentProps) {
  return (
    <section className="mt-7" aria-labelledby="task-assignment">
      <h3
        className="text-xs font-bold uppercase tracking-[0.08em] text-[#172033]"
        id="task-assignment"
      >
        Assignment
      </h3>
      <div className="mt-4 overflow-hidden rounded-xl border border-[#e5eaf2] bg-white">
        <div className="flex min-w-0 items-center gap-3 p-4">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8efff] text-xs font-bold uppercase text-[#2f66e8]"
            aria-hidden="true"
          >
            {assignedToInitials}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#71809d]">
              Assigned to
            </p>
            <p className="mt-1 truncate text-sm font-bold text-[#172033]">
              {assignedToName}
            </p>
            {assignedToEmployee && (
              <p className="mt-0.5 truncate text-xs text-[#647089]">
                {assignedToEmployee.job_title} · {assignedToEmployee.department}
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-[#edf1f6] px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#71809d]">
            Assigned by
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-[#43506a]">
            {assignedByName}
          </p>
        </div>
      </div>
    </section>
  );
}

export default TaskDrawerAssignment;
