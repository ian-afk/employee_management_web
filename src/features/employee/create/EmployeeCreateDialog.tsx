import type { SetStateAction } from "react";
import EmployeeForm from "./EmployeeForm";

type EmployeeCreateDialogProps = {
  onSetShowModal: React.Dispatch<SetStateAction<boolean>>;
};

function EmployeeCreateDialog({ onSetShowModal }: EmployeeCreateDialogProps) {
  return (
    <div>
      <EmployeeForm onSetShowModal={onSetShowModal} />
    </div>
  );
}

export default EmployeeCreateDialog;
