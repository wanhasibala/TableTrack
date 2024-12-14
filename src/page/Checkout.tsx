import { Header } from "@/components/Header";
import React from "react";

const Checkout = () => {
  return (
    <div className="w-[90vw] max-w-sm  flex flex-col gap-5 ">
      <Header name="Checkout" />
      <List />
    </div>
  );
};
export default Checkout;
