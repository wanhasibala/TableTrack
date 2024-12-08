import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { MenuDetailDialog } from "./MenuDetailDialog";

interface Item {
  id: number;
  name: string;
  price: number;
  count: number;
  description: string;
}

interface CardProps {
  item: Item;
  onItemCountChange: (id: number, newCount: number) => void;
}

export const Card: React.FC<CardProps> = ({ item, onItemCountChange }) => {
  const { id, name, price, count, description } = item;
  const [isOpen, SetIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="w-full flex gap-2 " onClick={() => SetIsOpen(true)}>
        <img
          className="w-[60px] h-[60px] object-cover bg-slate-100 rounded-lg"
          src="https://plus.unsplash.com/premium_photo-1674327105280-b86494dfc690?q=80&w=2812&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div>
          <p className="large">{name}</p>
          <p className="text-sm">Price: ${price.toFixed(2)}</p>
        </div>
      </div>
      {count === 0 ? (
        <Button
          variant={"outline"}
          className="absolute top-[50%] -translate-y-[50%] right-0 text-xs rounded-full px-4 py-1"
          onClick={() => onItemCountChange(id, count + 1)}
        >
          Add
        </Button>
      ) : (
        <div className="absolute top-[50%] -translate-y-[50%] right-0 flex justify-center gap-2 bg-secondary text-white px-2 py-1 rounded-full">
          <Button
            className="p-1 rounded-full h-[24px]"
            onClick={() => onItemCountChange(id, count - 1)}
          >
            <Minus size={10} />
          </Button>
          <p>{count}</p>
          <Button
            className="p-1 rounded-full h-[24px]"
            onClick={() => onItemCountChange(id, count + 1)}
          >
            <Plus size={10} />
          </Button>
        </div>
      )}
      <MenuDetailDialog
        isOpen={isOpen}
        onClose={() => SetIsOpen(false)}
        item={{ id, name, price, description }}
      />
    </div>
  );
};
