import { useEffect, useState, type SetStateAction } from "react";

type EmployeeDrawerProps = {
  onShowDetails: React.Dispatch<SetStateAction<string>>;
  empId: string;
};

type EmployeeDetailsType = {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  jobTitle: string;
  department: string;
  status: string;
  teamLead: string;
  createdAt: string;
};
export default function EmployeeDrawer({
  onShowDetails,
  empId,
}: EmployeeDrawerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState<EmployeeDetailsType>({
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    jobTitle: "",
    department: "",
    status: "",
    teamLead: "",
    createdAt: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchEmployee = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:3001/api/employee/${empId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("status failed employee drawer");

        const data = await res.json();
        setEmployee(data);
      } catch (error) {
        console.log(`something went wrong: ${error}`);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    fetchEmployee();
    return () => controller.abort();
  }, [empId]);

  return (
    <>
      {isLoading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <div>
            <div>
              <img src="#" alt="PROFILE" />
            </div>
            {/* EMPLOYEE NAME and job */}
            <div>
              <div>
                <span>
                  {employee.firstName} {employee.lastName}
                </span>
                <span>
                  {employee.jobTitle} {employee.department}
                </span>
              </div>
              <div>
                <span>{employee.status}</span>
              </div>
            </div>
            {/* EMPLOYEE INFORMATION */}
            <div>
              <div>
                <h3>EMPLOYEE INFORMATION</h3>
              </div>
              <div>
                <label htmlFor="">Employee ID</label>
                <span>{employee.id}</span>
              </div>
              <div>
                <label htmlFor="">HIRE DATE</label>
                <span>{employee.createdAt}</span>
              </div>
              <div>
                <label htmlFor="">DEPARTMETN</label>
                <span>{employee.department}</span>
              </div>
              <div>
                <label htmlFor="">POSITION</label>
                <span>{employee.jobTitle}</span>
              </div>
            </div>
          </div>
          <div>
            <button onClick={() => onShowDetails("")}>CLOSE</button>
          </div>
        </div>
      )}
    </>
  );
}
