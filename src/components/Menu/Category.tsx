import { supabase } from "@/db/supabaseClient";
import { Database } from "@/types/supabase";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

type Category = Database["public"]["Tables"]["category"]["Row"];

export const Category = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    let newData: Category[] = [];
    async function fetchOrders() {
      if (params.tableId) {
        const { data: tableData, error: tableError } = await supabase
          .from("table")
          .select("id_client")
          .eq("id", params.tableId)
          .single();
        const { data, error } = await supabase
          .from("category")
          .select("*")
          .eq("id_client", tableData?.id_client);
        if (error) {
          console.error(error);
        }

        // newData = data?.category || [];
      } else if (params.order) {
      } else if (params.client_name) {
        const { data, error } = await supabase
          .from("client")
          .select("*, category(*)")
          .eq("client_name", params.client_name)
          .single();
        if (error) {
          console.error(error);
        }
        newData = data?.category || [];
      }
      newData.push({
        name: "All Item",
        id: "1",
        created_at: "sdkflj",
        id_client: null,
      });
      setCategory(newData);
      setLoading(false);
    }
    fetchOrders();
  }, []);
  return (
    <div>
      <p className="large mb-2.5"> Category</p>
      <div className=" grid grid-cols-4 gap-2.5">
        {!loading && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};
