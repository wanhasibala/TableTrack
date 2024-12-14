import React from "react";
import { Button } from "../ui/button";

export const TabbleBanner = () => {
  return (
    <div className="bg-[url('../../../public/TableInformation.svg')] w-full p-5 bg-fit bg-black text-white flex justify-between items-center rounded-[10px]">
      <div>
        <p>Table No </p>
        <h4>Name</h4>
      </div>
      <Button className="bg-primary rounded-full border border-slate-400 text-sm">
        Edit
      </Button>
    </div>
  );
};
