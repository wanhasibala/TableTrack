import React from "react";
import { ProgressBar } from "./ProgressBar";

export const CardProgress = () => {
  return (
    <div className="w-full flex flex-col gap-5 p-5 bg-secondary rounded-[10px] text-white">
      <h3>Order Received</h3>
      <ProgressBar />
      <p>We will inform you when the order is ready</p>
    </div>
  );
};
