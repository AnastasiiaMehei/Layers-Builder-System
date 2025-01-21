import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDiagrams,
  addDiagram,
  deleteDiagram,
  updateDiagram,
} from "../diagrams/operations.js";

const diagramsSlice = createSlice({
  name: "diagrams",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiagrams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDiagrams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchDiagrams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addDiagram.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDiagram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addDiagram.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteDiagram.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDiagram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (diagram) => diagram.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteDiagram.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateDiagram.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDiagram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (diagram) => diagram.id === action.meta.arg.diagramId
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateDiagram.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default diagramsSlice.reducer;
