import type { ReactNode, SelectHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

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
  getOptionKey?: (item: T) => string | number;
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
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...selectProps}
        {...registration}
        className="border-2 px-2 py-1"
      >
        <option value="" disabled selected>
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
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default FormSelect;
