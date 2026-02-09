// Home page will be a component that has a title, a link to the list of cars for sale, and a link to the list of auction sites, and a link for the user to log in

import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <h1>Welcome to Car Bazaar</h1>
      <nav>
        <ul>
          <Link to="/cars">Cars for Sale</Link>

          <li>
            <Link to="/auctions">Auction Sites</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
