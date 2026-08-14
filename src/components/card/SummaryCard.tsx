import type { ReactNode } from "react";

type SummaryCardProps = {
  icon: ReactNode;
  title: string;
  details: string | number;
  cardFooter: string;
};

function SummaryCard({ icon, title, details, cardFooter }: SummaryCardProps) {
  return (
    <div>
      <div>{icon}</div>
      <span>{title}</span>
      <span>{details}</span>
      <span>{cardFooter}</span>
    </div>
  );
}

export default SummaryCard;
