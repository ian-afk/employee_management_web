import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";

function EmployeeTableEmpty() {
  return (
    <tr className="h-[380px]">
      <td className="px-6 py-8 text-center" colSpan={8}>
        <div className="mx-auto flex max-w-sm flex-col items-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#eef3fb] text-[#647089]">
            <PersonSearchOutlinedIcon className="!h-7 !w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[#172033]">
            No employees found
          </h3>
          <p className="mt-1 text-sm text-[#71809d]">
            There are no employee records to display.
          </p>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeTableEmpty;
