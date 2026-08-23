import { useDraggable } from "@dnd-kit/react";
import type {
  TaskWithAssignment,
  TaskWithOutAssignment,
} from "../../types/task-type";
import type { SetStateAction } from "react";

type TaskCardProps = {
  task: TaskWithAssignment | TaskWithOutAssignment;
  onSetTaskId: React.Dispatch<SetStateAction<string>>;
};

function TaskCard({ task, onSetTaskId }: TaskCardProps) {
  const { ref, isDragging } = useDraggable({ id: task.id });
  const assignedByFirstName =
    task.taskAssignments[0]?.assignedByUser?.employee?.firstName ?? "";
  return (
    <div ref={ref}>
      <div className="flex w-full min-w-0 max-w-full flex-col gap-3 pr-1">
        <div
          className={`w-full min-w-0 max-w-full shrink-0 cursor-grab overflow-hidden rounded-xl border bg-white p-3 transition-[border-color,box-shadow,transform] duration-200 active:cursor-grabbing ${
            isDragging
              ? "relative z-20 scale-[1.015] cursor-grabbing border-[#8eacef] shadow-[0_18px_42px_rgba(23,32,51,0.22),0_4px_12px_rgba(47,102,232,0.14)] ring-2 ring-[#dce7ff]"
              : "border-[#dfe6f0] shadow-[0_5px_15px_rgba(23,32,51,0.03)] hover:border-[#b9c9e4] hover:shadow-[0_8px_20px_rgba(23,32,51,0.07)]"
          }`}
          onClick={() => {
            onSetTaskId(task.id);
          }}
        >
          <div>
            <span className="inline-flex max-w-full rounded-md bg-[#eef3fb] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-[#2f66e8]">
              <span className="truncate">
                {task.assignedDepartment?.departmentCode}
              </span>
            </span>
            <h3 className="mt-3 line-clamp-2 [overflow-wrap:anywhere] text-sm font-bold leading-5 text-[#172033]">
              {task?.title ?? task.title}
            </h3>
            <p className="mt-1.5 line-clamp-3 [overflow-wrap:anywhere] text-xs leading-5 text-[#647089]">
              <span className="sr-only">Description: </span>
              {task?.description}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#edf1f6] pt-3">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e8efff] text-[10px] font-bold uppercase text-[#2f66e8]"
                aria-hidden="true"
              >
                {assignedByFirstName.slice(0, 1)}
              </span>
              <span className="truncate text-xs font-semibold text-[#43506a]">
                {assignedByFirstName}
              </span>
            </div>
            <time
              className="max-w-[46%] truncate text-right text-[10px] text-[#71809d]"
              dateTime={task?.createdAt}
            >
              {task?.createdAt}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
