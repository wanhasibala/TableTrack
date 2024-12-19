import React from "react";

export const Card = () => {
  return (
    <div className="px-2 py-5 flex justify-between border-b border-b-slate-200">
      <div className="flex gap-2 justify-center items-center">
        <div className="flex ">
          <p className="w-7 h-7 text-sm bg-slate-200 flex items-center justify-center rounded-s">
            1
          </p>
        </div>
        <h4>Aren latte</h4>
      </div>
      <p>Rp.25.000</p>
    </div>
  );
};
