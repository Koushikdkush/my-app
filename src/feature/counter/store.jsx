import { configureStore } from "@reduxjs/toolkit";
import authState from "./authSlice";

export const store = configureStore({
  reducer: { authState }
});
