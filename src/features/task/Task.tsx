import { useState } from "react";
import TaskDrawer from "./TaskDrawer";

import TaskStage from "./TaskStage";
import Drawer from "../../components/drawer/Drawer";

function Task() {
  const [taskId, setTaskId] = useState("");
  const [isAllTask, setIsAllTask] = useState(true);
  const stages = [
    {
      stage: "Task",
      status: "TODO",
    },
    {
      stage: "In progress",
      status: "IN PROGRESS",
    },
    {
      stage: "In review",
      status: "IN REVIEW",
    },
    {
      stage: "Done",
      status: "DONE",
    },
    {
      stage: "Cancelled",
      status: "CANCELLED",
    },
  ];

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col gap-6 overflow-hidden p-6 lg:p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#647089]">
          Work Management
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#172033]">Tasks</h1>
        <p className="mt-1 text-sm text-[#647089]">
          Assign work, balance team capacity, track changes, and move
          delivirables through review
        </p>
      </div>
      <div
        className="inline-flex w-fit rounded-lg border border-[#dfe6f0] bg-white p-1"
        role="group"
        aria-label="Task assignment filter"
      >
        <button
          type="button"
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] ${
            isAllTask
              ? "bg-[#2f66e8] text-white shadow-sm"
              : "text-[#647089] hover:bg-[#f4f7fb] hover:text-[#172033]"
          }`}
          onClick={() => setIsAllTask(true)}
        >
          All
        </button>
        <button
          type="button"
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] ${
            !isAllTask
              ? "bg-[#2f66e8] text-white shadow-sm"
              : "text-[#647089] hover:bg-[#f4f7fb] hover:text-[#172033]"
          }`}
          onClick={() => setIsAllTask(false)}
        >
          Assigned
        </button>
      </div>

      <div
        className="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-contain pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9bb7ff]"
        role="region"
        aria-label="Task stage board"
        tabIndex={0}
      >
        <div className="grid h-full w-full min-w-[1348px] grid-cols-5 gap-3">
          {stages.map((task) => (
            <TaskStage
              onSetTaskId={setTaskId}
              isAllTask={isAllTask}
              stage={task}
              key={task.stage}
            />
          ))}
        </div>
      </div>

      {taskId && (
        <Drawer
          onShowDetails={setTaskId}
          drawerHeader="Task Details"
          drawerInformation="Task Information"
        >
          <TaskDrawer taskId={taskId} />
        </Drawer>
      )}
    </div>
  );
}

export default Task;
