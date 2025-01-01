import React, { useState } from "react";
import { Database } from "@/types/supabase";
import { Button } from "../ui/button";
import { rupiahFormat } from "@/lib/formatting";
import { Textarea } from "../ui/textarea";

type Item = Database["public"]["Tables"]["menu_item"]["Row"];

interface CardProps {
  item: Item;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onCustomizationChange?: (customization: string) => void;
  custom?: string;
}

export const Card: React.FC<CardProps> = ({
  item,
  quantity,
  onQuantityChange,
  onCustomizationChange,
  custom,
}) => {
  const [customization, setCustomization] = useState("");

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onQuantityChange(newQuantity);
    }
  };

  const handleCustomizationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;
    setCustomization(newValue);
    if (onCustomizationChange) {
      onCustomizationChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md">
      <div className="flex justify-between items-center">
        <p className="font-medium">{item.name}</p>
        <p className="text-slate-500">{rupiahFormat(item.price || 0)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="w-8 h-8"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          -
        </Button>
        <span>{quantity}</span>
        <Button
          variant="outline"
          className="w-8 h-8"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </Button>
      </div>
      <div className="mt-2">
        <Textarea
          placeholder="Add customization (e.g., no onions)"
          value={custom || customization}
          onChange={handleCustomizationChange}
        />
      </div>
    </div>
  );
};
