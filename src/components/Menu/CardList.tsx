import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, Minus, Plus } from "lucide-react";
import { MenuDetailDialog } from "./MenuDetailDialog";
import { rupiahFormat } from "@/lib/formatting";
import type { CategoryFromDB, MenuItem } from "./ItemLoader";

interface CardProps {
  item: MenuItem;
  onItemCountChange: (id: string, newQuantity: number) => void;
  quantity: number;
}

export const Card: React.FC<CardProps> = ({
  item,
  onItemCountChange,
  quantity,
}) => {
  const { id, name, price } = item;
  const menu_image = item.menu_image;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="w-full flex gap-2"
        onClick={() => setIsOpen(true)} // Opens the detail dialog (if implemented)
      >
        <img
          loading="lazy"
          className="w-[60px] h-[60px] object-cover bg-slate-100 rounded-lg"
          src={menu_image || "/placeholder.jpg"}
          alt={name || "Menu item"}
        />
        <div>
          <p className="large">{name}</p>
          <p className="text-sm">{rupiahFormat(price || 0)}</p>
        </div>
      </div>
      {quantity === 0 ? (
        <Button
          variant={"outline"}
          className="absolute top-[50%] -translate-y-[50%] right-0 text-xs rounded-full px-4 py-1"
          onClick={() => onItemCountChange(id, 1)} // Add the first item
        >
          Add
        </Button>
      ) : (
        <div className="absolute top-[50%] -translate-y-[50%] right-0 flex justify-center gap-2 bg-secondary text-white px-2 py-1 rounded-full">
          <Button
            className="p-1 bg-white text-black rounded-full h-[24px]"
            onClick={() => onItemCountChange(id, Math.max(0, quantity - 1))} // Decrease quantity, ensuring it doesn't go below 0
          >
            <Minus size={10} />
          </Button>
          <p>{quantity}</p>
          <Button
            className="p-1 bg-white text-black rounded-full h-[24px]"
            onClick={() => onItemCountChange(id, quantity + 1)} // Increase quantity
          >
            <Plus size={10} />
          </Button>
        </div>
      )}
      <MenuDetailDialog
        onItemCountChange={onItemCountChange}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={item}
      />
    </div>
  );
};
