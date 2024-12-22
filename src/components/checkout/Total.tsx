import React from "react";
import { Footer } from "../Footer";

export const Total = ({ price }: { price: number }) => {
  const discount = 15;
  const tax = 10;
  const rupiahFormat = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "idr",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const priceRp = rupiahFormat(price);
  const discountPrice = rupiahFormat((price * discount) / 100);
  const taxPrice = rupiahFormat((price * tax) / 100);
  const total = rupiahFormat(
    price + (price * tax) / 100 - (price * discount) / 100,
  );

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
          <p>Promotion</p>
          <p>{total}</p>
        </div>
      </div>
      <Footer variant="full" text={`Next ${total}`} onClick={() => {}} />
    </>
  );
};
