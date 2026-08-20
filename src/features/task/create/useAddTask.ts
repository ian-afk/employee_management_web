import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTask } from "../../../services/taskService";
import toast from "react-hot-toast";

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["task"],
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Task created successfully");
    },
    onError: () => {},
  });
};
