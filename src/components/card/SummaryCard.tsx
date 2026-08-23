import type { ReactNode } from "react";

type SummaryCardProps = {
  icon: ReactNode;
  title: string;
  details: string | number;
  cardFooter: string;
  tone?: "blue" | "green" | "violet" | "amber" | "lightred";
};

const toneStyles = {
  blue: "bg-[#eaf1ff] text-[#2f66e8]",
  green: "bg-[#e8f7f1] text-[#168265]",
  violet: "bg-[#f1efff] text-[#6755b8]",
  amber: "bg-[#fff5df] text-[#a66b00]",
  lightred: "bg-[#FFEDEE] text-[#C64242]",
};

function SummaryCard({
  icon,
  title,
  details,
  cardFooter,
  tone = "blue",
}: SummaryCardProps) {
  return (
    <article className="flex h-full min-h-[128px] flex-col overflow-hidden rounded-xl border border-[#dfe6f0] bg-white p-[18px] shadow-[0_8px_24px_rgba(23,32,51,0.035)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#cbd6e5] hover:shadow-[0_10px_24px_rgba(23,32,51,0.08)]">
      <div className=" flex items-start justify-between gap-3">
        <span className="text-[11px] font-semibold text-[#647089]">
          {title}
        </span>
        <div
          className={`grid h-[31px] w-[31px] shrink-0 place-items-center rounded-lg [&>svg]:h-4 [&>svg]:w-4 ${toneStyles[tone]}`}
        >
          {icon}
        </div>
      </div>
      <strong className="relative z-10 mt-3 block text-[29px] font-bold leading-none tracking-[-0.03em] text-[#172033]">
        {details}
      </strong>
      <p className="relative z-10 mt-auto pt-1.5 text-[10px] leading-4 text-[#71809d]">
        {cardFooter}
      </p>
    </article>
  );
}

export default SummaryCard;
