import { supabase } from "@/db/supabaseClient";
import { postOrder } from "@/db/queries/postOrder";
import { toast } from "sonner";
import { data, useNavigate } from "react-router";

export function useHandleOrder(params: any, items: any[]) {
  const navigate = useNavigate();

  const handleOrderClick = async () => {
    const selectedItems = items.filter((item) => item.quantity > 0);
    const { data: tableData } = await supabase
      .from("table")
      .select("id_client")
      .eq("id", params.tableId)
      .single();

    try {
      if (params.orderId) {
        // Update existing order
        await Promise.all(
          selectedItems.map(async (item) => {
            const { error } = await supabase
              .from("order_item")
              .update({ quantity: item.quantity })
              .eq("order_id", params.orderId)
              .eq("item_id", item.id);

            if (error) throw error;
          }),
        );
        toast("Order updated successfully!", { position: "top-center" });
        navigate(`/checkout/${params.orderId}`);
      } else if (params.tableId) {
        // Create a new order for the table
        const data = await postOrder(
          {
            id_table: params.tableId,
            order_status: "",
            id_client: tableData?.id_client,
          },
          "order",
        );

        //
        const orderItems = selectedItems.map((item) => ({
          menu_item: item.id,
          quantity: item.quantity,
          order_id: data[0].id,
          id_client: tableData?.id_client,
        }));

        await postOrder(orderItems, "order_item");
        navigate(`/cart/${data[0].id}`);
      } else {
        toast("No action available.", { position: "top-center" });
      }
    } catch (err) {
      console.error("Error processing order:", err);
      toast("Failed to process order.", { position: "top-center" });
    }
  };

  return { handleOrderClick };
}
