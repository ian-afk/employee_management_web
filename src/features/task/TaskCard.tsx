import type { SetStateAction } from "react";
import type React from "react";
import type { TaskResult } from "../../types/task-type";

type TaskCardProps = {
  onSetTaskId: React.Dispatch<SetStateAction<string>>;
  task: TaskResult[];
};

function TaskCard({ onSetTaskId, task }: TaskCardProps) {
  console.log(task);

  return (
    <>
      {task.length === 0 ? (
        <div>No records found</div>
      ) : (
        <div>
          {task.map((item) => (
            <div key={item.id} onClick={() => onSetTaskId(item.id)}>
              <div>
                <div>{item?.title ?? item.title}</div>
                <div>
                  <span>Description: </span>
                  {item?.description}
                </div>
                <div>
                  <span>{item.assignedDepartment}</span>
                </div>
              </div>
              <div>
                <div>
                  {
                    item?.taskAssignments[0]?.assignedByUser?.employee
                      ?.firstName
                  }
                </div>
                <div>{item?.createdAt}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default TaskCard;
