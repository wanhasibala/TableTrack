import { ChevronRight, Ticket, Wallet } from "lucide-react";
import React from "react";
import { Footer } from "../Footer";

export const Method = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Ticket size={32} />
        <div className="w-full flex justify-between items-center border-b border-b-slate-200 py-2.5">
          <div className="">
            <p className="large"> Promotion Code</p>
            <p className="">15%</p>
          </div>
          <ChevronRight />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Wallet size={32} />
        <div className="w-full flex justify-between items-center border-b border-b-slate-200 py-2.5">
          <div className="">
            <p className="large">Payment Method</p>
            <p className="">QRIS</p>
          </div>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};
