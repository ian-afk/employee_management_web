type PermissionMatrixTabHeaderProps = {
  roleName: string;
};
function PermissionMatrixTabHeader({
  roleName,
}: PermissionMatrixTabHeaderProps) {
  return (
    <div>
      <span className="block break-words text-[13px] font-bold leading-5 text-[#172033]">
        {roleName}
      </span>
      <p className="mt-1 text-xs leading-relaxed text-[#647089]">
        Select allowed actions, then choose whose records this role can access.
      </p>
    </div>
  );
}

export default PermissionMatrixTabHeader;
