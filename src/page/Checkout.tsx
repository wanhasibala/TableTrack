import { ItemsCheckout } from "@/components/checkout/ItemsCheckout";
import { Total } from "@/components/checkout/Total";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { supabase } from "@/db/supabaseClient";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Checkout = () => {
  return (
    <div className="w-[90vw] max-w-sm   flex flex-col gap-5 ">
      <Header name="Checkout" />
      <ItemsCheckout />
    </div>
  );
};
export default Checkout;
