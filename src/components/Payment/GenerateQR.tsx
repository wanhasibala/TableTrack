import React from "react";
import { Button } from "../ui/button";

export const GenerateQR = () => {
  return (
    <div className="mt-5 flex flex-col items-start gap-4">
      <div className="w-full flex justify-between items-center">
        <p>QRIS</p>
        <Button variant={"link"} className="p-0">
          Change Payment Method
        </Button>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <img src="/QRIS.png" />
        <Button className="w-full text-lg">Download QR</Button>
      </div>
      <Button variant="link">Cara Bayar</Button>
    </div>
  );
};
