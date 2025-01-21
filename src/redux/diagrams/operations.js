import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "https://layers-builder-system-server.onrender.com",
  });

// GET @ /diagrams
export const fetchDiagrams = createAsyncThunk(
  "diagrams/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/diagrams");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST @ /diagrams
export const addDiagram = createAsyncThunk(
  "diagrams/addDiagram",
  async ({ diagramName, blocks, connections }, thunkAPI) => {
    try {
      const response = await api.post("/api/diagrams", { diagramName, blocks, connections });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// DELETE @ /diagrams/:id
export const deleteDiagram = createAsyncThunk(
  "diagrams/deleteDiagram",
  async (diagramId, thunkAPI) => {
    try {
      const response = await api.delete(`/api/diagrams/${diagramId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// PATCH @ /diagrams/:id
export const updateDiagram = createAsyncThunk(
  "diagrams/updateDiagram",
  async ({ diagramId, updatedData }, thunkAPI) => {
    try {
      const response = await api.patch(`/api/diagrams/${diagramId}`, updatedData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
