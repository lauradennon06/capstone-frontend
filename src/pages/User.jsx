//This is the landing page for the user when they log in.
//There will be a link to the cars page, a link to the auctions page, and a link to the inquiries page

// there will be the option to add another user, using the Register component

import React from "react";
import { Link } from "react-router";
import Register from "../auth/Register";

const User = () => {
  return (
    <div>
      <h1>Welcome, User!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/cars">Cars</Link>
          </li>
          <li>
            <Link to="/auctions">Auctions</Link>
          </li>
          <li>
            <Link to="/inquiries">Inquiries</Link>
          </li>
        </ul>
      </nav>
      <Register />
    </div>
  );
};

export default User;
