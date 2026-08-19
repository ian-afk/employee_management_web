import type { ReactNode, SelectHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import FormError from "./FormError";
import type React from "react";

type FormSelectProps<T> = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "children"
> & {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  placeHolder: string;
  error?: string;
  data: readonly T[];
  getOptionValue: (item: T) => string | number;
  getOptionLabel: (item: T) => ReactNode;
  getOptionKey?: (item: T) => React.Key | string | number;
};

function FormSelect<T>({
  id,
  label,
  registration,
  error,
  placeHolder,
  data,
  getOptionLabel,
  getOptionValue,
  getOptionKey,
  ...selectProps
}: FormSelectProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#35415a]" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        {...selectProps}
        {...registration}
        defaultValue=""
        className="h-10 rounded-lg border border-[#d3dce9] bg-white px-3 text-sm text-[#172033] outline-none transition-colors hover:border-[#aebbd0] focus:border-[#2f66e8] focus:ring-2 focus:ring-[#dce7ff]"
      >
        <option value="" disabled>
          {placeHolder}
        </option>
        {data.map((item) => {
          const value = getOptionValue(item);
          return (
            <option key={getOptionKey?.(item)} value={value}>
              {getOptionLabel(item)}
            </option>
          );
        })}
      </select>
      {error && <FormError err={error} />}
    </div>
  );
}

export default FormSelect;
