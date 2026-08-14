import { useQuery } from "@tanstack/react-query";
import { getEmployeeSummary } from "../../services/employeeService";
import { isUnAuthorizedError } from "../../services/authHelper";
import { Navigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import SummaryCard from "../../components/card/SummaryCard";
function EmployeeSummary() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async ({ signal }) => getEmployeeSummary({ signal }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div> No record found</div>;
  if (isError) {
    if (isUnAuthorizedError(error)) {
      <Navigate to="/login" replace />;
    }
  }

  const summary = data.summary;

  const activePercentrage =
    summary.total_current_emp > 0
      ? (summary.active / summary.total_current_emp) * 100
      : 0;
  return (
    <section
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Employee summary"
    >
      <SummaryCard
        icon={<PersonOutlineOutlinedIcon />}
        title="Total workforce"
        details={summary.total_current_emp}
        cardFooter={`    ${summary.active} active • ${summary.total_current_emp - summary.active}
          inactive`}
        tone="blue"
      />
      <SummaryCard
        icon={<CheckBoxOutlinedIcon />}
        title="Active Employee"
        details={summary.active}
        cardFooter={`${activePercentrage.toFixed(1)}% workforce activation`}
        tone="green"
      />
      <SummaryCard
        icon={<AddReactionOutlinedIcon />}
        title="New Hires"
        details={summary.new_hire}
        cardFooter={`Joined in the last 7 days`}
        tone="violet"
      />
      <SummaryCard
        icon={<PendingActionsOutlinedIcon />}
        title="Pending accounts"
        details={summary.pending}
        cardFooter={`awaiting invitation or activation`}
        tone="amber"
      />
    </section>
  );
}

export default EmployeeSummary;
