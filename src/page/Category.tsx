import React, { useEffect, useState } from "react";
import { getOrderClient } from "../db/queries/getOrderClient.ts";
import { Database } from "@/types/supabase.ts";
import supabaseQuery from "@/db/queries/supabaseQuery.ts";
import { useParams } from "react-router";
import { supabase } from "@/db/supabaseClient.ts";
import { Header } from "@/components/Header.tsx";
import { error } from "console";
import { ItemsCategory } from "@/components/Category/ItemsCategory.tsx";

type Category = Database["public"]["Tables"]["category"]["Row"];
type MenuItem = Database["public"]["Tables"]["menu_item"]["Row"];

export const Category = () => {
  const [loading, setLoading] = useState(true);
  const [menuItem, setMenuItem] = useState<MenuItem[]>([]);
  const params = useParams();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (params.categoryId !== "all") {
          const { data, error } = await supabase
            .from("menu_item")
            .select("*, category(*)")
            .eq("category_id", params.categoryId);

          setMenuItem(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, []);
  let header = "";
  if (!loading && params.categoryId !== "all" && menuItem.length > 0) {
    console.log("halo");
    header = menuItem[0].category.name;
  }
  if (params.categoryId === "all") {
    header = "All";
  }

  return (
    <div className="">
      {menuItem.length > 0 && <Header name={header} href={-1} />}
      <div className="mt-5">
        <ItemsCategory />
      </div>
    </div>
  );
};
