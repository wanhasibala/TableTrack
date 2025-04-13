import { postOrder } from "@/db/queries/postOrder";
import { supabase } from "@/db/supabaseClient";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export const handleOrderClick = async (items: any[]) => {
  const navigate = useNavigate();
  const params = useParams();
  const selectedItems = items.filter((item) => item.quantity > 0);
  console.log(selectedItems);

  try {
    if (params.orderId) {
      // Update existing order
      await Promise.all(
        selectedItems.map(async (item) => {
          const { error } = await supabase
            .from("order_item")
            .update({ quantity: item.quantity })
            .eq("order_id", params.orderId)
            .eq("menu_item", item.id);

          if (error) throw error;
        })
      );
      toast("Order updated successfully!", { position: "top-center" });
      navigate(`/checkout/${params.orderId}`);
    } else if (params.tableId) {
      // Create new order for a table
      const { data: order } = await postOrder({ order_status: "" }, "order");

      const orderItems = selectedItems.map((item) => ({
        menu_item: item.id,
        quantity: item.quantity,
        order_id: order[0].id,
      }));

      await postOrder(orderItems, "order_item");
      navigate(`/cart/${order[0].id}`);
    } else if (params.client_name) {
      // Create new order for a table
      const { data: order } = await postOrder(
        { id_table: params.tableId, order_status: "" },
        "order"
      );

      const orderItems = selectedItems.map((item) => ({
        menu_item: item.id,
        quantity: item.quantity,
        order_id: order[0].id,
      }));

      await postOrder(orderItems, "order_item");
      navigate(`/cart/${order[0].id}`);
    } else {
      toast("No action available.", { position: "top-center" });
    }
  } catch (err) {
    console.error("Error processing order:", err);
    toast("Failed to process order.", { position: "top-center" });
  }
};
