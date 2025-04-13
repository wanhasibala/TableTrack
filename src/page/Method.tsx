import React from "react";
import { useParams } from "react-router";

export const Method = () => {
  const params = useParams();
  console.log(params);
  return <div></div>;
};
