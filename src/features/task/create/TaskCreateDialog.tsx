import CloseIcon from "@mui/icons-material/Close";
import type { SetStateAction } from "react";
import TaskForm from "./TaskForm";
type TaskCreateDialogProps = {
  onSetShowModal: React.Dispatch<SetStateAction<boolean>>;
};

function TaskCreateDialog({ onSetShowModal }: TaskCreateDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/40 p-4">
      <section
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-employee-title"
      >
        <header className="flex items-start justify-between border-b border-[#dfe6f0] px-6 py-5">
          <div>
            <h2
              className="text-xl font-bold text-[#172033]"
              id="add-employee-title"
            >
              Create task
            </h2>
            <p className="mt-1 text-sm text-[#647089]">
              Define work, owner, priority, and target date.
            </p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#647089] hover:bg-[#f1f4f8] hover:text-[#172033] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
            onClick={() => onSetShowModal(false)}
            aria-label="Close add employee modal"
          >
            <CloseIcon className="!h-5 !w-5" />
          </button>
        </header>

        <TaskForm onSetShowModal={onSetShowModal} />
      </section>
    </div>
  );
}

export default TaskCreateDialog;
