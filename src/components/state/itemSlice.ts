// store/itemsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure for a raw order item
interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface RawOrderItem {
  id: string;
  order_id: string;
  quantity: number;
  menu_item: MenuItem;
  // Add additional properties if needed
  [key: string]: any;
}

interface ItemsState {
  data: RawOrderItem[]; // Store array of raw order items
}

const initialState: ItemsState = {
  data: [], // Initialize with an empty array
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    // Update the state with a new array of raw items
    setRawItems: (state, action: PayloadAction<RawOrderItem[]>) => {
      state.data = action.payload;
    },
    // Append new raw items to the current state
    addRawItems: (state, action: PayloadAction<RawOrderItem[]>) => {
      state.data = [...state.data, ...action.payload];
    },
    // Clear all items from the state
    clearItems: (state) => {
      state.data = [];
    },
  },
});

export const { setRawItems, addRawItems, clearItems } = itemsSlice.actions;

export default itemsSlice.reducer;
