// This component will fetch a list of all auctions and display the details. The logged in user will be have a button to edit the auction details, and a button to delete the auction. The user will also have a button to create a new auction, which will take them to a form to fill out the details of the auction.

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAuctions } from "../api/auctions";
import { useAuth } from "../auth/AuthContext";

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const { token } = useAuth();
  const syncAuctions = async () => {
    try {
      const data = await getAuctions();
      console.log("fetched auctions", data);
      setAuctions(data);
    } catch (error) {
      console.error("failed to fetch auctions", error);
    }
  };

  useEffect(() => {
    syncAuctions();
  }, []);

  return (
    <>
      <h1>Auctions</h1>
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id}>
            <h2>{auction.name}</h2>
            <br />
            {auction.icon_url && (
              <img src={auction.icon_url} alt={auction.name + " icon"} />
            )}
            <br />
            <Link to={auction.url}>{auction.url}</Link>
          </li>
        ))}
      </ul>
      {token && <Link to="/auctions/new">Create New Auction</Link>}
    </>
  );
}
