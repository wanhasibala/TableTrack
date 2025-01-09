import { useState, useEffect } from "react";
import { supabase } from "@/db/supabaseClient";
import { Database } from "@/types/supabase";

type MenuItem = Database["public"]["Tables"]["menu_item"]["Row"];

export function useItemsLoader(params: any) {
  const [items, setItems] = useState<
    (MenuItem & { quantity: number; menu_image: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        let fetchedItems: any[] = [];

        if (params.orderId) {
          // Load items for an order
          const { data, error } = await supabase
            .from("order_item")
            .select("*, menu_item(*)")
            .eq("order_id", params.orderId);

          if (error) throw error;

          fetchedItems = await Promise.all(
            data.map(async (orderItem) => {
              const { data: imageUrlData } = supabase.storage
                .from("menu")
                .getPublicUrl(orderItem.menu_item?.menu_image || "");

              return {
                id: orderItem.menu_item?.id,
                name: orderItem.menu_item?.name,
                price: orderItem.menu_item?.price,
                quantity: orderItem.quantity,
                description: orderItem.menu_item?.description,
                menu_image: imageUrlData?.publicUrl || "/placeholder-image.jpg",
              };
            }),
          );
        } else if (params.tableId) {
          // Load items for a table
          const { data: tableData } = await supabase
            .from("table")
            .select("id_client")
            .eq("id", params.tableId)
            .single();

          const { data, error } = await supabase
            .from("menu_item")
            .select("*")
            //@ts-ignore
            .eq("id_client", tableData?.id_client);

          if (error) throw error;

          fetchedItems = await Promise.all(
            data.map(async (item) => {
              const { data: imageUrlData } = supabase.storage
                .from("menu")
                .getPublicUrl(item.menu_image || "");

              return {
                ...item,
                quantity: 0,
                menu_image: imageUrlData?.publicUrl || "/placeholder-image.jpg",
              };
            }),
          );
        } else if (params.client_name) {
          const { data, error } = await supabase
            .from("client")
            .select("*, menu_item(*)")
            .eq("client_name", params.client_name)
            .single();

          if (error) throw error;

          fetchedItems = data.menu_item.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 0,
            description: item.description,
            menu_image: item.menu_image
              ? `https://dncrdmxpzacwnydmltht.supabase.co/storage/v1/object/public/menu/${item.menu_image}`
              : "/placeholder-image.jpg",
          }));
        }

        setItems(fetchedItems);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [params]);

  return { items, loading, error, setItems };
}
