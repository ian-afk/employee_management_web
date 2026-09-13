function RbacHeader() {
  return (
    <header className="min-w-0 pb-1">
      <p className="text-[10px] font-extrabold uppercase leading-4 tracking-[0.11em] text-[#2f66e8]">
        Administration · Access control
      </p>
      <h1 className="mt-[7px] text-[clamp(25px,3vw,34px)] font-bold leading-tight tracking-[-0.035em] text-[#172033]">
        Roles & Access
      </h1>
      <p className="mt-[7px] max-w-[42rem] text-[13px] leading-relaxed text-[#647089]">
        Control what each role can do, whose records it can reach, and every
        users role memberships.
      </p>
    </header>
  );
}

export default RbacHeader;
