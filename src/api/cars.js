const API = import.meta.env.VITE_API;

// Fetches an Array of cars from the Api

export async function getCars() {
  try {
    const response = await fetch(`${API}/cars`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Fetches a single car by ID from the Api

export async function getCarById(carId) {
  try {
    const response = await fetch(`${API}/cars/${carId}`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Sends a request to the API to add a new car, a token is required

export async function createCar(token, carData) {
  if (!token) {
    throw Error("You must be Logged in to add a car");
  }

  const response = await fetch(`${API}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

// Sends a request to the API to delete a car by ID, a token is required

export async function deleteCar(token, carId) {
  if (!token) {
    throw Error("You must be Logged in to delete a car");
  }

  const response = await fetch(`${API}/cars/${carId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

// Sends a request to the API to update a car by ID, a token is required

export async function updateCar(token, carId, carData) {
  if (!token) {
    throw Error("You must be Logged in to update a car");
  }

  const response = await fetch(`${API}/cars/${carId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

//fetches all photos for a car by ID from the API

export async function getCarPhotos(carId) {
  try {
    const response = await fetch(`${API}/cars/${carId}/photos`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}
