import { CardOrderGrid } from "@/components/Staff/Dashboard/CardOrderGrid";
import { HeaderStaff } from "@/components/Staff/Dashboard/HeaderStaff";
import { OrderAnalytic } from "@/components/Staff/Dashboard/OrderAnalytics";
import { Button } from "@/components/ui/button";
import React from "react";

export const Dashboard = () => {
  return (
    <div className="relative h-full ">
      <HeaderStaff />
      <CardOrderGrid />
      <OrderAnalytic />
      <Button className="absolute bottom-20 right-5">Create Order</Button>
    </div>
  );
};
