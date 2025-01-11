import React, { useEffect, useState } from "react";
import { supabase } from "@/db/supabaseClient";
import { useNavigate, useParams } from "react-router";

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
  const navigate = useNavigate();

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
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.menu_item.price || 0) * item.quantity,
    0,
  );
  async function updateOrderItemWithoutMenu(
    cartItems: { id: string; quantity: number; customization: string }[],
    order: Order,
  ) {
    if (!order.customer_name || !order.id_table)
      toast.error("Silahkan isi informasi diri terlebih dahulu", {
        position: "top-center",
      });
    try {
      cartItems.map(async ({ menu_item, ...item }) => {
        const { error } = await supabase
          .from("order_item")
          .update(item)
          .eq("id", item.id);
        if (error) console.error(error);
      });
      supabase.from("order").update({ total_price: totalPrice });

      console.log(cartItems);
      navigate(`/checkout/${params.orderId}`);
    } catch (error) {
      console.error("Error updating order items:", error);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-5">
      <Header name="Cart" href={`/menu/order/${params.orderId}`} />
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
          updateOrderItemWithoutMenu(cartItems, order);
        }}
      />
    </div>
  );
};

export default Cart;
