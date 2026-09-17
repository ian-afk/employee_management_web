import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import AddIcon from "@mui/icons-material/Add";

function UserCreateDialog() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg bg-[#2f66e8] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2858c9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-2 sm:self-auto"
        onClick={() => setShowModal(!showModal)}
      >
        <AddIcon className="!h-5 !w-5" />
        Add User
      </button>
      {showModal && (
        <Modal
          onSetShowModal={setShowModal}
          title="Add User"
          description="  Enter the user profile and user credentials."
        >
          HELLO
        </Modal>
      )}
    </div>
  );
}

export default UserCreateDialog;
