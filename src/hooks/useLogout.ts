import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["auth", "current-user", "logout"],
    mutationFn: async () => {
      await logout();
    },
    retry: false,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
}
