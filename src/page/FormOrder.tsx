import { FormInput } from "@/components/FormOrder/Form";
import { Header } from "@/components/Header";
import React from "react";
import { useParams } from "react-router";

export const FormOrder = () => {
  const params = useParams();
  return (
    <>
      <Header name="Information Detail" href={`/cart/${params.orderId}`} />
      <FormInput />
    </>
  );
};
