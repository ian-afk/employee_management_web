import { useForm } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";

type UserFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  employeeId: string;
};

function UserForm() {
  const { register, formState, handleSubmit, reset } =
    useForm<UserFormValues>();

  const { errors } = formState;

  function onSubmit(data: UserFormValues) {
    console.log(data);
    reset();
  }
  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <FormInput
          id="email"
          label="Email *"
          placeholder="example@email.com"
          registration={register("email", {
            required: "Email is required",
          })}
          type="email"
          error={errors.email?.message}
        />
        <FormInput
          id="password"
          label="Password *"
          placeholder="Password"
          registration={register("password", {
            required: "Password is required",
          })}
          type="password"
          error={errors.password?.message}
        />
        <FormInput
          id="confirmPass"
          label="Confirm Password *"
          placeholder="Confirm Password"
          registration={register("confirmPassword", {
            required: "Confirm Password is required",
          })}
          type="password"
          error={errors.confirmPassword?.message}
        />
        <FormInput
          id="employeeId"
          label="Employee *"
          placeholder="Employee"
          registration={register("employeeId", {
            required: "Employee is required",
          })}
          type="text"
          error={errors.employeeId?.message}
        />
      </div>
      <footer></footer>
    </form>
  );
}

export default UserForm;
