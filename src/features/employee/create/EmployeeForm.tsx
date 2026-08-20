import type { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import { useAddEmployee } from "./useAddEmployee";
import { useQuery } from "@tanstack/react-query";
import { getTeamLead } from "../../../services/userService";
import FormSelect from "../../../components/form/FormSelect";
import { useGetDepartment } from "../../../hooks/useGetDepartment";

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
    useForm<EmployeeFormValues>({
      defaultValues: {
        department: "",
        teamLead: "",
      },
    });
  const { errors } = formState;

  const {
    data: teamlead,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getTeamLead({ role: "TEAM LEAD" }),
  });

  const {
    data,
    isLoading: isDeptLoading,
    isError: isDeptError,
  } = useGetDepartment();

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
        departmentId: data.department,
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
      <div className="flex-1 space-y-5 overflow-y-auto bg-[#f7f9fc] px-6 py-6 sm:px-7">
        <section className="rounded-xl border border-[#e2e8f1] bg-white p-5 shadow-[0_4px_14px_rgba(23,32,51,0.03)]">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[#43506a]">
            Personal details
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormInput
              id="firstName"
              label="First name *"
              placeholder="John"
              registration={register("firstName", {
                required: "First name is required",
              })}
              type="text"
              error={errors.firstName?.message}
            />
            <FormInput
              id="lastName"
              label="Last name *"
              placeholder="Manuel"
              registration={register("lastName", {
                required: "Last name is required",
              })}
              type="text"
              error={errors.lastName?.message}
            />
            <FormInput
              id="age"
              label="Age *"
              placeholder="Employee age"
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
              placeholder="MM/DD/YYYY"
              registration={register("dob", {
                required: "Date of birth is required",
              })}
              type="date"
              error={errors.dob?.message}
            />
          </div>
        </section>

        <section className="rounded-xl border border-[#e2e8f1] bg-white p-5 shadow-[0_4px_14px_rgba(23,32,51,0.03)]">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[#43506a]">
            Work assignment
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FormInput
                id="jobtitle"
                label="Job title *"
                placeholder="Product designer"
                registration={register("jobTitle", {
                  required: "Job title is required",
                })}
                type="text"
                error={errors.jobTitle?.message}
              />
            </div>
            <div className="sm:col-span-2">
              {isDeptLoading ? (
                <div className="rounded-lg border border-[#dfe6f0] bg-[#f8fafd] px-4 py-3 text-sm text-[#647089]">
                  Loading..
                </div>
              ) : isDeptError ? (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-[#eccaca] bg-[#fff6f6] px-4 py-3 text-sm text-[#a23c3c]">
                  <span>Unable to load Department</span>
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
                  id="department"
                  placeHolder="Select a Department"
                  label="Department *"
                  data={data?.results ?? []}
                  registration={register("department", {
                    required: "Department field is required",
                  })}
                  error={errors.department?.message}
                  getOptionKey={(item) => item.id}
                  getOptionLabel={(item) =>
                    `${item.departmentCode} - ${item.departmentName}`
                  }
                  getOptionValue={(item) => item.id}
                />
              )}
            </div>

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

        <section className="rounded-xl border border-[#e2e8f1] bg-white p-5 shadow-[0_4px_14px_rgba(23,32,51,0.03)]">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[#43506a]">
            Work schedule
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormInput
              id="scheduletimein"
              label="Schedule time in *"
              placeholder="HH:MM 24 hour time"
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
              placeholder="HH:MM 24 hour time"
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

      <footer className="flex shrink-0 justify-end gap-3 border-t border-[#dfe6f0] bg-white px-6 py-4 shadow-[0_-8px_20px_rgba(23,32,51,0.04)] sm:px-7">
        <button
          type="button"
          className="h-10 flex-1 rounded-lg border border-[#d3dce9] bg-white px-5 text-sm font-semibold text-[#43506a] transition-colors hover:bg-[#f4f7fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-10 flex-1 rounded-lg bg-[#2f66e8] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2858c9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          disabled={isPending}
        >
          Save
        </button>
      </footer>
    </form>
  );
}

export default EmployeeForm;
