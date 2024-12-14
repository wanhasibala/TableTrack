import { Square } from "lucide-react";
import { Card } from "../order/CardList";
import React, { useEffect, useState } from "react";
import { supabase } from "@/db/supabaseClient";
import { Footer } from "../Footer";

interface Item {
  id: string;
  name: string;
  price: number;
  count: number;
  description: string;
}
export const List = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase.from("menu_item").select("*");
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        const itemsWithCount = (data || []).map((item) => ({
          ...item,
          count: 0,
        }));
        setItems(itemsWithCount);
      }
    }
    fetchOrders();
  }, []);

  const handleItemCountChange = (id: string, newCount: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: newCount } : item,
      ),
    );
  };
  const totalItems = items.reduce((total, item) => total + item.count, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );
  return (
    <>
      <div className="flex items-center gap-2 border-b border-b-slate-200 pb-1">
        <Square size={14} className="text-[#E5E7EB]" />
        <p className="large text-slate-600"> Selected Menu</p>
      </div>
      {items.map((item) => (
        <div className="flex gap-2 w-full  items-center ">
          <Square className="text-slate-200" />
          <div className="w-full">
            <Card
              item={item}
              key={item.id}
              MenuDetailDialog={false}
              onItemCountChange={handleItemCountChange}
            />
          </div>
        </div>
      ))}
      {totalItems > 0 && (
        <Footer
          totalItems={totalItems}
          totalPrice={totalPrice}
          variant="order"
          link="/checkout"
          text="Order"
        />
      )}
    </>
  );
};
