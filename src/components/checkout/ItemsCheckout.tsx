import React from "react";
import { Button } from "../ui/button";
import { Card } from "./Card";
import { Plus } from "lucide-react";
import { Method } from "./Method";

export const ItemsCheckout = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center border-b border-b-slate-200 py-[10px]">
        <p className="large">Your Items</p>
        <Button variant={"link"} className="text-primary underline ">
          See Menu
        </Button>
      </div>
      <div>
        <Card />
      </div>
      <div className="py-5 border-b border-b-slate-200">
        <Button className="large px-4 py-2 h-fit">
          <Plus />
          Add Items
        </Button>
      </div>
      <div>
        <Method />
      </div>
    </div>
  );
};
