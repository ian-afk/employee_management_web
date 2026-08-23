import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { clockInOutAttendance } from "../../services/attendanceService";
import toast from "react-hot-toast";
import axios from "axios";
import { useCurrentUser } from "../../hooks/useCurrentUser";

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
    <div className="p-4 border-solid border-2 rounded-xl bg-[#1A2845]">
      <div className="text-white gap-2">
        <span>My attendance today</span>
        <br />
        <span className="text-3xl font-semibold text-white">{currentTime}</span>
        <br />
        <span>
          {data?.clockedIn
            ? `Clocked In at ${data.clockedIn} - 6h 40m elapsed`
            : "You are not clocked in. Please clock in"}
        </span>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          className={` px-4 py-2 rounded-lg text-white w-32`}
          style={{ background: clockedIn ? "#d3d3d3" : "#168766" }}
          onClick={() => handleClockingInOut("timein")}
          disabled={clockedIn}
        >
          Clock In
        </button>
        <button
          className={`px-4 py-2 rounded-lg border-solid border-2  border-black w-32 `}
          style={{ background: clockedIn ? "#fff" : "#d3d3d3" }}
          onClick={() => handleClockingInOut("timeout")}
          disabled={!clockedIn}
        >
          Clock Out
        </button>
      </div>
      {showModal && (
        <div>
          <input type="text" onChange={(e) => setEmpCode(e.target.value)} />
          <button onClick={() => handleClockInOut()}>Confirm</button>
        </div>
      )}
    </div>
  );
}

export default AttendanceClockInOut;
