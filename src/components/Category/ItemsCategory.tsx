import React, { useEffect, useState } from "react";
import { Button } from "../ui/button.tsx";
import { Card } from "../Menu/CardList.tsx";
import { Footer } from "../Footer.tsx";
import { supabase } from "@/db/supabaseClient";
import { useNavigate, useParams } from "react-router";
import { postOrder } from "@/db/queries/postOrder";
import { toast } from "sonner";
import { Database } from "@/types/supabase";
import { useItemsLoader } from "../Menu/ItemLoader.ts";

type MenuItem = Database["public"]["Tables"]["menu_item"]["Row"];
type OrderItem = {
  id: string;
  quantity: number;
  menu_item: MenuItem;
};

export const ItemsCategory = () => {
  const params = useParams();

  const { items, loading, error, setItems } = useItemsLoader(params);
  const navigate = useNavigate();

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
      toast.success("Order has been submitted", { position: "top-center" });
    } catch (err) {
      console.error("Error processing order:", err);
      toast("Failed to process order.", { position: "top-center" });
    }
  };

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center w-full h-full">
      <p>Loading...</p>{" "}
      {/* You can replace this with a spinner or any loading animation */}
    </div>
  );

  // Handle empty items and loading state
  if (loading) {
    return <Loader />;
  }

  if (items.length === 0) {
    toast.error("There is no items here", { position: "top-center" });
    return (
      <button
        className="flex justify-center items-center w-full h-[100vh]"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    );
  }
  const categories = Array.from(
    new Set(items.map((item) => item.category.name)),
  );
  return (
    <>
      <div className="mt-4 flex gap-8 flex-col">
        {categories.map((categoryName) => (
          <div className=" flex flex-col gap-2 " key={categoryName}>
            <h2 className="large">{categoryName}</h2>{" "}
            {/* Display the category name */}
            <div className="flex flex-col gap-2">
              {items
                .filter((item) => item.category.name === categoryName) // Filter items by category
                .map((item) => (
                  <Card
                    quantity={item.quantity}
                    item={item}
                    key={item.id}
                    onItemCountChange={handleItemCountChange}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      {totalItems > 0 && (
        <Footer
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClick={() => handleOrderClick()}
          text="Add to Cart"
        />
      )}
    </>
  );
};
