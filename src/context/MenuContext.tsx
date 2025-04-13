import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Database } from "@/types/supabase";

type Category = Database["public"]["Tables"]["category"]["Row"];

interface PriceRange {
  min: number;
  max: number;
}

interface MenuContextType {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000000 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <MenuContext.Provider 
      value={{ 
        selectedCategory, 
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        priceRange,
        setPriceRange,
        isFilterOpen,
        setIsFilterOpen
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};