import React, { useEffect, useState } from "react";
import { getOrderClient } from "../db/queries/getOrderClient.ts";
import { Database } from "@/types/supabase.ts";
import supabaseQuery from "@/db/queries/supabaseQuery.ts";
import { useParams } from "react-router";

type Category = Database["public"]["Tables"]["category"]["Row"];
const table = supabaseQuery("category");

export const Category = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const params = useParams();
  useEffect(() => {
    const getOrder = async () => {
      //@ts-ignore

      setCategory(data);
    };
    getOrder();
  }, []);

  return (
    <div className="text-white">
      {category.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
};
