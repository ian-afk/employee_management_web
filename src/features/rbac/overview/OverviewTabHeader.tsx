type OverViewProps = {
  roleName: string;
  description: string;
};
function OverviewHeader({ roleName, description }: OverViewProps) {
  return (
    <div>
      <div>
        <span>{roleName}</span>
        <p>{description}</p>
      </div>
      <div>{}</div>
    </div>
  );
}

export default OverviewHeader;
