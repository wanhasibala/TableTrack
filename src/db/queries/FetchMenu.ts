import { Database } from "@/types/supabase";
import { supabase } from "../supabaseClient";

type OrderItem = Database["public"]["Tables"]["order_item"]["Row"];

export async function fetchItems(params: any) {
  try {
    let fetchedItems: any[] = [];

    if (params.orderId) {
      // Fetch items associated with an order
      const { data, error } = await supabase
        .from("order_item")
        .select("*, menu_item(*)")
        .eq("order_id", params.orderId);

      if (error) throw error;

      fetchedItems = await Promise.all(
        data.map(async (orderItem: OrderItem) => {
          const { data: imageUrlData } = supabase.storage
            .from("menu")
            .getPublicUrl(orderItem.menu_item.menu_image || "");

          return {
            id: orderItem.menu_item.id,
            name: orderItem.menu_item.name,
            price: orderItem.menu_item.price,
            quantity: orderItem.quantity,
            description: orderItem.menu_item.description,
            menu_image: imageUrlData?.publicUrl || "/placeholder-image.jpg",
          };
        }),
      );
    } else if (isTablePage) {
      // Fetch menu items for the table
      const { data, error } = await supabase.from("menu_item").select("*");
      if (error) throw error;

      fetchedItems = await Promise.all(
        data.map(async (item: MenuItem) => {
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
    } else if (isClientPage) {
      // Fetch categories for the client
      const { data, error } = await supabase
        .from("client")
        .select("*, menu_item(*)")
        .eq("client_name", params.client_name);

      if (error) throw error;
      console.log(data);
      fetchedItems = data.flatMap((client) =>
        client.menu_item.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          quantity: 0,
          description: null,
          menu_image: cat.menu_image
            ? `https://dncrdmxpzacwnydmltht.supabase.co/storage/v1/object/public/menu/${cat.menu_image}`
            : "/placeholder-image.jpg",
        })),
      );
    }

    return fetchedItems;
  } catch (err) {
    console.error(err);
    return err;
  }
}
