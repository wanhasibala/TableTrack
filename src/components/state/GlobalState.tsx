import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for the global state
interface GlobalStateType {
  totalItems: number;
  totalPrice: number;
  updateTotals: (items: number, price: number) => void;
}

// Create Context
const GlobalStateContext = createContext<GlobalStateType | undefined>(
  undefined,
);

// Provider Component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateTotals = (items: number, price: number) => {
    setTotalItems(items);
    setTotalPrice(price);
  };

  return (
    <GlobalStateContext.Provider
      value={{ totalItems, totalPrice, updateTotals }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Hook to use global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
