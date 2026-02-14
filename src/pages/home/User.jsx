//This is the landing page for the user when they log in.
//There will be a link to the cars page, a link to the auctions page, and a link to the inquiries page

// there will be the option to add another user, using the Register component

import React from "react";
import { Link, useNavigate } from "react-router";
import Register from "../../auth/Register";
import { useAuth } from "../../auth/AuthContext";

const User = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>WELCOME HECTOR</h1>
      <nav>
        <ul>
          <li>
            <Link to="/cars">Manage Cars</Link>
          </li>
          <li>
            <Link to="/auctions">Manage Auctions</Link>
          </li>
          <li>
            <Link to="/inquiries">Manage Inquiries</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <Register />
    </div>
  );
};

export default User;
