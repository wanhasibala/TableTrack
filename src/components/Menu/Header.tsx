import React from "react";
import { Button } from "../ui/button";
import { Bell, ShoppingCart } from "lucide-react";

export const MenuHeader = () => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <p className="subtle-medium">Welcome to</p>
        <h3 className="">Restaurant</h3>
      </div>
      <div className="flex gap-2 ">
        <Button variant={"outline"} className="rounded-full px-3">
          <ShoppingCart />
        </Button>
        <Button variant={"outline"} className="rounded-full px-3">
          <Bell />
        </Button>
      </div>
    </header>
  );
};
