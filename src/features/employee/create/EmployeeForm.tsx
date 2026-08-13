import type { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import { useAddEmployee } from "./useAddEmployee";
import { useQuery } from "@tanstack/react-query";
import { getTeamLead } from "../../../services/userService";
import FormSelect from "../../../components/form/FormSelect";

type EmployeeFormProps = {
  onSetShowModal: React.Dispatch<SetStateAction<boolean>>;
};

type EmployeeFormValues = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
  jobTitle: string;
  department: string;
  teamLead: string;
  scheduleTimeIn: string;
  scheduleTimeOut: string;
};

function EmployeeForm({ onSetShowModal }: EmployeeFormProps) {
  const { mutate: addEmployee, isPending } = useAddEmployee();
  const { register, formState, handleSubmit, reset } =
    useForm<EmployeeFormValues>();
  const { errors } = formState;

  const {
    data: teamlead,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getTeamLead(),
  });

  const handleCancel = () => {
    onSetShowModal(false);
  };

  function onSubmit(data: EmployeeFormValues) {
    addEmployee(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        age: Number(data.age),
        dob: data.dob,
        jobTitle: data.jobTitle,
        department: data.department,
        teamLeadId: data.teamLead,
        scheduleTimeIn: data.scheduleTimeIn,
        scheduleTimeOut: data.scheduleTimeOut,
      },
      {
        onSettled: () => reset(),
      },
    );
  }
  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <section>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[#647089]">
            Personal details
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormInput
              id="firstName"
              label="First name *"
              registration={register("firstName", {
                required: "First name is required",
              })}
              type="text"
              error={errors.firstName?.message}
            />
            <FormInput
              id="lastName"
              label="Last name *"
              registration={register("lastName", {
                required: "Last name is required",
              })}
              type="text"
              error={errors.lastName?.message}
            />
            <FormInput
              id="age"
              label="Age *"
              min={19}
              registration={register("age", {
                required: "Age is required",
              })}
              type="number"
              error={errors.age?.message}
            />
            <FormInput
              id="dob"
              label="Date of birth *"
              registration={register("dob", {
                required: "Date of birth is required",
              })}
              type="date"
              error={errors.dob?.message}
            />
          </div>
        </section>

        <section className="mt-7 border-t border-[#edf1f6] pt-6">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[#647089]">
            Work assignment
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormInput
              id="jobtitle"
              label="Job title *"
              registration={register("jobTitle", {
                required: "Job title is required",
              })}
              type="text"
              error={errors.jobTitle?.message}
            />
            <FormInput
              id="department"
              label="Department *"
              registration={register("department", {
                required: "Department field is required",
              })}
              type="text"
              error={errors.department?.message}
            />

            <div className="sm:col-span-2">
              {isLoading ? (
                <div className="rounded-lg border border-[#dfe6f0] bg-[#f8fafd] px-4 py-3 text-sm text-[#647089]">
                  Loading..
                </div>
              ) : isError ? (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-[#eccaca] bg-[#fff6f6] px-4 py-3 text-sm text-[#a23c3c]">
                  <span>Unable to load Team lead</span>
                  <button
                    type="button"
                    className="rounded-md border border-[#dfb5b5] bg-white px-3 py-1.5 text-xs font-semibold hover:bg-[#fffafa]"
                    onClick={() => refetch()}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <FormSelect
                  id="teamLead"
                  placeHolder="Select team lead"
                  label="Team Lead"
                  data={teamlead?.results ?? []}
                  registration={register("teamLead", {
                    required: "Team Lead is required",
                  })}
                  error={errors.teamLead?.message}
                  getOptionKey={(item) => item.id}
                  getOptionLabel={(
                    item,
                  ) => `${item.employee.empId} - ${item.employee.firstName}
                        ${item.employee.lastName}`}
                  getOptionValue={(item) => item.employeeId}
                />
              )}
            </div>
          </div>
        </section>

        <section className="mt-7 border-t border-[#edf1f6] pt-6">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[#647089]">
            Work schedule
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormInput
              id="scheduletimein"
              label="Schedule time in *"
              registration={register("scheduleTimeIn", {
                required: "Schedule time in is required",
              })}
              type="time"
              step={60}
              error={errors.scheduleTimeIn?.message}
            />
            <FormInput
              id="scheduletimeout"
              label="Schedule time out *"
              registration={register("scheduleTimeOut", {
                required: "Schedule time out is required",
              })}
              type="time"
              step={60}
              error={errors.scheduleTimeOut?.message}
            />
          </div>
        </section>
      </div>

      <footer className="flex justify-end gap-3 border-t border-[#dfe6f0] bg-white px-6 py-4">
        <button
          type="button"
          className="h-10 rounded-lg border border-[#d3dce9] bg-white px-5 text-sm font-semibold text-[#43506a] hover:bg-[#f4f7fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-10 rounded-lg bg-[#2f66e8] px-5 text-sm font-semibold text-white hover:bg-[#2858c9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
        >
          Save
        </button>
      </footer>
    </form>
  );
}

export default EmployeeForm;
