import React from "react";
import { Input } from "../ui/input";
import { SearchIcon, SlidersHorizontal } from "lucide-react";

export const Search = () => {
  return (
    <div className=" flex flex-row items-center border px-2 rounded-lg border-slate-300">
      <SearchIcon size={16} />
      <Input
        placeholder="Search food or drink"
        className="border-none bg-[#fafafa] focus-visible:ring-0   active:border-none"
      />
      <SlidersHorizontal
        className="self-center justify-self-center"
        size={16}
      />
    </div>
  );
};
