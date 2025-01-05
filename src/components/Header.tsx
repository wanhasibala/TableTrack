import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

import { useNavigate, LinkProps } from "react-router";

export const Header = ({ name, href }: { name: string; href?: string }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full relative flex justify-center items-center mt-4 ">
      <Button
        variant={"link"}
        className="absolute left-0 p-0"
        onClick={() => {
          href ? navigate(href) : navigate(-1);
        }}
      >
        <ChevronLeft />
      </Button>
      <h3 className="font-semibold">{name}</h3>
    </div>
  );
};
