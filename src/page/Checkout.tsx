import { ItemsCheckout } from "@/components/checkout/ItemsCheckout";
import { Method } from "@/components/checkout/Method";
import { Total } from "@/components/checkout/Total";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const Checkout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { selectedMethod } = usePaymentMethods();

  const handleNext = () => {
    if (!selectedMethod) {
      // Show error toast or alert that payment method is required
      return;
    }

    navigate(`/payment/${params.orderId}?method=${selectedMethod}`);
  };

  return (
    <div className="w-[90vw] max-w-sm flex flex-col gap-5">
      <Header name="Checkout" />
      <ItemsCheckout />
      <Method />
    </div>
  );
};

export default Checkout;
