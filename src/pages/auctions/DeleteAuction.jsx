// This component will be used to delete an auction from the database. The user will be able to click a button to delete the auction, and then be redirected back to the auctions page.

import React from "react";
import { useNavigate, useParams } from "react-router";
import { deleteAuction } from "../../api/auctions";
import { useAuth } from "../../auth/AuthContext";

export default function DeleteAuction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const onDelete = async () => {
    try {
      await deleteAuction(id, token);
      navigate("/auctions");
    } catch (e) {
      console.error("Failed to delete auction", e);
    }
  };

  return (
    <>
      <h1>Delete Auction</h1>
      <p>Are you sure you want to delete this auction?</p>
      <button onClick={onDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/auctions")}>No, Go Back</button>
    </>
  );
}
