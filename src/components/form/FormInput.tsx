import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
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
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        {...registration}
        {...inputProps}
        className="border-2 px-2 py-1"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default FormInput;
