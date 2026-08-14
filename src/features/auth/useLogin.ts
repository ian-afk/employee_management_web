import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/authService";
import axios from "axios";
import type { ApiErrorResponse } from "../../types/auth-type";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { SetStateAction } from "react";

type useLoginType = {
  onSetError: React.Dispatch<SetStateAction<string | null>>;
};
export function useLogin({ onSetError }: useLoginType) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      onSetError(null);

      queryClient.removeQueries({
        queryKey: ["auth", "current-user"],
        exact: true,
      });
      toast.success(`${data.message}`);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        onSetError(error?.response?.data.message ?? "Login request failed");
      }
    },
  });
}
