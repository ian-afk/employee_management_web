type FormLabelProps = {
  label: string;
  id: string;
};

function FormLabel({ label, id }: FormLabelProps) {
  return (
    <label className="text-sm font-semibold text-[#35415a]" htmlFor={id}>
      {label}
    </label>
  );
}

export default FormLabel;
