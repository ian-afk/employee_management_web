import React, { useState } from "react";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { useLogin } from "./useLogin";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const mutationLogin = useLogin({
    onSetError: setError,
  });

  const handleCredChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    if (input.validity.valueMissing) {
      setEmailError("Email is required");
    } else if (input.validity.typeMismatch) {
      setEmailError("Please enter a valid email address example@email.com");
    } else {
      setEmailError(null);
    }
  };
  const handleLoginClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationLogin.mutate({
      email: user.email,
      password: user.password,
    });
  };

  const handleHidePassword = () => {
    setShowPassword((isVisible) => !isVisible);
  };
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-[420px]">
          <header className="mb-9">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6078a6]">
              Employee Portal
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#172033] sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#68758c] sm:text-base">
              Sign in to manage your workday and stay connected with your team.
            </p>
          </header>

          <form className="space-y-5" onSubmit={handleLoginClick}>
            <div>
              <label
                className="block text-sm font-medium text-[#35415a]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="name@company.com"
                value={user.email}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? "email-error" : undefined}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
                ) => {
                  handleCredChange(e);
                  setEmailError(null);
                }}
                onBlur={handleEmailBlur}
                className={`mt-2 h-12 w-full rounded-xl border bg-[#fbfcff] px-4 text-[15px] text-[#172033] outline-none transition placeholder:text-[#a0aabd] hover:border-[#aebbd0] focus:border-[#607fb9] focus:ring-4 focus:ring-[#e3eaf7] ${
                  emailError ? "border-[#cf5c5c]" : "border-[#d5deeb]"
                }`}
              />
              {emailError && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-2 text-xs leading-5 text-[#b84646]"
                >
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-[#35415a]"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={8}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleCredChange}
                  className="h-12 w-full rounded-xl border border-[#d5deeb] bg-[#fbfcff] px-4 pr-12 text-[15px] text-[#172033] outline-none transition placeholder:text-[#a0aabd] hover:border-[#aebbd0] focus:border-[#607fb9] focus:ring-4 focus:ring-[#e3eaf7]"
                />
                <button
                  type="button"
                  onClick={handleHidePassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-[#718099] transition hover:bg-[#edf2fa] hover:text-[#315b8f] focus:outline-none focus:ring-2 focus:ring-[#b8c8e3]"
                >
                  {showPassword ? (
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={mutationLogin.isLoading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-[#315b8f] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#284c78] focus:outline-none focus:ring-4 focus:ring-[#cbd8ed] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutationLogin.isLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-[#f0cccc] bg-[#fff5f5] px-4 py-3 text-sm text-[#a53e3e]"
            >
              {error}
            </p>
          )}
        </div>
      </section>

      <aside className="hidden h-screen items-center justify-center overflow-hidden bg-[#f3f6fd] lg:flex">
        <img
          src="/assets/login-employee-side.png"
          alt="Employees planning, collaborating, and completing work"
          className="max-h-[90vh] max-w-[90%] object-contain"
        />
      </aside>
    </main>
  );
}
