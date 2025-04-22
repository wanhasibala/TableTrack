import { OrderWithRelations } from "@/types/supabase";
import React from "react";
import { useNavigate } from "react-router";

interface CardProps {
  item: OrderWithRelations;
}
export const Card = ({ item }: CardProps) => {
  const count = item.order_item.length;
  const navigate = useNavigate()

  return (
    <div className="flex border rounded-md p-2 gap-2 flex-col" onClick={()=> {navigate("/active-order/" + item.id)}}>
      
      {/* Header  */}
      <div className="flex w-full  justify-between text-sm relative">
        {item.table && (
          <div className="text-sm px-2 bg-slate-800 text-white rounded-full">
            {" "}
            Table {item.table.table_name}
          </div>
        )}
        <div className="absolute right-0 top-0">{item.order_status}</div>
      </div>
      <p className="text-lg ">{item.customer_name} </p>
      <p>{item.phone_number}</p>
      <div className="text-sm flex justify-between p-2 border rounded-md bg-slate-100">
        <div>notes: {item.notes}</div>
        <div>total item: {count}</div>
      </div>
    </div>
  );
};
