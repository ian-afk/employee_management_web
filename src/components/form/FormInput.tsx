import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import FormError from "./FormError";
import FormLabel from "./FormLabel";
type FormInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
};

function FormInput({
  id,
  label,
  type,
  registration,
  error,
  ...inputProps
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel id={id} label={label} />
      <input
        id={id}
        type={type}
        {...registration}
        {...inputProps}
        className="h-10 rounded-lg border border-[#d3dce9] bg-white px-3 text-sm text-[#172033] outline-none transition-colors hover:border-[#aebbd0] focus:border-[#2f66e8] focus:ring-2 focus:ring-[#dce7ff]"
      />
      {error && <FormError err={error} />}
    </div>
  );
}

export default FormInput;
