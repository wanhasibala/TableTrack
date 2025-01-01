import { supabase } from "@/db/supabaseClient";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface Category {
  id: string;
  created_at: string;
  name: string;
  id_client: string;
}

export const Category = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("id_client", params.client_name);
      if (error) {
        console.error(error);
      } else {
        data.push({
          name: "All Item",
          id: "1",
          created_at: "sdkflj",
          id_client: null,
        });
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
              onClick={() => navigate(`/category/${item.id}`)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
