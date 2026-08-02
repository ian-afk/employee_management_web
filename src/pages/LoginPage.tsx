import type { ReactNode } from "react";

type LoginPageProp = {
  children: ReactNode;
};

function LoginPage({ children }: LoginPageProp) {
  return <>{children}</>;
}

export default LoginPage;
