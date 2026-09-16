type Item = {
  label: string;
  value?: string;
};

type DetailItemProps = {
  item: Item[];
};
function DetailItem({ item }: DetailItemProps) {
  return (
    <>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
        {item.map((item) => (
          <div className="min-w-0">
            <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#71809d]">
              {item.label}
            </dt>
            <dd className="mt-1 break-words text-sm font-semibold text-[#172033]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export default DetailItem;
