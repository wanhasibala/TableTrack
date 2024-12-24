import { supabase } from "@/db/supabaseClient";
import { Clipboard, ClipboardList } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

interface OrderMenu {
  id: string;
  order: {
    customer_name: string;
    table: { table_name: string };
    phone_number: number;
  };
}

export const Receipt = () => {
  const [items, setItems] = useState<OrderMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.orderId?.slice(0, 8);
  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("order_item")
        .select("*, order(*,table(*)), menu_item(*)")
        .eq("order_id", params.orderId);
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setItems(data);
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);
  // console.log(items);
  return (
    <div className="p-2.5 w-full flex flex-col gap-5">
      <div className="flex items-start justify-start  gap-2 ">
        <ClipboardList />
        <p className="large">
          Order ID <span className="text-primary">#{id}</span>
        </p>
      </div>
      {!loading && (
        <div className="p-2 border border-slate-200 rounded grid grid-cols-2 gap-[10px] w-full">
          <div className="font-medium ">
            <p className="text-slate-500">Name</p>
            <p>{items[0].order.customer_name}</p>
          </div>
          <div className="font-medium ">
            <p className="text-slate-500">Table no</p>
            <p>{items[0].order.table.table_name}</p>
          </div>
          <div className="font-medium ">
            <p className="text-slate-500">Phone Number</p>
            <p>{items[0].order.phone_number}</p>
          </div>
          <div className="font-medium ">
            <p className="text-slate-500">Total Items</p>
            <p>{items.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};
