import type { ReactNode } from "react";

type SummaryCardProps = {
  icon: ReactNode;
  title: string;
  details: string | number;
  cardFooter: string;
  tone?: "blue" | "green" | "violet" | "amber";
};

const toneStyles = {
  blue: "bg-[#eaf1ff] text-[#2f66e8]",
  green: "bg-[#e8f7f1] text-[#168265]",
  violet: "bg-[#f1efff] text-[#6755b8]",
  amber: "bg-[#fff5df] text-[#a66b00]",
};

function SummaryCard({
  icon,
  title,
  details,
  cardFooter,
  tone = "blue",
}: SummaryCardProps) {
  return (
    <article className="rounded-xl border border-[#dfe6f0] bg-white p-5 shadow-[0_6px_18px_rgba(23,32,51,0.04)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#cbd6e5] hover:shadow-[0_10px_24px_rgba(23,32,51,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-semibold text-[#647089]">{title}</span>
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg [&>svg]:h-5 [&>svg]:w-5 ${toneStyles[tone]}`}
        >
          {icon}
        </div>
      </div>
      <strong className="mt-3 block text-3xl font-bold tracking-[-0.02em] text-[#172033]">
        {details}
      </strong>
      <p className="mt-2 text-xs leading-5 text-[#71809d]">{cardFooter}</p>
    </article>
  );
}

export default SummaryCard;
