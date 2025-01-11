import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Receipt } from "@/components/PaymentStatus/Receipt";
import { CardProgress } from "@/components/TrackOrder/CardProgress";
import { supabase } from "@/db/supabaseClient";
import React, { useEffect } from "react";
import { data, useNavigate, useParams } from "react-router";

export const TrackOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  let client_name = "";
  useEffect(() => {
    const fetchParams = async () => {
      try {
        const { data, error } = await supabase
          .from("client")
          .select("id,client_name, order(*)")
          .filter("order.id", "eq", params.orderId)
          .single();

        client_name = data?.client_name || "";
        console.log(client_name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParams();
  }, []);
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
        onClick={() => navigate(`/${client_name}`)}
      />
    </>
  );
};
