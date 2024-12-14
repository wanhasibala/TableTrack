import { Header } from "@/components/order/Header";
import { Search } from "@/components/order/Search";
import { Category } from "@/components/order/Category";
import { Items } from "@/components/order/Item";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/db/supabaseClient";
import { Banner } from "@/components/order/Banner";

interface Item {
  id: number;
  name: string;
  price: number;
  count: number;
  description: string;
}
export const Order = () => {
  const [items, setItems] = useState<Item[]>([]);
  // Calculate total count and price
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

  const totalItems = items.reduce((total, item) => total + item.count, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );
  return (
    <div className="w-[90vw] max-w-sm border-black flex flex-col gap-5 ">
      <Header />
      <Banner />
      <Search />
      <Category />
      <Items items={items} setItems={setItems} />
      {totalItems > 0 && (
        <Footer
          totalItems={totalItems}
          totalPrice={totalPrice}
          link="/cart"
          text="Order Now"
        />
      )}
    </div>
  );
};
