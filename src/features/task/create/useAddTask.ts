import { useMutation } from "@tanstack/react-query";
import { postTask } from "../../../services/taskService";
import toast from "react-hot-toast";

export const useAddTask = () => {
  return useMutation({
    mutationKey: ["task"],
    mutationFn: postTask,
    onSuccess: () => {
      toast.success("Task created successfully");
    },
    onError: () => {},
  });
};
