import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { clockInOutAttendance } from "../../services/attendanceService";
import toast from "react-hot-toast";
import axios from "axios";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

type TimeInOut = "timein" | "timeout";
function AttendanceClockInOut() {
  const { data } = useCurrentUser();

  const clockedIn = data?.attendanceId !== null;
  const attendanceID = data?.attendanceId ?? null;
  const queryClient = useQueryClient();
  const [empCode, setEmpCode] = useState("");
  const [clockType, setClockType] = useState<TimeInOut>("timein");
  const [showModal, setShowModal] = useState(false);
  const mutation = useMutation({
    mutationFn: ({
      timeinout,
      empCode,
    }: {
      timeinout: TimeInOut;
      empCode: string;
    }) =>
      clockInOutAttendance(
        `${timeinout === "timein" ? "attendance/timein" : `attendance/timeout/`}`,
        empCode,
        attendanceID,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
      queryClient.invalidateQueries({
        queryKey: ["auth", "current-user"],
      });
      toast.success("Successfully clock in");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.message);
      else toast.error("Something went wrong");
    },
  });
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  );
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockInOut = () => {
    mutation.mutate({ timeinout: clockType, empCode });
  };

  const handleClockingInOut = (type: TimeInOut) => {
    setShowModal(!showModal);
    setClockType(type);
  };
  return (
    <aside className="flex h-full min-h-[128px] w-full flex-col rounded-xl bg-gradient-to-br from-[#15213a] to-[#213252] p-5 text-white shadow-[0_16px_34px_rgba(20,33,61,0.18)]">
      <p className="text-[10px] font-bold text-[#aebbd1]">
        My attendance today
      </p>
      <p className="mt-2 text-[35px] font-extrabold leading-none tracking-[-0.04em] text-white">
        {currentTime}
      </p>
      <p className="mt-1 text-[10px] leading-4 text-[#b8c2d4]">
        {data?.clockedIn
          ? `Clocked In at ${data.clockedIn} - 6h 40m elapsed`
          : "You are not clocked in. Please clock in"}
      </p>

      <div className="mt-auto grid grid-cols-1 gap-2 pt-4 min-[430px]:grid-cols-2">
        <button
          type="button"
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-[10px] px-4 text-xs font-extrabold transition-[background-color,color,box-shadow,transform] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#17233d] disabled:cursor-not-allowed ${
            clockedIn
              ? "bg-white/10 text-white/45"
              : "bg-[#168766] text-white shadow-[0_7px_16px_rgba(22,135,102,0.25)] hover:-translate-y-px hover:bg-[#117457] hover:shadow-[0_8px_18px_rgba(22,135,102,0.32)]"
          }`}
          onClick={() => handleClockingInOut("timein")}
          disabled={clockedIn}
        >
          <LoginRoundedIcon className="!h-4 !w-4" aria-hidden="true" />
          Clock In
        </button>
        <button
          type="button"
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border px-4 text-xs font-extrabold transition-[background-color,color,border-color,box-shadow,transform] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#17233d] disabled:cursor-not-allowed ${
            clockedIn
              ? "border-white bg-white text-[#17233d] hover:-translate-y-px hover:bg-[#edf2fb] hover:shadow-[0_6px_16px_rgba(23,32,51,0.16)]"
              : "border-white/10 bg-white/5 text-white/35"
          }`}
          onClick={() => handleClockingInOut("timeout")}
          disabled={!clockedIn}
        >
          <LogoutRoundedIcon className="!h-4 !w-4" aria-hidden="true" />
          Clock Out
        </button>
      </div>
      {showModal && (
        <div>
          <input type="text" onChange={(e) => setEmpCode(e.target.value)} />
          <button onClick={() => handleClockInOut()}>Confirm</button>
        </div>
      )}
    </aside>
  );
}

export default AttendanceClockInOut;
