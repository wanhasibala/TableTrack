import { supabase } from "@/db/supabaseClient";
import React, { useEffect, useState } from "react";

interface Category {
  id: string;
  created_at: string;
  name: string;
  id_client: string;
}

export const Category = () => {
  const [category, setCategory] = useState<Category[]>([]);
  // Calculate total count and price
  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase.from("category").select("*");
      if (error) {
        console.error(error);
      } else {
        data.push({ name: "All Item" });
        setCategory(data);
      }
    }
    fetchOrders();
  }, []);
  return (
    <div>
      <p className="large mb-2.5"> Category</p>
      <div className=" grid grid-cols-4 gap-2.5">
        {category.map((item) => {
          return (
            <div
              key={item.id}
              className="flex rounded-lg text-sm font-medium items-center justify-center bg-neutral-200 h-10"
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
