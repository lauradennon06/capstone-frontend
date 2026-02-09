// This component will fetch a list of all auctions and display the details. The logged in user will be have a button to edit the auction details, and a button to delete the auction. The user will also have a button to create a new auction, which will take them to a form to fill out the details of the auction.

import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetch("/api/auctions")
      .then((response) => response.json())
      .then((data) => setAuctions(data))
      .catch((error) => console.error("Error fetching auctions:", error));
  }, []);

  return (
    <div>
      <h1>Auctions</h1>
      <Link to="/auctions/new">
        <button>Create New Auction</button>
      </Link>
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id}>
            <h2>{auction.title}</h2>
            <p>{auction.icon}</p>
            <p>{auction.url}</p>

            <button>Edit Auction</button>
            <button>Delete Auction</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Auctions;
