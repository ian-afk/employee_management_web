import { useForm } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import type { SetStateAction } from "react";
import FormSelect from "../../../components/form/FormSelect";
import { useAddTask } from "./useAddTask";
import { useGetDepartment } from "../../../hooks/useGetDepartment";

type TaskFormValues = {
  taskTitle: string;
  description: string;
  dueAt: Date;
  priority: PriorityStatus;
  assignedDepartment: string;
};

type PriorityStatus = (typeof priorityStatus)[number];
type TaskFormProps = {
  onSetShowModal: React.Dispatch<SetStateAction<boolean>>;
};

const priorityStatus = [
  "SHOWSTOPPER",
  "CRITICAL",
  "HIGH",
  "MEDIUM",
  "LOW",
] as const;
function TaskForm({ onSetShowModal }: TaskFormProps) {
  const { mutate: addTask, isPending } = useAddTask();

  const { register, formState, handleSubmit, reset } =
    useForm<TaskFormValues>();
  const { errors } = formState;

  const {
    data,
    isLoading: isDeptLoading,
    isError: isDeptError,
    refetch,
  } = useGetDepartment();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  function onSubmit(data: TaskFormValues) {
    addTask(
      {
        title: data.taskTitle,
        description: data.description,
        dueAt: data.dueAt,
        priority: data.priority,
      },
      {
        onSettled: () => reset(),
      },
    );
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col"
      >
        <FormInput
          id="taskTitle"
          label="Task title"
          type="text"
          registration={register("taskTitle", {
            required: "Task Title is required",
          })}
          error={errors.taskTitle?.message}
        />
        <FormInput
          id="description"
          label="Description"
          type="text"
          registration={register("description", {
            required: "Task Description is required",
          })}
          error={errors.description?.message}
        />
        <FormSelect
          id="priority"
          placeHolder="Select Task Priority"
          label="Priority *"
          data={priorityStatus}
          registration={register("priority", {
            required: "Task Priority is required",
          })}
          error={errors.priority?.message}
          getOptionKey={(item: PriorityStatus) => item}
          getOptionLabel={(item: PriorityStatus) => item}
          getOptionValue={(item: PriorityStatus) => item}
        />
        <FormInput
          id="dueAt"
          label="Due Date *"
          registration={register("dueAt", {
            required: "Due Date is required",
            validate: (value) => {
              const selected = new Date(value);
              return selected >= today || "Past dates are not allowed";
            },
          })}
          type="date"
          error={errors.dueAt?.message}
        />

        <div className="sm:col-span-2">
          {isDeptLoading ? (
            <div className="rounded-lg border border-[#dfe6f0] bg-[#f8fafd] px-4 py-3 text-sm text-[#647089]">
              Loading..
            </div>
          ) : isDeptError ? (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-[#eccaca] bg-[#fff6f6] px-4 py-3 text-sm text-[#a23c3c]">
              <span>Unable to load Department</span>
              <button
                type="button"
                className="rounded-md border border-[#dfb5b5] bg-white px-3 py-1.5 text-xs font-semibold hover:bg-[#fffafa]"
                onClick={() => refetch()}
              >
                Retry
              </button>
            </div>
          ) : (
            <FormSelect
              id="department"
              placeHolder="Select a Department"
              label="Department *"
              data={data?.results ?? []}
              registration={register("assignedDepartment", {
                required: "Department field is required",
              })}
              error={errors.assignedDepartment?.message}
              getOptionKey={(item) => item.id}
              getOptionLabel={(item) =>
                `${item.departmentCode} - ${item.departmentName}`
              }
              getOptionValue={(item) => item.id}
            />
          )}
        </div>
        <button onClick={() => onSetShowModal(false)} disabled={isPending}>
          Cancel
        </button>
        <button type="submit" disabled={isPending}>
          Save
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
