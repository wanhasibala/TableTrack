import React from "react";
import { useParams } from "react-router";
import { useCategory } from "@/hooks/useCategory";
import { useMenuContext } from "@/context/MenuContext";
import { cn } from "@/lib/utils";

type RouteParams = Record<string, string | undefined> & {
  tableId?: string;
  orderId?: string;
  client_name?: string;
};

export const Category = () => {
  const params = useParams<RouteParams>();
  const { selectedCategory, setSelectedCategory } = useMenuContext();
  
  const { categories, loading, error } = useCategory({
    tableId: params.tableId,
    orderId: params.orderId,
    clientName: params.client_name
  });

  if (loading) {
    return (
      <div>
        <div className="h-6 w-24 bg-gray-200 rounded mb-2.5 animate-pulse" />
        <div className="grid grid-cols-4 gap-2.5">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-10 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to load categories. Please try again.
      </div>
    );
  }

  return (
    <div>
      <p className="large mb-2.5">Category</p>
      <div className="grid grid-cols-4 gap-2.5 animate-in fade-in duration-500">
        {categories.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex rounded-lg text-sm font-medium items-center justify-center h-10 transition-all",
              selectedCategory === item.id
                ? "bg-primary text-white scale-[0.98]"
                : "bg-neutral-200 hover:bg-neutral-300"
            )}
            onClick={() => setSelectedCategory(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
