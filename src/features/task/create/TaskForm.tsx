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

  const handleCancel = () => {
    reset();
    onSetShowModal(false);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <FormInput
            id="taskTitle"
            label="Task title"
            type="text"
            placeholder="What's need to be done"
            registration={register("taskTitle", {
              required: "Task Title is required",
            })}
            error={errors.taskTitle?.message}
          />
          <FormInput
            id="description"
            label="Description"
            type="text"
            placeholder="Add context, requirements , or completion"
            registration={register("description", {
              required: "Task Description is required",
            })}
            error={errors.description?.message}
          />
          <FormSelect
            id="priority"
            label="Priority *"
            placeHolder="Select Task Priority"
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
            placeholder="MM/DD/YYYY"
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
        </div>

        <footer className="flex justify-end gap-3 border-t border-[#dfe6f0] bg-white px-6 py-4">
          <button
            type="button"
            className="h-10 rounded-lg border border-[#d3dce9] bg-white px-5 text-sm font-semibold text-[#43506a] hover:bg-[#f4f7fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 rounded-lg bg-[#2f66e8] px-5 text-sm font-semibold text-white hover:bg-[#2858c9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
          >
            Create task
          </button>
        </footer>
      </form>
    </div>
  );
}

export default TaskForm;
