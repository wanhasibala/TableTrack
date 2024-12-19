import React from "react";

export const Total = () => {
  return (
    <div className="absolute bottom-24  w-[90vw]">
      <div className="flex justify-between text-slate-500">
        <p>Subtotal</p>
        <p>Rp.25.000</p>
      </div>
      <div className="flex justify-between text-red-400">
        <p>Promotion</p>
        <p>-Rp.3.750</p>
      </div>
      <div className="flex justify-between text-slate-500">
        <p>Taxes & Other Fees</p>
        <p>Rp.2.500</p>
      </div>
      <div className="flex justify-between text-slate-700 font-medium">
        <p>Promotion</p>
        <p>Rp.23.750</p>
      </div>
    </div>
  );
};
