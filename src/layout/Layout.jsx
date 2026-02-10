import { Outlet } from "react-router";
import { Link } from "react-router";

export default function Layout() {
  return (
    <>
      <header>
        <Link to="/home">BACK TO HOME</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
