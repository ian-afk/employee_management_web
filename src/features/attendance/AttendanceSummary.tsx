import SummaryCard from "../../components/card/SummaryCard";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

// const summarySkeletons = Array.from({ length: 4 });

function AttendanceSummary() {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        icon={<CheckBoxOutlinedIcon />}
        title="Present"
        details={5}
        cardFooter="77% of scheduled staff"
        tone="green"
      />
      <SummaryCard
        icon={<WatchLaterOutlinedIcon />}
        title="Late"
        details={5}
        cardFooter="5 under 15 minutes"
        tone="amber"
      />
      <SummaryCard
        icon={<PersonOffOutlinedIcon />}
        title="Absent"
        details={3}
        cardFooter="1 without notice"
        tone="lightred"
      />
      <SummaryCard
        icon={<LogoutOutlinedIcon />}
        title="On Leave"
        details={3}
        cardFooter="Approved leave records"
        tone="violet"
      />
    </div>
  );
}

export default AttendanceSummary;
