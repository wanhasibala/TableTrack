import { supabase } from "../supabaseClient";

export const getOrderClient = async () => {
  const { data, error } = await supabase.from("order").select("*");
  if (error) console.error(error);

  console.log(error);
  console.log(data);
  return data;
};
