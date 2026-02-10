const API = import.meta.env.VITE_API;

// Create a new user, requires token
export const createUser = async (userData, token) => {
  const response = await fetch(`${API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};
1;

// Get user by ID
export const getUserById = async (userId) => {
  const response = await fetch(`${API}/users/${userId}`);
  return response.json();
};

// update user by ID, requires token
export const updateUserById = async (userId, userData, token) => {
  const response = await fetch(`${API}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Delete user by ID, requires token
export const deleteUserById = async (userId, token) => {
  const response = await fetch(`${API}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Get all users, requires token
export const getAllUsers = async (token) => {
  const response = await fetch(`${API}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Login user
export const loginUser = async (username, password) => {
  const response = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

// Register user
export const registerUser = async (username, password) => {
  const response = await fetch(`${API}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};
