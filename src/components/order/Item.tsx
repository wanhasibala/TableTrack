import React from "react";
import { Button } from "../ui/button";
import { Card } from "./CardList";

interface Item {
  id: number;
  name: string;
  price: number;
  count: number;
  description: string;
}

interface ItemsProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export const Items: React.FC<ItemsProps> = ({ items, setItems }) => {
  const handleItemCountChange = (id: number, newCount: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: newCount } : item,
      ),
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="large">Popular Items</p>
        <Button className="text-xs hover:border-none" variant={"link"}>
          View all
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Card
            item={item}
            key={item.id}
            onItemCountChange={handleItemCountChange}
          />
        ))}
      </div>
    </div>
  );
};
