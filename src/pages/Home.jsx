// Home page will be a component that has a title, a link to the list of cars for sale, and a link to the list of auction sites, and a link for the user to log in

import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <h1>DH MARTE AUTO SALE</h1>

      <body>
        <div>
          <Link to="/cars">Cars for Sale</Link>
        </div>
        <div>
          <Link to="/auctions">Auction Sites</Link>
        </div>
      </body>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </>
  );
}
