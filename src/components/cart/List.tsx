import React, { useState } from "react";
import { Database } from "@/types/supabase";
import { Card } from "./CartList";

type Item = Database["public"]["Tables"]["menu_item"]["Row"];

type OrderItem = {
  id: string;
  quantity: number;
  customization?: string;
  menu_item: Item;
};

interface ListProps {
  items: OrderItem[];
  setItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

export const List: React.FC<ListProps> = ({ items, setItems }) => {
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCustomizationChange = (id: string, customization: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, customization } : item
      )
    );
  };
  items.sort((a, b) => {
    const createdAtA = new Date(a.menu_item.created_at);
    const createdAtB = new Date(b.menu_item.created_at);
    return createdAtA.getTime() - createdAtB.getTime();
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            item={item.menu_item}
            quantity={item.quantity}
            onQuantityChange={(newQuantity) =>
              handleQuantityChange(item.id, newQuantity)
            }
            onCustomizationChange={(customization) =>
              handleCustomizationChange(item.id, customization)
            }
            custom={item.customization}
          />
        ))}
      </div>
    </>
  );
};
