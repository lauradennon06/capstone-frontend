import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ email, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>ADD A NEW USER</h2>
      <form action={onRegister}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
