import { ItemsCheckout } from "@/components/checkout/ItemsCheckout";
import { Total } from "@/components/checkout/Total";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import React from "react";

const Checkout = () => {
  return (
    <div className="w-[90vw] max-w-sm   flex flex-col gap-5 ">
      {/* <Header name="Checkout" /> */}
      <ItemsCheckout />
      <Total />
      {/* <Footer */}
      {/*   totalItems={1} */}
      {/*   totalPrice={0} */}
      {/*   variant="full" */}
      {/*   text="Next" */}
      {/*   link="/payment" */}
      {/* /> */}
    </div>
  );
};
export default Checkout;
