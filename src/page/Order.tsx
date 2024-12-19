import { MenuHeader } from "@/components/order/Header";
import { Search } from "@/components/order/Search";
import { Category } from "@/components/order/Category";
import { Items } from "@/components/order/Item";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/db/supabaseClient";
import { Banner } from "@/components/order/Banner";
import { useNavigate } from "react-router";
import { postOrder } from "../db/queries/postOrder";

export const Order = () => {
  return (
    <div className="flex flex-col gap-5">
      <MenuHeader />
      <Banner />
      <Search />
      <Category />
      <Items />
    </div>
  );
};
