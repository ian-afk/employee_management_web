import type { SetStateAction } from "react";
import EmployeeForm from "./EmployeeForm";
import CloseIcon from "@mui/icons-material/Close";

type EmployeeCreateDialogProps = {
  onSetShowModal: React.Dispatch<SetStateAction<boolean>>;
};

function EmployeeCreateDialog({ onSetShowModal }: EmployeeCreateDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/45 p-4 backdrop-blur-[2px]">
      <section
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_24px_80px_rgba(23,32,51,0.24)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-employee-title"
      >
        <header className="flex shrink-0 items-start justify-between border-b border-[#dfe6f0] bg-white px-6 py-5 sm:px-7">
          <div>
            <h2
              className="text-xl font-bold text-[#172033]"
              id="add-employee-title"
            >
              Add employee
            </h2>
            <p className="mt-1 text-sm text-[#647089]">
              Enter the employee profile and work information.
            </p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-transparent text-[#647089] transition-colors hover:border-[#dfe6f0] hover:bg-[#f4f7fb] hover:text-[#172033] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
            onClick={() => onSetShowModal(false)}
            aria-label="Close add employee modal"
          >
            <CloseIcon className="!h-5 !w-5" />
          </button>
        </header>

        <EmployeeForm onSetShowModal={onSetShowModal} />
      </section>
    </div>
  );
}

export default EmployeeCreateDialog;
