import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "./CardList";
import { Footer } from "../Footer";
import { supabase } from "@/db/supabaseClient";
import { useNavigate, useParams } from "react-router";
import { postOrder } from "@/db/queries/postOrder";

interface Item {
  id: string;
  name: string;
  price: number;
  count: number;
  description: string;
}

export const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);

  const isOrderPage = !!params.orderId; // Determine if it's the order page
  const idKey = isOrderPage ? "orderId" : "tableId";

  useEffect(() => {
    async function fetchItems() {
      try {
        let fetchedItems = [];

        if (isOrderPage) {
          // Fetch items associated with the order
          const { data, error } = await supabase
            .from("order_item")
            .select("*, menu_item(*)")
            .eq("order_id", params.orderId);

          if (error) throw error;

          fetchedItems = data.map((orderItem) => ({
            id: orderItem.menu_item.id,
            name: orderItem.menu_item.name,
            price: orderItem.menu_item.price,
            count: orderItem.quantity,
            description: orderItem.menu_item.description,
          }));
        } else {
          // Fetch all menu items
          const { data, error } = await supabase.from("menu_item").select("*");
          if (error) throw error;

          fetchedItems = data.map((item) => ({
            ...item,
            count: 0,
          }));
        }

        setItems(fetchedItems);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch items");
      }
    }

    fetchItems();
  }, [isOrderPage, params]);

  const handleItemCountChange = (id: string, newCount: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: newCount } : item,
      ),
    );
  };

  const totalItems = items.reduce((total, item) => total + item.count, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  const handleOrderClick = async () => {
    try {
      if (!isOrderPage) {
        // Handle creating a new order
        const selectedItems = items.filter((item) => item.count > 0);

        const newOrderData = {
          id_table: params.tableId,
          order_status: "pending",
        };

        const order = await postOrder(newOrderData, "order");

        const selectedItemData = selectedItems.map((item) => ({
          item_id: item.id,
          quantity: item.count,
          //@ts-ignore
          order_id: order[0].id,
        }));

        await postOrder(selectedItemData, "order_item");

        //@ts-ignore
        navigate(`/cart/${order[0].id}`);
      } else {
        // Handle updating an existing order (optional)
        alert("Update order logic not implemented yet!");
      }
    } catch (err) {
      console.error("Order submission failed:", err);
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
              item={item}
              key={item.id}
              onItemCountChange={handleItemCountChange}
              MenuDetailDialog={true}
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
