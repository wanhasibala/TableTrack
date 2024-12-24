import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GenerateQR } from "@/components/Payment/GenerateQR";
import { TotalPayment } from "@/components/Payment/TotalPayment";
import { supabase } from "@/db/supabaseClient";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
interface Order {
  total_price: number;
  customer_name: string;
  id: string;
  phone_number: number;
}
const Payment = () => {
  const [items, setItems] = useState<Order[] | null>([]);
  const [error, setError] = useState("");
  const params = useParams();
  useEffect(() => {
    async function fetchItems() {
      try {
        // Fetch items associated with the order
        const { data, error } = await supabase
          .from("order")
          .select("*")
          .eq("id", params.orderId);

        if (error) throw error;
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch items");
      }
    }
    fetchItems();
  }, []);
  // console.log(items[0].total_price);
  const total_price = items && items[0]?.total_price;
  const idpayment = params?.orderId?.slice(0, 8);
  console.log(idpayment);

  return (
    <>
      <Header name="Payment" />
      <TotalPayment price={total_price || 0} id={idpayment || ""} />
      <GenerateQR />
      <Footer variant="full" text="Check Payment Status" onClick={() => {}} />
    </>
  );
};
export default Payment;
