import React from 'react';
import { Card } from "./CardList";
import { MenuItem } from "./ItemLoader";

interface MenuItemListProps {
  items: MenuItem[];
  onItemCountChange: (id: string, newQuantity: number) => void;
}

export const MenuItemList: React.FC<MenuItemListProps> = ({ items, onItemCountChange }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item: MenuItem, index: number) => (
        <div
          key={item.id}
          className="animate-fadeIn"
          style={{
            animationDelay: `${Math.min(index * 100, 1000)}ms`,
            animationFillMode: "forwards",
          }}
        >
          <Card
            quantity={item.quantity}
            item={item}
            onItemCountChange={onItemCountChange}
          />
        </div>
      ))}
    </div>
  );
};

export const MenuItemListSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="w-full h-24 bg-gray-200 rounded-lg animate-pulse"
        >
          <div className="flex gap-2 p-4">
            <div className="w-[60px] h-[60px] bg-gray-300 rounded-lg" />
            <div className="flex-1">
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-2" />
              <div className="h-4 w-1/4 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};