import React from "react";
import { Status } from "@/components/PaymentStatus/Head";
import { Receipt } from "@/components/PaymentStatus/Receipt";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { useNavigate, useParams } from "react-router";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="h-full flex flex-col pt-10 gap-5">
      <Status />
      <Receipt />
      <Button
        variant="outline"
        className="mx-5"
        onClick={() => navigate(`/track-order/${params.orderId}`)}
      >
        Track Order
      </Button>
      <Footer
        variant="full"
        text="Order Again"
        onClick={() => navigate("/menu/")}
      />
    </div>
  );
};
export default PaymentStatus;
