import type { ReactNode } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const currentUser = useCurrentUser();

  if (
    currentUser.isLoading ||
    (currentUser.isFetching && currentUser.data === undefined)
  ) {
    <div>Loading...</div>;
  }
  return <div>{children}</div>;
}

export default AuthProvider;
