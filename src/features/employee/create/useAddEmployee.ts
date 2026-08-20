import { useMutation } from "@tanstack/react-query";
import { postEmployee } from "../../../services/employeeService";

import toast from "react-hot-toast";

export function useAddEmployee() {
  return useMutation({
    mutationFn: postEmployee,
    onSuccess: () => {
      toast.success("Employee created successfully");
    },
  });
}
