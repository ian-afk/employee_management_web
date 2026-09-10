type PermissionMatrixTabHeaderProps = {
  roleName: string;
};
function PermissionMatrixTabHeader({
  roleName,
}: PermissionMatrixTabHeaderProps) {
  return (
    <div>
      <span>{roleName}</span>
      <p>Select allowed actiond</p>
    </div>
  );
}

export default PermissionMatrixTabHeader;
