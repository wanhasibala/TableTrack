import React, { useEffect, useState } from "react";
import { supabase } from "@/db/supabaseClient";
import { useParams } from "react-router";

import { Header } from "@/components/Header";
import { List } from "@/components/cart/List";
import { TabbleBanner } from "@/components/cart/TableBanner";
import { Footer } from "@/components/Footer";
import { Database } from "@/types/supabase";
import supabaseQuery from "@/db/queries/supabaseQuery";
import { toast } from "sonner";

type Item = Database["public"]["Tables"]["menu_item"]["Row"];
type Order = Database["public"]["Tables"]["order"]["Row"];

type OrderItem = {
  id: string;
  quantity: number;
  customization?: string;
  menu_item: Item;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function fetchCartItems() {
      const { data, error } = await supabase
        .from("order_item")
        .select("*, menu_item(*), order(*, table(*))")
        .eq("order_id", params.orderId); // Adjust column names if needed

      if (error) {
        console.error("Error fetching cart items:", error);
        return;
      }

      if (data) {
        const formattedItems = data.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          customization: item.customization || "",
          menu_item: item.menu_item,
        }));
        setOrder(data[0].order);
        setCartItems(formattedItems);
        setLoading(false);
      }
    }

    fetchCartItems();
  }, [params.orderId]);
  async function updateOrderItemWithoutMenu(
    cartItems: { id: string; quantity: number; customization: string }[],
  ) {
    try {
      cartItems.map(async ({ menu_item, ...item }) => {
        const { error } = await supabase
          .from("order_item")
          .update(item)
          .eq("id", item.id);
        if (error) console.error(error);
      });
    } catch (error) {
      console.error("Error updating order items:", error);
    }
  }

  if (loading) return <p>Loading...</p>;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.menu_item.price || 0) * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col gap-5">
      <Header name="Cart" />
      <TabbleBanner
        table={order?.id_table ? order?.table.table_name : ""} // Replace with dynamic data
        customer_name={order?.customer_name || ""} // Replace with dynamic data
      />
      <List items={cartItems} setItems={setCartItems} />
      <Footer
        totalItems={totalItems}
        totalPrice={totalPrice}
        text="Checkout"
        onClick={() => {
          updateOrderItemWithoutMenu(cartItems);
        }}
      />
    </div>
  );
};

export default Cart;
