import React, { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import { supabase } from "@/db/supabaseClient";
import { useParams } from "react-router";
import { Database } from "@/types/supabase";
import { toast } from "sonner";

type Order = Database["public"]["Tables"]["order"]["Row"];

export const CardProgress = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const params = useParams();
  const orderId = params.orderId; // Replace with the order ID you are tracking

  useEffect(() => {
    // Fetch initial order data
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("order")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
      } else {
        setOrder(data);
      }
    };

    fetchOrder();
    // Subscribe to real-time updates for the specific order
    const channel = supabase
      .channel("realtime:order")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "order",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          //@ts-ignore
          setOrder(payload.new);
        },
      )
      .subscribe();

    // Cleanup the subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
    // Subscribe to real-time updates for the specific order
  }, [orderId]);

  return (
    <div className="w-full flex flex-col gap-5 p-5 bg-secondary rounded-[10px] text-white">
      <h3>Order Received</h3>
      <ProgressBar status={order?.order_status || ""} />
      <p>We will inform you when the order is ready</p>
    </div>
  );
};
