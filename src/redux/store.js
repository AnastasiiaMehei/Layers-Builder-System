import { configureStore } from "@reduxjs/toolkit"; // Import configureStore from Redux Toolkit
import diagramReducer from "./diagrams/slice"; // Import the diagramReducer

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"; // Import redux-persist actions for serializable check

// Configure and create the Redux store
export const store = configureStore({
  reducer: { diagrams: diagramReducer }, // Set the diagrams reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore these actions for serializable check
      },
    }),
});
