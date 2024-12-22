import React from "react";

export const Card = ({
  name,
  price,
  amount,
}: {
  name: string;
  price: number;
  amount: number;
}) => {
  const priceRp = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "idr",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return (
    <div className="px-2 py-5 flex justify-between border-b border-b-slate-200">
      <div className="flex gap-2 justify-center items-center">
        <div className="flex ">
          <p className="w-7 h-7 text-sm bg-slate-200 flex items-center justify-center rounded-s">
            {amount}
          </p>
        </div>
        <h4>{name}</h4>
      </div>
      <p>{priceRp}</p>
    </div>
  );
};
