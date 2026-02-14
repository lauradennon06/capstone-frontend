//This component will add an Auction website to the database. The user will fill out a form with the details of the auction, and then submit the form to add the auction to the database. The user will also have the option to upload an image for the auction, which will be stored in the database as a URL.

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createAuction } from "../../api/auctions";
import { useAuth } from "../../auth/AuthContext";

export default function AddAuction() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const onSubmit = async (formData) => {
    const name = formData.get("name");
    const url = formData.get("url");
    const icon_url = formData.get("icon_url");

    try {
      await createAuction({ name, url, icon_url }, token);
      navigate("/auctions");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Add a New Auction</h1>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          URL
          <input type="url" name="url" required />
        </label>
        <label>
          Icon URL
          <input type="url" name="icon_url" />
        </label>
        <button>Add Auction</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
