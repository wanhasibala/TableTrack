import React from "react";

export const Status = () => {
  return (
    <div className="w-full flex flex-col gap-5  items-center px-5  h-fit ">
      <img src="/Succes.png" />
      <h3>Your Order has been made</h3>
      <p className="text-center">
        Congratulations! Your order has been successfully proceed, we will pick
        up your order as soon as possible!
      </p>
    </div>
  );
};
