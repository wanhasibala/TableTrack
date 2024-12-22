import React, { useEffect, useState } from "react";
import { getOrderClient } from "../db/queries/getOrderClient.ts";

interface Order {
  id_order: number;
  id_table: string;
  id_client: string;
  status: string;
  total_price: number;
  created_at: string;
  total_amount: number;
  // order_items: OrderItem[];
}

export const Category = () => {
  const [order, setOrder] = useState<Order[]>([]);
  useEffect(() => {
    const getOrder = async () => {
      //@ts-ignore
      setOrder(data);
    };
    getOrder();
  }, []);

  return (
    <div className="text-white">
      {order.map((item) => {
        return <div>{item.total_amount}</div>;
      })}
    </div>
  );
};
