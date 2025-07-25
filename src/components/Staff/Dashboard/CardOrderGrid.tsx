import { ChefHat, CircleCheck, Clipboard, Icon, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/db/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

const statusConfig = [
  { name: "Active", iconName: Clipboard, color: "#884405" },
  { name: "Not Paid", iconName: Wallet, color: "#C17604" },
  { name: "In Progress", iconName: ChefHat, color: "#1F0302" },
  { name: "Closed", iconName: CircleCheck, color: "#166534" },
];

export const CardOrderGrid = () => {
  const navigate = useNavigate();
  const [orderCounts, setOrderCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  //@ts-ignore
  const user = localStorage.getItem("id_client");

  useEffect(() => {
    const fetchOrderCounts = async () => {
      if (!user) return;

      // For each status, get the count
      const counts: Record<string, number> = {};

      for (const status of statusConfig.map((s) => s.name)) {
        const sta =
          status === "Active" ? statusConfig.map((s) => s.name) : [status];

        const { count, error } = await supabase
          .from("order")
          .select("*", { count: "exact", head: true })
          .eq("id_client", user)
          .in("order_status", sta);

        if (error) {
          console.error(`Error fetching count for ${status}:`, error);
          continue;
        }

        counts[status] = count || 0;
      }

      setOrderCounts(counts);
      setLoading(false);
    };

    fetchOrderCounts();
  }, [user]);
  const LoadingSkeleton = React.memo(() => (
    <div className="mt-5 grid grid-cols-2 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  ));
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="mt-5 grid grid-cols-2 gap-5">
      {statusConfig.map((item) => {
        const params = encodeURIComponent(item.name);
        return (
          <div
            onClick={() => navigate(`/active-order/${params}`)}
            key={item.name}
            className="border text-sm p-2 flex flex-col gap-2 rounded-lg"
          >
            <div className="w-full justify-between flex">
              {item.name}{" "}
              <div
                className="p-1 rounded-full"
                style={{ backgroundColor: item.color }}
              >
                <item.iconName size={12} color="white" />{" "}
              </div>
            </div>

            <h3>{orderCounts[item.name] || 0}</h3>
          </div>
        );
      })}
    </div>
  );
};
