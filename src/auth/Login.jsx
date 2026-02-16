import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";
import "./login.css";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      navigate("/user");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="loginPage">
      <h2>ADMIN LOGIN</h2>
      <form action={onLogin} className="loginForm">
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <output>{error}</output>}
      </form>
    </div>
  );
}
