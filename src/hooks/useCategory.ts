import { useState, useEffect } from "react";
import { categoryService } from "@/services/categoryService";
import { Database } from "@/types/supabase";

type Category = Database["public"]["Tables"]["category"]["Row"];

interface UseCategoryProps {
  tableId?: string;
  orderId?: string;
  clientName?: string;
}

export const useCategory = ({
  tableId,
  orderId,
  clientName,
}: UseCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let data: Category[] = [];

        if (tableId) {
          data = await categoryService.getTableCategories(tableId);
        } else if (orderId) {
          data = await categoryService.getOrderCategories(orderId);
        } else if (clientName) {
          data = await categoryService.getClientCategories(clientName);
        }

        // Add "All Items" category at the start
        data.push({
          id: "all",
          name: "All Items",
          id_client: data[0]?.id_client || "",
          sequence: 0,
          created_at: new Date().toISOString(),
        });
        const sortedCategories = data.sort(
          (a, b) => (a.sequence || 0) - (b.sequence || 0)
        );

        setCategories(sortedCategories);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch categories")
        );
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [tableId, orderId, clientName]);

  return {
    categories,
    loading,
    error,
  };
};
