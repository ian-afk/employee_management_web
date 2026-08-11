import { useState } from "react";
import TaskDrawer from "./TaskDrawer";

import TaskStage from "./TaskStage";

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
    <div>
      <button onClick={() => setIsAllTask(true)}>All</button>
      <button onClick={() => setIsAllTask(false)}>Assigned</button>
      {stages.map((task) => (
        <TaskStage
          onSetTaskId={setTaskId}
          isAllTask={isAllTask}
          stage={task}
          key={task.stage}
        />
      ))}

      {taskId && <TaskDrawer taskId={taskId} onSetTaskId={setTaskId} />}
    </div>
  );
}

export default Task;
