export const statusStyles: Record<string, string> = {
  ACTIVE: "bg-[#e4f6ef] text-[#168265] ring-[#bfe7d8]",
  PENDING: "bg-[#fff5df] text-[#9a6400] ring-[#efd79f]",
  HOLD: "bg-[#eef1ff] text-[#5c55b8] ring-[#d3cff4]",
  SUSPENDED: "bg-[#fff0e8] text-[#b45422] ring-[#efc8b4]",
  RESIGNED: "bg-[#f1f3f6] text-[#657085] ring-[#d8dde6]",
  TERMINATED: "bg-[#ffeded] text-[#b53d3d] ring-[#edbcbc]",
  DELETED: "bg-[#eceff3] text-[#687386] ring-[#d2d8e1]",
};

export const statusTaskStyles: Record<string, string> = {
  TODO: "bg-[#eef3fb] text-[#536078] ring-[#d8e1ee]",
  "IN PROGRESS": "bg-[#e8efff] text-[#2f66e8] ring-[#bfd0fa]",
  "IN REVIEW": "bg-[#fff5df] text-[#9a6400] ring-[#efd79f]",
  DONE: "bg-[#e4f6ef] text-[#168265] ring-[#bfe7d8]",
  CANCELLED: "bg-[#ffeded] text-[#b53d3d] ring-[#edbcbc]",
};
export const priorityStyles: Record<string, string> = {
  LOW: "bg-[#eef3fb] text-[#536078] ring-[#d8e1ee]",
  MEDIUM: "bg-[#fff5df] text-[#9a6400] ring-[#efd79f]",
  HIGH: "bg-[#fff0e8] text-[#b45422] ring-[#efc8b4]",
  URGENT: "bg-[#ffeded] text-[#b53d3d] ring-[#edbcbc]",
};
