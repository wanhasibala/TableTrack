import React, { useEffect, useState } from "react";
import { Button } from "../ui/button.tsx";
import { Card } from "../Menu/CardList.tsx";
import { Footer } from "../Footer.tsx";
import { supabase } from "@/db/supabaseClient";
import { useNavigate, useParams } from "react-router";
import { postOrder } from "@/db/queries/postOrder";
import { toast } from "sonner";
import { Database } from "@/types/supabase";
import supabaseQuery from "@/db/queries/supabaseQuery";
import { useItemsLoader } from "../Menu/ItemLoader.ts";

type MenuItem = Database["public"]["Tables"]["menu_item"]["Row"];
type OrderItem = {
  id: string;
  quantity: number;
  menu_item: MenuItem;
};

export const ItemsCategory = () => {
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
      const { data: client, error } = await supabase
        .from("category")
        .select("id_client")
        .eq("id", params.categoryId)
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
        id_client: client?.id_client,
      }));
      await postOrder(orderItems, "order_item");
      localStorage.setItem("id_order", order[0].id);
      const getlocalStorage = localStorage.getItem("id_order");
      console.log(getlocalStorage);
      toast.success("Order has been submitted", { position: "top-center" });
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
