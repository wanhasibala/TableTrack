import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "./CardList";
import { Footer } from "../Footer";
import { supabase } from "@/db/supabaseClient";
import { useNavigate, useParams } from "react-router";
import { postOrder } from "@/db/queries/postOrder";
import { toast } from "sonner";
import { Database } from "@/types/supabase";
import supabaseQuery from "@/db/queries/supabaseQuery";
import { useItemsLoader } from "./ItemLoader";

type MenuItem = Database["public"]["Tables"]["menu_item"]["Row"];
type OrderItem = {
  id: string;
  quantity: number;
  menu_item: MenuItem;
};

export const Items = () => {
  // const [items, setItems] = useState<
  //   (MenuItem & { quantity: number; menu_image: string })[]
  // >([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const { items, loading, error, setItems } = useItemsLoader(params);
  // Determine the active condition
  const isOrderPage = Boolean(params.orderId);
  const isTablePage = Boolean(params.tableId);

  const handleItemCountChange = (id: string, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleOrderClick = async () => {
    const selectedItems = items.filter((item) => item.quantity > 0);

    try {
      if (isOrderPage) {
        // Update existing order
        await Promise.all(
          selectedItems.map(async (item) => {
            const { data: existingItem, error: checkError } = await supabase
              .from("order_item")
              .select("*")
              .eq("order_id", params.orderId)
              .eq("menu_item", item.id)
              .single();
            if (!existingItem) {
              const { error } = await supabase.from("order_item").insert({
                quantity: item.quantity,
                menu_item: item.id,
                order_id: params.orderId,
                id_client: item.id_client,
              });
            }
            const { error } = await supabase
              .from("order_item")
              .update({ quantity: item.quantity })
              .eq("order_id", params.orderId)
              .eq("menu_item", item.id);

            if (error) throw error;
          }),
        );
        toast("Order updated successfully!", { position: "top-center" });
        navigate(`/cart/${params.orderId}`);
      } else if (isTablePage) {
        // Create new order for a table
        const { data: order } = await postOrder(
          { id_table: params.tableId, order_status: "" },
          "order",
        );

        const orderItems = selectedItems.map((item) => ({
          menu_item: item.id,
          quantity: item.quantity,
          order_id: order[0].id,
        }));

        await postOrder(orderItems, "order_item");
        navigate(`/cart/${order[0].id}`);
      } else if (params.client_name) {
        const { data: client, error } = await supabase
          .from("client")
          .select("id")
          .eq("client_name", params.client_name)
          .single();
        const order = await postOrder(
          {
            id_client: client?.id,
          },
          "order",
        );
        const orderItems = selectedItems.map((item) => ({
          menu_item: item.id,
          quantity: item.quantity,
          order_id: order[0].id,
          id_client: client?.id,
        }));
        await postOrder(orderItems, "order_item");
        navigate(`/cart/${order[0].id}`);
        toast.success("Order has been submitted", { position: "top-center" });
      } else {
        toast("No action available.", { position: "top-center" });
      }
    } catch (err) {
      console.error("Error processing order:", err);
      toast("Failed to process order.", { position: "top-center" });
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="large">
            {isOrderPage ? "Edit Order" : isTablePage ? "Menu Items" : "Menu"}
          </p>
          {!isOrderPage && (
            <Button className="text-xs hover:border-none" variant={"link"}>
              View all
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <Card
              quantity={item.quantity}
              item={item}
              key={item.id}
              onItemCountChange={handleItemCountChange}
            />
          ))}
        </div>
      </div>
      {totalItems > 0 && (
        <Footer
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClick={() => handleOrderClick()}
          text={isOrderPage ? "Update Order" : "Order Now"}
        />
      )}
    </>
  );
};
