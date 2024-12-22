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
  useState<string | null>(null);
  const params = useParams();
  const handleItemCountChange = (id: string, newCount: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: newCount } : item,
      ),
    );
  };
  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase.from("menu_item").select("*");
      if (error) {
        console.error(error);
      } else {
        const itemsWithCount = (data || []).map((item) => ({
          ...item,
          count: 0,
        }));
        setItems(itemsWithCount);
      }
    }
    fetchOrders();
  }, []);

  const data = {
    id_table: params.tableId,
    order_status: "",
  };

  const totalItems = items.reduce((total, item) => total + item.count, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );
  const handleOrderClick = async () => {
    // Get selected items
    const selectedItems = items.filter((item) => item.count > 0);

    // Post the order and navigate
    const order = await postOrder(data, "order");
    const selectedItemIds = selectedItems.map((item) => ({
      item_id: item.id,
      quantity: item.count,
      //@ts-ignore
      order_id: order[0].id,
    }));
    const menu_order = await postOrder(
      selectedItemIds.map((item) => item),
      "order_item",
    );

    // Navigate to the cart page with the order ID
    //@ts-ignore
    navigate(`/cart/${order[0].id}`);
  };
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="large">Popular Items</p>
          <Button className="text-xs hover:border-none" variant={"link"}>
            View all
          </Button>
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
          text="Order Now"
        />
      )}
    </>
  );
};
