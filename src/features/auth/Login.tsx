import { useState } from "react";

type LoginProps = {
  setIsLogin: (val: boolean) => void;
};
export default function Login({ setIsLogin }: LoginProps) {
  const [user, setUser] = useState({
    email: "",
    password: "",
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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello you tried to login");
    setIsLogin(true);
  };
  return (
    <div>
      <div>EMPLOYEE PORTAL</div>
      <form onSubmit={handleLogin}>
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
