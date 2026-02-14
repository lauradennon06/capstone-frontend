// This component will delete an Inquiry from the database, it will be a button on the Inquiries page, and when clicked it will call the API to delete the inquiry from the database, and then remove it from the list of inquiries on the Inquiries page, success or failure will be indicated by a message on the Inquiries page

import React from "react";
import { deleteInquiry } from "../../api/inquiries";
import { useAuth } from "../../auth/AuthContext";

export default function DeleteInquiry({ inquiryId, onDelete }) {
  const { token } = useAuth();

  async function handleDelete() {
    try {
      await deleteInquiry(token, inquiryId);
      onDelete(inquiryId);
    } catch (e) {
      console.error(e);
      alert("Failed to delete inquiry: " + e.message);
    }
  }

  return (
    <button onClick={handleDelete} style={{ color: "red" }}>
      Delete
    </button>
  );
}
