import type { SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";

type EmployeeHeaderProps = {
  onSetShowModal: React.Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};

function EmployeeHeader({ onSetShowModal, showModal }: EmployeeHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#647089]">
          People directory
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#172033]">Employees</h1>
        <p className="mt-1 text-sm text-[#647089]">
          Manage employee profiles and work information.
        </p>
      </div>

      <button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg bg-[#2f66e8] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2858c9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-2 sm:self-auto"
        onClick={() => onSetShowModal(!showModal)}
        aria-haspopup="dialog"
      >
        <AddIcon className="!h-5 !w-5" />
        Add employee
      </button>
    </header>
  );
}

export default EmployeeHeader;
