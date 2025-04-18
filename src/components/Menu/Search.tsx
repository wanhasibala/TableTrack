import React, { useCallback } from "react";
import { Input } from "../ui/input";
import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { useMenuContext } from "@/context/MenuContext";
import { debounce } from "@/lib/debounce";
import { PriceFilter } from "./PriceFilter";

export const Search = () => {
  const { setSearchTerm, setIsFilterOpen } = useMenuContext();
  
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term.toLowerCase().trim());
    }, 300),
    [setSearchTerm]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <div className="flex flex-row items-center border px-2 rounded-lg border-slate-300">
        <SearchIcon size={16} className="text-gray-500" />
        <Input
          placeholder="Search food or drink"
          className="border-none bg-[#fafafa] focus-visible:ring-0 active:border-none"
          onChange={handleSearchChange}
        />
        <button
          onClick={() => setIsFilterOpen(true)}
          className="focus:outline-none"
        >
          <SlidersHorizontal
            className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            size={16}
          />
        </button>
      </div>
      <PriceFilter />
    </>
  );
};
