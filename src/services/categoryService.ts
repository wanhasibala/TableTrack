import { supabase } from "@/db/supabaseClient";
import { Database } from "@/types/supabase";

type Category = Database["public"]["Tables"]["category"]["Row"];

export const categoryService = {
  async getTableCategories(tableId: string) {
    const { data: tableData } = await supabase
      .from("table")
      .select("id_client")
      .eq("id", tableId)
      .single();

    if (!tableData?.id_client) {
      throw new Error("Table not found or has no client");
    }

    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("id_client", tableData.id_client);

    if (error) throw error;
    return data || [];
  },

  async getOrderCategories(orderId: string) {
    const { data: orderData } = await supabase
      .from("order")
      .select("id_client")
      .eq("id", orderId)
      .single();

    if (!orderData?.id_client) {
      throw new Error("Order not found or has no client");
    }

    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("id_client", orderData.id_client);

    if (error) throw error;
    return data || [];
  },

  async getClientCategories(clientName: string) {
    const { data: clientData } = await supabase
      .from("client")
      .select("id")
      .eq("client_name", clientName)
      .single();

    if (!clientData?.id) {
      throw new Error("Client not found");
    }

    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("id_client", clientData.id);

    if (error) throw error;
    return data || [];
  }
};