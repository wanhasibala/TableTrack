import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Bell, ShoppingCart } from "lucide-react";
import { error } from "console";
import { supabase } from "@/db/supabaseClient";

export const MenuHeader = () => {
  const [countCart, setCountCart] = useState(0);
  const [loading, setLoading] = useState(true);
  const id_order = localStorage.getItem("id_order");
  useEffect(() => {
    const countcart = async () => {
      try {
        const { data, error } = await supabase
          .from("order_item")
          .select("*, order(*)")
          .eq("order_id", id_order);
        setCountCart(data?.length || 0);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    countcart();
  }, []);
  return (
    <header className="flex justify-between items-center ">
      <div>
        <p className="subtle-medium">Welcome to</p>
        <h3 className="">Restaurant</h3>
      </div>
      <div className="flex gap-2 ">
        <Button variant={"outline"} className="rounded-full px-3 relative ">
          {!loading && (
            <div className="absolute text-[10px] w-4 h-4 rounded-full bg-secondary border flex text-white  items-center justify-center   -top-1 right-0  ">
              {countCart}
            </div>
          )}
          <ShoppingCart />
        </Button>
        <Button variant={"outline"} className="rounded-full px-3">
          <Bell />
        </Button>
      </div>
    </header>
  );
};
