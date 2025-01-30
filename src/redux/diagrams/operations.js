import { createAsyncThunk } from "@reduxjs/toolkit"; // Import createAsyncThunk from Redux Toolkit
import axios from "axios"; // Import axios for making HTTP requests

// Create an instance of axios with the base URL
const api = axios.create({
    baseURL: "https://layers-builder-system-server.onrender.com", // Base URL for the API
  });

// GET @ /diagrams
// Thunk to fetch all diagrams
export const fetchDiagrams = createAsyncThunk(
  "diagrams/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/diagrams"); // Make GET request to fetch diagrams
      return res.data; // Return the response data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Return error message if request fails
    }
  }
);

// POST @ /diagrams
// Thunk to add a new diagram
export const addDiagram = createAsyncThunk(
  "diagrams/addDiagram",
  async ({ diagramName, blocks, connections }, thunkAPI) => {
    try {
      const response = await api.post("/api/diagrams", { diagramName, blocks, connections }); // Make POST request to add a new diagram
      return response.data; // Return the response data
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message); // Return error message if request fails
    }
  }
);

// DELETE @ /diagrams/:id
// Thunk to delete a diagram by ID
export const deleteDiagram = createAsyncThunk(
  "diagrams/deleteDiagram",
  async (diagramId, thunkAPI) => {
    try {
      const response = await api.delete(`/api/diagrams/${diagramId}`); // Make DELETE request to remove a diagram by ID
      return response.data; // Return the response data
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message); // Return error message if request fails
    }
  }
);

// PUT @ /diagrams/:id
// Thunk to update a diagram by ID
export const updateDiagram = createAsyncThunk(
  "diagrams/updateDiagram",
  async ({ diagramId, updatedData }, thunkAPI) => {
    try {
      const response = await api.put(`/api/diagrams/${diagramId}`, updatedData); // Make PUT request to update a diagram by ID
      return response.data; // Return the response data
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message); // Return error message if request fails
    }
  }
);
