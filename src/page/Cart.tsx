import { Header } from "@/components/Header";
import { List } from "@/components/cart/List";
import { TabbleBanner } from "@/components/cart/TableBanner";
import React from "react";

const Cart = () => {
  return (
    <div className="w-[90vw] max-w-sm  flex flex-col gap-5 ">
      <Header name="Cart" />
      <TabbleBanner />
      <List />
    </div>
  );
};
export default Cart;
