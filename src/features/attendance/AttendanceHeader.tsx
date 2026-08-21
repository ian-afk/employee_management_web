function AttendanceHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#647089]">
          Time and Presence
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#172033]">Attendance</h1>
        <p className="mt-1 text-sm text-[#647089]">
          Monitor daily status, review clock records, and manage correction
        </p>
      </div>
    </header>
  );
}

export default AttendanceHeader;
