type FormErrorProps = {
  err: string;
};

function FormError({ err }: FormErrorProps) {
  return <p className="text-xs text-[#c64242]">{err}</p>;
}

export default FormError;
