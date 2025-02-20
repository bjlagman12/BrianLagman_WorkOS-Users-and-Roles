import axios from "axios";
import { User } from "../../server/src/models/user";
import { Role } from "../../server/src/models/role";

const API_BASE_URL = "http://localhost:3002";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// -----------
// Users API
// -----------

// Fetch a list of all users
export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

// Fetch a single user by id
export const getUser = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

// Update an existing user by id
export const updateUser = async (id: string, updatedData: User) => {
  const response = await apiClient.put(`/users/${id}`, updatedData);
  return response.data;
};

// Delete a a user by id
export const deleteUser = async (id: string) => {
  await apiClient.delete(`/users/${id}`);
};

// -----------
// Roles API
// -----------

// Fetch a list of all roles
export const getRoles = async () => {
  const response = await apiClient.get("/roles");
  return response.data;
};

// Fetch a single role by id
export const getRole = async (id: string) => {
  const response = await apiClient.get(`/roles/${id}`);
  return response.data;
};

// Update an existing role by id
export const updateRole = async (
  id: string,
  updatedData: { name: string; description: string; isDefault: boolean }
) => {
  const response = await apiClient.patch(`/roles/${id}`, updatedData);
  return response.data;
};
