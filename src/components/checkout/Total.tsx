import { supabase } from "@/db/supabaseClient";
import { Footer } from "../Footer";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { rupiahFormat } from "@/lib/formatting";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";

interface TotalProps {
  price: number;
}

type RouteParams = Record<string, string | undefined> & {
  orderId?: string;
};

export const Total: React.FC<TotalProps> = ({ price }) => {
  const navigate = useNavigate();
  const params = useParams<RouteParams>();
  const { selectedMethod, paymentMethods } = usePaymentMethods();

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedMethod
  );
  const discount = 0;
  const tax = 0.7;

  const priceRp = rupiahFormat(price);
  const discountPrice = rupiahFormat((price * discount) / 100);
  const taxPrice = rupiahFormat((price * tax) / 100);

  // Calculate fees if the payment method has a fee percentage
  const feePercentage = selectedPaymentMethod?.fee_percentage
    ? parseFloat(selectedPaymentMethod.fee_percentage)
    : 0;
  const feeAmount = (price * feePercentage) / 100;
  const feeAmountRp = rupiahFormat(feeAmount);

  const total =
    price + (price * tax) / 100 - (price * discount) / 100 + feeAmount;

  const totalRP = rupiahFormat(total);

  const onSubmit = async () => {
    if (!params.orderId) {
      toast.error("Invalid order ID", { position: "top-center" });
      return;
    }

    if (!selectedMethod) {
      toast.error("Please select a payment method", { position: "top-center" });
      return;
    }

    try {
      // Begin transaction
      const { data: order, error: orderError } = await supabase
        .from("order")
        .update({
          total_price: total,
          order_status: "Awaiting Payment",
        })
        .eq("id", params.orderId)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create payment record
      const { error: paymentError } = await supabase.from("payment").insert({
        order_id: params.orderId,
        payment_method_id: selectedMethod,
        payment_method: selectedPaymentMethod?.name,
        payment_status: "Pending",
        amount_paid: Number(total),
      });

      if (paymentError) throw paymentError;

      toast.success("Information updated successfully!", {
        position: "top-center",
      });
      navigate(`/payment/${params.orderId}`);
    } catch (err) {
      console.error("Error updating information:", err);
      toast.error("Failed to update information", { position: "top-center" });
    }
  };

  return (
    <>
      <div className="absolute bottom-24 w-[90vw]">
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
        {feePercentage > 0 && (
          <div className="flex justify-between text-slate-500">
            <p>Payment Fee ({feePercentage}%)</p>
            <p>{feeAmountRp}</p>
          </div>
        )}
        <div className="flex justify-between text-slate-700 font-medium">
          <p>Total</p>
          <p>{totalRP}</p>
        </div>
      </div>
      <Footer
        variant="full"
        text={`Next ${totalRP}`}
        onClick={onSubmit}
        disabled={!selectedMethod || !params.orderId}
      />
    </>
  );
};
