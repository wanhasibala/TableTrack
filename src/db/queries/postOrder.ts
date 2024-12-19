import { supabase } from "../supabaseClient";

export const postOrder = async (datas: any, table: string) => {
  try {
    const { data, error } = await supabase.from(table).insert(datas).select();

    if (error) {
      console.error("Error inserting order:", error.message);
      return error.message;
    } else {
      console.log("Order posted successfully:", data);
      return data;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return err;
  } finally {
    // setLoading(false);
  }
};
