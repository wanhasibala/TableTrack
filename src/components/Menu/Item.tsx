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

type MenuItem = Database["public"]["Tables"]["menu_item"]["Row"];
type OrderItem = {
  id: string;
  quantity: number;
  menu_item: MenuItem;
};

const table = supabaseQuery("menu_item");

export const Items = () => {
  const [items, setItems] = useState<
    (MenuItem & { quantity: number; menu_image: string })[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ orderId?: string; tableId?: string }>();
  const navigate = useNavigate();

  const isOrderPage = !!params.orderId;
  const id_client = "a748404f-a2cc-49a4-861c-371e9fe04974";
  useEffect(() => {
    async function fetchItems() {
      try {
        let fetchedItems: any[] = [];

        if (isOrderPage) {
          // Fetch items associated with the order
          const { data, error } = await table.select("*", id_client);
          if (error) throw error;

          fetchedItems = await Promise.all(
            //@ts-ignore
            data.map(async (orderItem: OrderItem) => {
              const { data: imageUrlData } = supabase.storage
                .from("menu") // Replace with your storage bucket name
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
        } else {
          // Fetch all menu items
          const { data, error } = await supabase.from("menu_item").select("*");
          if (error) throw error;

          fetchedItems = await Promise.all(
            data.map(async (item: MenuItem) => {
              const { data: imageUrlData } = supabase.storage
                .from("menu") // Replace with your storage bucket name
                .getPublicUrl(item.menu_image || "");

              return {
                ...item,
                quantity: 0,
                menu_image: imageUrlData?.publicUrl || "/placeholder-image.jpg",
              };
            }),
          );
        }

        setItems(fetchedItems);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch items");
      }
    }

    fetchItems();
  }, [isOrderPage, params]);

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

    if (isOrderPage) {
      try {
        const updates = selectedItems.map(async (item) => {
          const { error } = await supabase
            .from("order_item")
            .update({
              quantity: item.quantity,
            })
            .eq("order_id", params.orderId)
            .eq("item_id", item.id);

          if (error) throw error;
        });

        await Promise.all(updates);
        toast("Order updated successfully!", { position: "top-center" });
        navigate(`/checkout/${params.orderId}`);
      } catch (err) {
        console.error("Error updating order:", err);
        toast("Failed to update order.", { position: "top-center" });
      }
    } else {
      try {
        const data = {
          id_table: params.tableId,
          order_status: "",
        };

        const order = await postOrder(data, "order");

        const selectedItemIds = selectedItems.map((item) => ({
          menu_item: item.id,
          quantity: item.quantity,
          order_id: order[0].id,
        }));

        await postOrder(selectedItemIds, "order_item");

        navigate(`/cart/${order[0].id}`);
      } catch (err) {
        console.error("Error creating order:", err);
        toast("Failed to create order.", { position: "top-center" });
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="large">
            {isOrderPage ? "Order Details" : "Popular Items"}
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
              // MenuDetailDialog={true}
            />
          ))}
        </div>
      </div>
      {totalItems > 0 && (
        <Footer
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClick={handleOrderClick}
          text={isOrderPage ? "Update Order" : "Order Now"}
        />
      )}
    </>
  );
};
