import { supabase } from "@/db/supabaseClient";
import { Database } from "@/types/supabase";
import { MenuItem } from "@/components/Menu/ItemLoader";

type Order = Database["public"]["Tables"]["order"]["Row"];
type OrderItem = Database["public"]["Tables"]["order_item"]["Row"];

export const orderService = {
  async updateExistingOrder(orderId: string, selectedItems: MenuItem[]) {
    await Promise.all(
      selectedItems.map(async (item) => {
        const { data: existingItem } = await supabase
          .from("order_item")
          .select("*")
          .eq("order_id", orderId)
          .eq("menu_item", item.id)
          .single();

        if (!existingItem) {
          await supabase.from("order_item").insert({
            quantity: item.quantity,
            menu_item: item.id,
            order_id: orderId,
            id_client: item.id_client,
          });
        }

        const { error } = await supabase
          .from("order_item")
          .update({ quantity: item.quantity })
          .eq("order_id", orderId)
          .eq("menu_item", item.id);

        if (error) throw error;
      })
    );
  },

  async createTableOrder(tableId: string, selectedItems: MenuItem[]) {
    const { data: order, error: orderError } = await supabase
      .from("order")
      .insert({
        id_table: tableId,
        order_status: "Not Paid",
        order_date: new Date().toISOString(),
        id_client: selectedItems[0].id_client,
      })
      .select("*")
      .single();

    if (orderError) throw orderError;
    if (!order?.id) throw new Error("Failed to create order");

    const orderItems = selectedItems.map((item) => ({
      menu_item: item.id,
      quantity: item.quantity,
      order_id: order.id,
      id_client: item.id_client,
    }));

    const { error: itemsError } = await supabase
      .from("order_item")
      .insert(orderItems);

    if (itemsError) throw itemsError;
    return order;
  },

  async createClientOrder(clientName: string, selectedItems: MenuItem[]) {
    const { data: client } = await supabase
      .from("client")
      .select("id")
      .eq("client_name", clientName)
      .single();

    const { data: order, error: orderError } = await supabase
      .from("order")
      .insert({
        id_client: client?.id,
        order_status: "Not Paid",
        order_date: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (orderError) throw orderError;
    if (!order?.id) throw new Error("Failed to create order");

    const orderItems = selectedItems.map((item) => ({
      menu_item: item.id,
      quantity: item.quantity,
      order_id: order.id,
      id_client: client?.id,
    }));

    const { error: itemsError } = await supabase
      .from("order_item")
      .insert(orderItems);

    if (itemsError) throw itemsError;
    return order;
  },
};
