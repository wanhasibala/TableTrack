import React from "react";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router";

export const TabbleBanner = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="bg-[url('/TableInformation.svg')] w-full p-5 bg-fit bg-black text-white flex justify-between items-center rounded-[10px]">
      <div>
        <p>Table No </p>
        <h4>Name</h4>
      </div>
      <Button
        className="bg-primary rounded-full border border-slate-400 text-sm"
        onClick={() => navigate(`/form-order/${params.orderId}`)}
      >
        Edit
      </Button>
    </div>
  );
};
