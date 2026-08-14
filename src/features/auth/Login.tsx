import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, type ReactNode } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
type ApiErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export default function Login() {
  // export default function Login() {
  const [error, setError] = useState<string | null>();
  const [passwordType, setPasswordType] = useState<string>("password");
  const [icon, setIcon] = useState<ReactNode>(<VisibilityOffOutlinedIcon />);
  const [emailError, setEmailError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setError(null);

      queryClient.removeQueries({
        queryKey: ["auth", "current-user"],
        exact: true,
      });
      toast.success(`${data.message}`);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        setError(error?.response?.data.message ?? "Login request failed");
      }
    },
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
    if (passwordType === "password") {
      setPasswordType("text");
      setIcon(<RemoveRedEyeOutlinedIcon />);
    }
    if (passwordType === "text") {
      setPasswordType("password");
      setIcon(<VisibilityOffOutlinedIcon />);
    }
  };
  return (
    <div>
      <div>EMPLOYEE PORTAL</div>
      <form onSubmit={handleLoginClick}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            value={user.email}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
            ) => {
              handleCredChange(e);
              setEmailError(null);
            }}
            onBlur={handleEmailBlur}
          />
          {emailError && (
            <p id="email-error" role="alert">
              {emailError}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={passwordType}
            name="password"
            value={user.password}
            min={8}
            onChange={handleCredChange}
          />
          <span onClick={handleHidePassword}>{icon}</span>
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
