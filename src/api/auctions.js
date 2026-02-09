const API = import.meta.env.VITE_API;

// Fetches an Array of auctions from the Api

export async function getAuctions() {
  try {
    const response = await fetch(`${API}/auctions`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Fetches a single auction by ID from the Api

export async function getAuctionById(auctionId) {
  try {
    const response = await fetch(`${API}/auctions/${auctionId}`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Sends a request to the API to add a new auction, a token is required

export async function createAuction(token, auctionData) {
  if (!token) {
    throw Error("You must be Logged in to add an auction");
  }

  const response = await fetch(`${API}/auctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(auctionData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

// Sends a request to the API to delete an auction by ID, a token is required

export async function deleteAuction(token, auctionId) {
  if (!token) {
    throw Error("You must be Logged in to delete an auction");
  }

  const response = await fetch(`${API}/auctions/${auctionId}`, {
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

// Sends a request to the API to update an auction by ID, a token is required

export async function updateAuction(token, auctionId, auctionData) {
  if (!token) {
    throw Error("You must be Logged in to update an auction");
  }

  const response = await fetch(`${API}/auctions/${auctionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(auctionData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}
