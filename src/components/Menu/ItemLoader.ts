import { useState, useEffect } from "react";
import { supabase } from "@/db/supabaseClient";
import { Database } from "@/types/supabase";
import { PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";

// Base types
type BaseMenuItem = Database["public"]["Tables"]["menu_item"]["Row"];

export type CategoryFromDB = {
  id: string;
  name: string;
  created_at?: string;
  [key: string]: any;
};

interface LoaderParams {
  orderId?: string;
  tableId?: string;
  client_name?: string;
  categoryId?: string;
}

// Combined type for menu items with additional fields
export type MenuItem = BaseMenuItem & {
  quantity: number;
  menu_image: string | null;
  category?: CategoryFromDB;
};

// Response types
type OrderItemResponse = {
  quantity: number;
  menu_item: BaseMenuItem;
};

type ClientResponse = {
  id: string;
  menu_item: BaseMenuItem[];
};

export function useItemsLoader(params: LoaderParams) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        let fetchedItems: MenuItem[] = [];

        if (params.orderId) {
          const { data: menuItems, error: menuError } = await supabase
            .from("menu_item")
            .select("*, order_item(*)")
            .filter("order_item.order_id", "eq", params.orderId);

          if (menuError) throw menuError;

          const { data: orderItems, error: orderItemsError } = await supabase
            .from("order_item")
            .select("quantity, menu_item(*)")
            .eq("order_id", params.orderId);

          if (orderItemsError) throw orderItemsError;

          const orderItemsMap = new Map(
            (orderItems as OrderItemResponse[]).map((orderItem) => [
              orderItem?.menu_item?.id,
              orderItem,
            ])
          );

          fetchedItems = (menuItems || []).map((menuItem) => ({
            ...menuItem,
            quantity: orderItemsMap.get(menuItem.id)?.quantity || 0,
            menu_image: menuItem.menu_image
              ? `https://dncrdmxpzacwnydmltht.supabase.co/storage/v1/object/public/menu/${menuItem.menu_image}`
              : null
          }));
        } else if (params.tableId) {
          const { data: tableData } = await supabase
            .from("table")
            .select("id_client")
            .eq("id", params.tableId)
            .single();

          const { data, error } = await supabase
            .from("menu_item")
            .select("*, category(*)")
            .eq("id_client", tableData?.id_client || "");

          if (error) throw error;

          fetchedItems = (data || []).map((item: any) => ({
            ...item,
            quantity: 0,
            menu_image: item.menu_image
              ? `https://dncrdmxpzacwnydmltht.supabase.co/storage/v1/object/public/menu/${item.menu_image}`
              : null,
            category: item.category ? {
              id: item.category.id,
              name: item.category.name
            } : undefined
          }));
        } else if (params.client_name) {
          const { data, error } = await supabase
            .from("client")
            .select("*, menu_item(*)")
            .eq("client_name", params.client_name)
            .single();

          if (error) throw error;

          localStorage.setItem("id_client", data?.id);

          fetchedItems = ((data?.menu_item as BaseMenuItem[]) || []).map((item) => ({
            ...item,
            quantity: 0,
            menu_image: item.menu_image
              ? `https://dncrdmxpzacwnydmltht.supabase.co/storage/v1/object/public/menu/${item.menu_image}`
              : null
          }));
        } else if (params.categoryId) {
          const id_client = localStorage.getItem("id_client");
          const baseQuery = supabase
            .from("menu_item")
            .select("*, category(*)");

          const query = params.categoryId !== "all"
            ? baseQuery.eq("category_id", params.categoryId)
            : id_client
              ? baseQuery.eq("id_client", id_client)
              : baseQuery;

          const { data, error } = await query;

          if (error) throw error;

          fetchedItems = (data || []).map((item: any) => ({
            ...item,
            quantity: 0,
            menu_image: item.menu_image
              ? `https://dncrdmxpzacwnydmltht.supabase.co/storage/v1/object/public/menu/${item.menu_image}`
              : null,
            category: item.category ? {
              id: item.category.id,
              name: item.category.name
            } : undefined
          }));
        }

        setItems(fetchedItems);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [params]);

  return { items, loading, error, setItems };
}
