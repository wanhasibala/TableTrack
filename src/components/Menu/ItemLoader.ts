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
          const { data: orderData, error: orderError } = await supabase
            .from("order")
            .select("id_client")
            .eq("id", params.orderId)
            .single();

          if (orderError) throw orderError;

          const { data: menuItems, error: menuError } = await supabase
            .from("menu_item")
            .select("*")
            .eq("id_client", orderData?.id_client);

          if (menuError) throw menuError;

          // Fetch items currently in the order
          const { data: orderItems, error: orderItemsError } = await supabase
            .from("order_item")
            .select("quantity, menu_item(*)")
            .eq("order_id", params.orderId);

          if (orderItemsError) throw orderItemsError;

          // Create a map of order items for easy lookup
          const orderItemsMap = new Map(
            orderItems.map((orderItem) => [orderItem.menu_item.id, orderItem]),
          );

          // Merge menu items with the quantities from the order
          fetchedItems = menuItems.map((menuItem) => {
            const orderItem = orderItemsMap.get(menuItem.id);
            return {
              id: menuItem.id,
              name: menuItem.name,
              quantity: orderItem?.quantity || 0, // Use order quantity if it exists
              description: menuItem.description || null,
              price: menuItem.price,
              menu_image: menuItem.menu_image
                ? `https://dncrdmxpzacwnydmltht.supabase.co/storage/v1/object/public/menu/${menuItem.menu_image}`
                : "/placeholder-image.jpg",
            };
          });
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
          // Load items by client name
          const { data, error } = await supabase
            .from("client")
            .select("*, menu_item(*)")
            .eq("client_name", params.client_name)
            .single();

          if (error) throw error;
          console.log(data);

          fetchedItems = data.menu_item.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: 0,
            description: null,
            price: item.price,
            menu_image: item.menu_image
              ? `https://dncrdmxpzacwnydmltht.supabase.co/storage/v1/object/public/menu/${item.menu_image}`
              : "/placeholder-image.jpg",
          }));
        }
        console.log(fetchedItems);

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
