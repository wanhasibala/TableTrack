import { Header } from "@/components/Header";
import { Card } from "@/components/Staff/ListActiveOrder.tsx/Card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/db/supabaseClient";
import { OrderWithRelations } from "@/types/supabase";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export const ListActiveOrder = () => {
  const params = useParams();
  const [order, setOrder] = useState<OrderWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  //@ts-ignore
  const user = localStorage.getItem("id_client");


  const date = new Date();

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Full name of the day (e.g., "Tuesday")
    day: "2-digit", // Day of the month (2 digits)
    month: "short", // Short name of the month (e.g., "Dec")
    year: "numeric", // Full numeric year (e.g., "2024")
  };

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!params.status || !user) return;

      const orderStatus =
        params.status === "Active"
          ? ["Active", "Not Paid", "In Progress", "Closed"]
          : [params.status];

      const { data, error } = await supabase
        .from("order")
        .select("*, table(*), order_item(*)")
        .in("order_status", orderStatus)
        .eq("id_client", user);

      if (error) {
        console.error(error);
        return;
      }
      
      setOrder(data || []);
      setLoading(false);
    };
    fetchOrder();
  }, [params.status, user]);
  return (
    <div className="flex gap-5 flex-col">
      <Header href="/dashboard" name={`${params.status} Order`} />
      <Button variant={"outline"} className="mt-5 self-start">
        <Calendar />
        <p>{formattedDate} </p>
      </Button>

      <h3 className="py-2 border-b">{params.status} Order</h3>
      {order.map((item) => (
        <div key={item.id}>
          <Card item={item}/>
        </div>
      ))}
    </div>
  );
};
