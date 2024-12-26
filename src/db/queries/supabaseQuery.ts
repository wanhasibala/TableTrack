import { supabase } from "@/db/supabaseClient";

const supabaseQuery = (table: string) => ({
  select: async (columns: string, id_client: string, filters: object = {}) =>
    await supabase
      .from(table)
      .select(columns)
      .eq("id_client", id_client)
      .match(filters), // Apply custom filters

  insert: async (data: object, id_client: string) =>
    await supabase.from(table).insert({ ...data, id_client }),

  update: async (data: object, id_client: string, filters: object = {}) =>
    await supabase
      .from(table)
      .update(data)
      .eq("id_client", id_client)
      .match(filters), // Apply custom filters

  delete: async (id_client: string, filters: object = {}) =>
    await supabase
      .from(table)
      .delete()
      .eq("id_client", id_client)
      .match(filters), // Apply custom filters,
});

export default supabaseQuery;
