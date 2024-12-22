// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/localStorage";
import itemsReducer from "./itemSlice";

const PERSISTED_KEY = "reduxState";

// Load the persisted state from local storage
const preloadedState = loadFromLocalStorage("reduxState");

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
  preloadedState, // Use the loaded state during store initialization
});

store.subscribe(() => {
  saveToLocalStorage("reduxState", store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
