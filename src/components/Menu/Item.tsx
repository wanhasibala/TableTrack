import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "./CardList";
import { Footer } from "../Footer";
import { supabase } from "@/db/supabaseClient";
import { useNavigate, useParams, Params } from "react-router";
import { postOrder } from "@/db/queries/postOrder";
import { toast } from "sonner";
import { Database } from "@/types/supabase";
import supabaseQuery from "@/db/queries/supabaseQuery";
import { useItemsLoader } from "./ItemLoader";

import type { MenuItem } from './ItemLoader';

type OrderResponse = {
  id: string;
  id_table?: string;
  id_client?: string;
  status?: string;
  order_date?: Date;
}[];

type OrderItem = {
  id: string;
  quantity: number;
  menu_item: MenuItem;
};

interface RouteParams extends Params {
  orderId?: string;
  tableId?: string;
  client_name?: string;
}

export const Items = () => {
  const params = useParams<RouteParams>();
  const navigate = useNavigate();

  const { items, loading, error, setItems } = useItemsLoader(params);
  // Determine the active condition
  const orderId = params.orderId;
  const isOrderPage = Boolean(orderId);
  const isTablePage = Boolean(params.tableId);

  const handleItemCountChange = (id: string, newQuantity: number) => {
    setItems((prevItems: MenuItem[]) =>
      prevItems.map((item: MenuItem) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = items.reduce((total: number, item: MenuItem) => total + (item.quantity || 0), 0);
  const totalPrice = items.reduce(
    (total: number, item: MenuItem) => total + ((item.price || 0) * (item.quantity || 0)),
    0
  );

  const handleOrderClick = async () => {
    const selectedItems = items.filter((item: MenuItem) => item.quantity > 0);

    try {
      if (isOrderPage && orderId) {
        // Update existing order
        const currentOrderId = orderId; // Store validated orderId
        await Promise.all(
          selectedItems.map(async (item: MenuItem) => {
            const { data: existingItem, error: checkError } = await supabase
              .from("order_item")
              .select("*")
              .eq("order_id", currentOrderId)
              .eq("menu_item", item.id)
              .single();
            if (!existingItem) {
              const { error } = await supabase.from("order_item").insert({
                quantity: item.quantity,
                menu_item: item.id,
                order_id: currentOrderId,
                id_client: item.id_client,
              });
            }
            const { error } = await supabase
              .from("order_item")
              .update({ quantity: item.quantity })
              .eq("order_id", currentOrderId)
              .eq("menu_item", item.id);

            if (error) throw error;
          })
        );
        toast("Order updated successfully!", { position: "top-center" });
        navigate(`/cart/${currentOrderId}`);
      } else if (isTablePage && params.tableId) {
        // Create new order for a table
        const { data: order } = await postOrder(
          { id_table: params.tableId, order_status: "" },
          "order"
        ) as { data: OrderResponse };

        if (!order?.[0]) throw new Error("Failed to create order");

        const orderItems = selectedItems.map((item: MenuItem) => ({
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
        const { data: order } = await postOrder(
          {
            id_client: client?.id,
            status: "Not Paid",
            order_date: new Date(),
          },
          "order"
        ) as { data: OrderResponse };
        const orderItems = selectedItems.map((item: MenuItem) => ({
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

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="w-full h-24 bg-gray-200 rounded-lg animate-pulse">
            <div className="flex gap-2 p-4">
              <div className="w-[60px] h-[60px] bg-gray-300 rounded-lg" />
              <div className="flex-1">
                <div className="h-4 w-1/3 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-1/4 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">Failed to load menu items. Please try again.</p>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="large">
            {isOrderPage ? "Edit Order" : isTablePage ? "Menu Items" : "Menu"}
          </p>
          {!isOrderPage && (
            <Button
              className="text-xs hover:border-none"
              variant={"link"}
              onClick={() => navigate("/category/all")}
            >
              View all
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {items.map((item: MenuItem, index: number) => (
            <div
              key={item.id}
              className="animate-fadeIn"
              style={{
                animationDelay: `${Math.min(index * 100, 1000)}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <Card
                quantity={item.quantity}
                item={item}
                onItemCountChange={handleItemCountChange}
              />
            </div>
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
