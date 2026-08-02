import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/apiClient";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "current-user"],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get<AuthUser | null>("auth/me", {
        signal,
      });
      return response;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
