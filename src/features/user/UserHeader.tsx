function UserHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#647089]">
          Work Management
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#172033]">Users</h1>
        <p className="mt-1 text-sm text-[#647089]">
          Manage user profiles, account details, and access permissions.
        </p>
      </div>
    </header>
  );
}

export default UserHeader;
