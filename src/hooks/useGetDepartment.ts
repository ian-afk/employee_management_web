import { useQuery } from "@tanstack/react-query";
import { getDepartment } from "../services/departmentService";

export const useGetDepartment = () => {
  return useQuery({
    queryKey: ["department"],
    queryFn: async () => await getDepartment(),
  });
};
