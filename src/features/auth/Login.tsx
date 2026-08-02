import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth", "current-user"],
        exact: true,
      });
      navigate("/", { replace: true });
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

  const handleLoginClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationLogin.mutate({
      email: user.email,
      password: user.password,
    });
  };
  return (
    <div>
      <div>EMPLOYEE PORTAL</div>
      <form onSubmit={handleLoginClick}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleCredChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleCredChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
