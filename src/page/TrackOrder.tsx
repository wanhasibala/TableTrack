import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Receipt } from "@/components/PaymentStatus/Receipt";
import { CardProgress } from "@/components/TrackOrder/CardProgress";
import React from "react";
import { useNavigate } from "react-router";

export const TrackOrder = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header name="Track Order" />
      <div className="mt-5 flex flex-col gap-5">
        <CardProgress />
        <Receipt />
      </div>
      <Footer
        text="Order Again"
        variant="full"
        onClick={() => navigate("/menu/")}
      />
    </>
  );
};
