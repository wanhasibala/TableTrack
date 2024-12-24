import { rupiahFormat } from "@/lib/formatting";

export const TotalPayment = ({ price, id }: { price: number; id: string }) => {
  const priceRp = rupiahFormat(price);
  return (
    <div className="mt-10 bg-secondary w-full h-fit p-5 rounded-lg text-white gap-2 flex flex-col">
      <div className="flex w-full justify-between">
        <p>Total</p>
        <p>Bayar dalam</p>
      </div>
      <h2>{priceRp}</h2>
      <p> Order ID #{id}</p>
    </div>
  );
};
