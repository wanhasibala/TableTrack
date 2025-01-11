import { supabase } from "@/db/supabaseClient";
import { Footer } from "../Footer";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { rupiahFormat } from "@/lib/formatting";

export const Total = ({ price }: { price: number }) => {
  const navigate = useNavigate();
  const params = useParams();
  const discount = 0;
  const tax = 0.7;

  const priceRp = rupiahFormat(price);
  const discountPrice = rupiahFormat((price * discount) / 100);
  const taxPrice = rupiahFormat((price * tax) / 100);
  const total = price + (price * tax) / 100 - (price * discount) / 100;

  const totalRP = rupiahFormat(total);
  const onSubmit = async () => {
    try {
      const { error } = await supabase
        .from("order")
        .update({
          total_price: total,
        })
        .eq("id", params.orderId);
      if (error) {
        console.error("Error updating order:", error);
        toast.error("Failed to update information", { position: "top-center" });
      } else {
        toast.success("Information updated successfully!", {
          position: "top-center",
        });
        navigate(`/payment/${params.orderId}`);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      <div className="absolute bottom-24  w-[90vw]">
        <div className="flex justify-between text-slate-500">
          <p>Subtotal</p>
          <p>{priceRp}</p>
        </div>
        <div className="flex justify-between text-red-400">
          <p>Promotion</p>
          <p>-{discountPrice}</p>
        </div>
        <div className="flex justify-between text-slate-500">
          <p>Taxes & Other Fees</p>
          <p>{taxPrice}</p>
        </div>
        <div className="flex justify-between text-slate-700 font-medium">
          <p>Total</p>
          <p>{totalRP}</p>
        </div>
      </div>
      <Footer
        variant="full"
        text={`Next ${totalRP}`}
        onClick={() => onSubmit()}
      />
    </>
  );
};
