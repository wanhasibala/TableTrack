import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, ShoppingCart } from "lucide-react";
import { error } from "console";
import { supabase } from "@/db/supabaseClient";
import { useNavigate, useParams } from "react-router";

export const HeaderStaff = () => {
  const date = new Date();

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Full name of the day (e.g., "Tuesday")
    day: "2-digit", // Day of the month (2 digits)
    month: "short", // Short name of the month (e.g., "Dec")
    year: "numeric", // Full numeric year (e.g., "2024")
  };

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return (
    <>
      <header className="flex justify-between items-center ">
        <div>
          <p className="subtle-medium">Welcome </p>
          <h3 className="">Staff Name</h3>
        </div>
        <div className="flex gap-2 ">
          <Button variant={"outline"} className="rounded-full px-3">
            <Bell />
          </Button>
        </div>
      </header>
      <Button variant={"outline"} className="mt-5">
        <Calendar />
        <p>{formattedDate} </p>
      </Button>
    </>
  );
};
