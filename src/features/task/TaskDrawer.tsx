import type { SetStateAction } from "react";
import type React from "react";

type TaskDrawerProps = {
  onSetTaskId: React.Dispatch<SetStateAction<string>>;
};

function TaskDrawer({ onSetTaskId }: TaskDrawerProps) {
  return <div>{<button onClick={() => onSetTaskId("")}>Close</button>}</div>;
}

export default TaskDrawer;
