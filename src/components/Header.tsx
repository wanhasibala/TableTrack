import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export const Header = ({ name }: { name: string }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full relative flex justify-center items-center mt-4 ">
      <Button
        variant={"link"}
        className="absolute left-0 p-0"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
      </Button>
      <h3 className="font-semibold">{name}</h3>
    </div>
  );
};
