function EmployeeTableHead() {
  const tableHead = [
    "Employee",
    "Employee ID",
    "Department",
    "Job title",
    "Team Leader",
    "Hire Date",
    "Status",
    "Action",
  ];

  return (
    <thead className="sticky top-0 z-10 border-b border-[#dfe6f0] bg-[#f8fafd]">
      <tr>
        {tableHead.map((item) => (
          <th
            key={item}
            className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#647089]"
            scope="col"
          >
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default EmployeeTableHead;
