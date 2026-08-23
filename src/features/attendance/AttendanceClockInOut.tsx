import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { clockInOutAttendance } from "../../services/attendanceService";
import toast from "react-hot-toast";
import axios from "axios";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

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
      toast.success(
        clockType === "timein"
          ? "Successfully clocked in"
          : "Successfully clocked out",
      );
      setShowModal(false);
      setEmpCode("");
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
    setClockType(type);
    setEmpCode("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (mutation.isLoading) return;
    setShowModal(false);
    setEmpCode("");
  };

  const isClockIn = clockType === "timein";
  return (
    <aside className="flex h-full min-h-[128px] w-full flex-col rounded-xl bg-gradient-to-br from-[#15213a] to-[#213252] p-3 text-white shadow-[0_16px_34px_rgba(20,33,61,0.18)]">
      <p className="text-[10px] font-bold text-[#aebbd1]">
        My attendance today
      </p>
      <p className="mt-2 text-[26px] font-extrabold leading-none tracking-[-0.04em] text-white">
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/45 p-4 backdrop-blur-[2px]"
          onMouseDown={handleCloseModal}
        >
          <section
            className="w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/70 bg-white text-left shadow-[0_24px_80px_rgba(23,32,51,0.26)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-clock-dialog-title"
            aria-describedby="attendance-clock-dialog-description"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b border-[#dfe6f0] px-5 py-5 sm:px-6">
              <div className="flex min-w-0 items-start gap-3.5">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    isClockIn
                      ? "bg-[#e4f6ef] text-[#168265]"
                      : "bg-[#eaf1ff] text-[#2f66e8]"
                  }`}
                >
                  {isClockIn ? (
                    <LoginRoundedIcon className="!h-[22px] !w-[22px]" />
                  ) : (
                    <LogoutRoundedIcon className="!h-[22px] !w-[22px]" />
                  )}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h2
                    className="text-lg font-bold text-[#172033]"
                    id="attendance-clock-dialog-title"
                  >
                    Confirm {isClockIn ? "clock in" : "clock out"}
                  </h2>
                  <p
                    className="mt-1 text-sm leading-5 text-[#647089]"
                    id="attendance-clock-dialog-description"
                  >
                    Enter your employee code to verify this attendance action.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-transparent text-[#647089] transition-colors hover:border-[#dfe6f0] hover:bg-[#f4f7fb] hover:text-[#172033] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleCloseModal}
                disabled={mutation.isLoading}
                aria-label="Close attendance confirmation"
              >
                <CloseRoundedIcon className="!h-5 !w-5" />
              </button>
            </header>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleClockInOut();
              }}
            >
              <div className="px-5 py-6 sm:px-6">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.06em] text-[#536078]"
                  htmlFor="attendance-employee-code"
                >
                  Employee code
                </label>
                <div className="flex h-12 items-center gap-3 rounded-[10px] border border-[#d8e1ee] bg-[#f8fafd] px-3.5 text-[#647089] transition-[border-color,box-shadow,background-color] focus-within:border-[#2f66e8] focus-within:bg-white focus-within:shadow-[0_0_0_3px_#e4ecff]">
                  <BadgeOutlinedIcon className="!h-5 !w-5 shrink-0" />
                  <input
                    id="attendance-employee-code"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#172033] outline-none placeholder:font-normal placeholder:text-[#9aa5b8]"
                    type="text"
                    value={empCode}
                    onChange={(event) => setEmpCode(event.target.value)}
                    placeholder="Enter employee code"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-[#7b869a]">
                  Use the employee code assigned to your profile.
                </p>
              </div>

              <footer className="flex flex-col-reverse gap-2 border-t border-[#dfe6f0] bg-[#fbfcfe] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center rounded-[10px] border border-[#d8e1ee] bg-white px-4 text-sm font-semibold text-[#536078] transition-colors hover:border-[#bcc8d9] hover:bg-[#f4f7fb] hover:text-[#172033] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleCloseModal}
                  disabled={mutation.isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`inline-flex h-10 items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-bold text-white transition-[background-color,box-shadow,transform] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55 ${
                    isClockIn
                      ? "bg-[#168766] shadow-[0_7px_16px_rgba(22,135,102,0.2)] hover:bg-[#117457]"
                      : "bg-[#2f66e8] shadow-[0_7px_16px_rgba(47,102,232,0.2)] hover:bg-[#2858c9]"
                  }`}
                  disabled={mutation.isLoading || !empCode.trim()}
                >
                  {isClockIn ? (
                    <LoginRoundedIcon className="!h-[18px] !w-[18px]" />
                  ) : (
                    <LogoutRoundedIcon className="!h-[18px] !w-[18px]" />
                  )}
                  {mutation.isLoading
                    ? "Confirming..."
                    : `Confirm ${isClockIn ? "clock in" : "clock out"}`}
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </aside>
  );
}

export default AttendanceClockInOut;
