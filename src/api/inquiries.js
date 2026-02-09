const API = import.meta.env.VITE_API;

// Fetches an Array of inquiries from the Api

export async function getInquiries() {
  try {
    const response = await fetch(`${API}/inquiries`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Sends a request to the API to add a new inquiry

export async function createInquiry(inquiryData) {
  const response = await fetch(`${API}/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inquiryData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

// Sends a request to the API to delete an inquiry by ID, a token is required

export async function deleteInquiry(token, inquiryId) {
  if (!token) {
    throw Error("You must be Logged in to delete an inquiry");
  }

  const response = await fetch(`${API}/inquiries/${inquiryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}
