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
    <>
      <div className="w-[700px] flex flex-col justify-center items-center border-2 border-red-500">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-col gap-2 space-y-2"
        >
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

          {isLoading ? (
            <div>Loading..</div>
          ) : isError ? (
            <div>
              <div>Unable to load Team lead</div>
              <button onClick={() => refetch()}>Retry</button>
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
          <input type="submit" value="Save" disabled={isPending} />
        </form>
        <button onClick={handleCancel} disabled={isPending}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default EmployeeForm;
