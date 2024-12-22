import { Header } from "@/components/Header";
import { List } from "@/components/cart/List";
import { TabbleBanner } from "@/components/cart/TableBanner";
import store from "@/components/state/store";

import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "@/db/supabaseClient";
import { data, useParams } from "react-router";

interface Item {
  id: string;
  customer_name: string;
  price: number;
  count: number;
  description: string;
  table: {
    table_name: string;
  };
}
const Cart = () => {
  const [items, setItems] = useState<Item[]>();
  const params = useParams();

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("order_item")
        .select("*, order(*,table(*)), menu_item(*)")
        .eq("order_id", params.orderId); // Replace with actual order ID
      if (error) {
        console.error(error);
      } else {
        const itemsWithCount = (data || []).map((item) => ({
          ...item.menu_item,
          count: item.quantity,
        }));
        setItems(itemsWithCount);
      }
    }
    fetchOrders();
  }, []);

  const handleDelete = (idsToDelete: string[]) => {
    setItems((prevItems) =>
      prevItems?.filter((item) => !idsToDelete.includes(item.id)),
    );
    // Perform database deletion here if needed
  };

  return (
    <Provider store={store}>
      <div className="flex flex-col gap-5 ">
        <Header name="Cart" />
        <TabbleBanner />
        <List />
      </div>
    </Provider>
  );
};
export default Cart;
