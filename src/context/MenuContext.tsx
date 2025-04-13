import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Database } from "@/types/supabase";

type Category = Database["public"]["Tables"]["category"]["Row"];

interface MenuContextType {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <MenuContext.Provider 
      value={{ 
        selectedCategory, 
        setSelectedCategory,
        searchTerm,
        setSearchTerm
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