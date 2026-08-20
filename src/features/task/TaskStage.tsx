import { DragDropProvider } from "@dnd-kit/react";

import TaskColumn from "./TaskColumn";
import { useRef, type SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateTaskStatus } from "../../services/taskService";
import { queryClient } from "../../services/queryClient";
import type { TaskColumnId, TaskStatus } from "../../types/task-type";

type TaskStageProps = {
  isAllTask: boolean;
  onSetTaskId: React.Dispatch<SetStateAction<string>>;
};

type UpdateTaskVariables = {
  status: TaskStatus;
  taskId: string;
};
const stages: { stage: TaskColumnId; status: string }[] = [
  {
    stage: "todo",
    status: "TODO",
  },
  {
    stage: "inprogress",
    status: "IN PROGRESS",
  },
  {
    stage: "inreview",
    status: "IN REVIEW",
  },
  {
    stage: "done",
    status: "DONE",
  },
  {
    stage: "cancelled",
    status: "CANCELLED",
  },
];

function TaskStage({ isAllTask, onSetTaskId }: TaskStageProps) {
  const lastTargetRef = useRef<string | number | null>(null);

  const { mutate: updateTask } = useMutation({
    mutationFn: ({ status, taskId }: UpdateTaskVariables) =>
      updateTaskStatus(status, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
    },
  });

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        lastTargetRef.current = null;

        const sourceId = event.operation?.source?.id;
        const targetId = event.operation?.target?.id;

        if (event.canceled || sourceId == null || targetId === null) {
          return;
        }

        const targetStage = stages.find((stage) => stage.stage === targetId);

        if (!targetStage) {
          return;
        }
        updateTask({
          taskId: String(sourceId),
          status: targetStage.status as TaskStatus,
        });
      }}
    >
      {stages.map((stage) => (
        <TaskColumn
          key={stage.stage}
          id={stage.stage}
          label={stage.status}
          isAllTask={isAllTask}
          stage={stage}
          onSetTaskId={onSetTaskId}
        />
      ))}
    </DragDropProvider>
  );
}

export default TaskStage;
