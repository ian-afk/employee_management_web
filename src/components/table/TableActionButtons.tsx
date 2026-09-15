import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import type { SetStateAction } from "react";

type TableActionButtonsProps = {
  onSetId: React.Dispatch<SetStateAction<string>>;
  id: string;
};

function TableActionButtons({ onSetId, id }: TableActionButtonsProps) {
  return (
    <div className="flex items-center gap-1" aria-label="Employee actions">
      <button
        type="button"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#c9d8f7] bg-[#eaf1ff] text-[#2f66e8] transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:border-[#aac0f2] hover:bg-[#dce8ff] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
        onClick={() => onSetId(id)}
        title="View employee"
      >
        <VisibilityOutlinedIcon className="!h-[17px] !w-[17px]" />
      </button>
      <button
        type="button"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#dfe6f0] bg-white text-[#536078] transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:border-[#cbd5e3] hover:bg-[#f4f7fb] hover:text-[#2f66e8] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
        title="Edit employee"
      >
        <EditOutlinedIcon className="!h-[16px] !w-[16px]" />
      </button>
      <button
        type="button"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-transparent bg-transparent text-[#7b869a] transition-[color,background-color,box-shadow,transform] duration-150 hover:bg-[#eef2f7] hover:text-[#35415a] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
        title="More actions"
      >
        <MoreHorizIcon className="!h-[18px] !w-[18px]" />
      </button>
    </div>
  );
}

export default TableActionButtons;
