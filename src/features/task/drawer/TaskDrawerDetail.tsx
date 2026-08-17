import type {
  TaskWithAssignment,
  TaskWithOutAssignment,
} from "../../../types/task-type";
import { priorityStyles, statusTaskStyles } from "../../../utils/color-palette";
import { dateformatter } from "../../../utils/dateformatter";

type TaskDrawerDetailProps = {
  task: TaskWithAssignment | TaskWithOutAssignment;
};

function TaskDrawerDetail({ task }: TaskDrawerDetailProps) {
  return (
    <section className="mt-7" aria-labelledby="task-detail">
      <h3
        className="text-xs font-bold uppercase tracking-[0.08em] text-[#172033]"
        id="task-detail"
      >
        Task details
      </h3>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 rounded-xl border border-[#e5eaf2] bg-white p-4">
        <div className="min-w-0">
          <dt className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#71809d]">
            Status
          </dt>
          <dd className="mt-2">
            <span
              className={`inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
                statusTaskStyles[task.status] ??
                "bg-[#eef3fb] text-[#536078] ring-[#d8e1ee]"
              }`}
            >
              <span className="truncate">{task.status}</span>
            </span>
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#71809d]">
            Priority
          </dt>
          <dd className="mt-2">
            <span
              className={`inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
                priorityStyles[task.priority] ??
                "bg-[#eef3fb] text-[#536078] ring-[#d8e1ee]"
              }`}
            >
              <span className="truncate">{task.priority}</span>
            </span>
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#71809d]">
            Due date
          </dt>
          <dd className="mt-1 [overflow-wrap:anywhere] text-sm font-semibold text-[#172033]">
            {dateformatter(task.dueAt)}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#71809d]">
            Created
          </dt>
          <dd className="mt-1 [overflow-wrap:anywhere] text-sm font-semibold text-[#172033]">
            {dateformatter(task.createdAt)}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export default TaskDrawerDetail;
