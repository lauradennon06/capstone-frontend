import { Outlet } from "react-router";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import homeIcon from "../assets/home.jpg";
import "./layout.css";

export default function Layout() {
  const { token } = useAuth();

  return (
    <>
      <header>
        <Link to={token ? "/user" : "/home"}>
          <img
            src={homeIcon}
            alt="Home"
            style={{ width: "120px", height: "80px" }}
          />
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
