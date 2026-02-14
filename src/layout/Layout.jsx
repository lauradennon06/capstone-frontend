import { Outlet } from "react-router";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import "./layout.css";

export default function Layout() {
  const { token } = useAuth();

  return (
    <>
      <header>
        <Link to={token ? "/user" : "/home"}>back to home</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
