import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Footer } from "../Footer";
import { supabase } from "@/db/supabaseClient";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone_number: z.string(),
  table: z.string().min(1, {
    message: "Table must be filled",
  }),
  notes: z.string(),
});
type Table = {
  id: string;
  table_name: string;
  id_client: string;
  created_at: string;
};
type Value = {
  table: Table[];
  customer_name: string;
  phone_number: string;
  notes: string;
};

export const FormInput = () => {
  const [tableOptions, setTableOptions] = useState<Table[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      table: "",
      notes: "",
    },
  });

  useEffect(() => {
    async function fetchTables() {
      const { data, error } = await supabase.from("table").select("*");

      if (error) {
        console.error("Error fetching tables:", error);
      } else {
        setTableOptions(data || []);
        form;
      }
    }

    async function fetchOrder() {
      const { data, error } = await supabase
        .from("order")
        .select("*, table(*)")
        .eq("id", params.orderId)
        .single(); // Assuming one order matches

      if (error) {
        console.error("Error fetching order:", error);
      } else if (data) {
        // Set default values for the form

        form.reset({
          name: data.customer_name || "",
          phone_number: data.phone_number || "",
          table: data.table?.id || "", // Set default value for table
          notes: data.notes || "",
        });
      }
    }

    fetchTables();
    fetchOrder();
  }, [params.orderId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from("order")
        .update({
          customer_name: values.name,
          phone_number: values.phone_number,
          id_table: values.table,
          notes: values.notes,
        })
        //@ts-ignore
        .eq("id", params.orderId);
      if (error) {
        console.error("Error updating order:", error);
        toast.error("Failed to update information", { position: "top-center" });
      } else {
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred.");
    }
    toast.success("Information updated successfully!", {
      position: "top-center",
    });

    navigate(`/cart/${params.orderId}`);
  };
  const fields = [
    { name: "name", label: "Name", placeholder: "Enter your name" },
    {
      name: "phone_number",
      label: "Phone Number",
      placeholder: "Enter your phone number",
    },
    { name: "notes", label: "Notes", placeholder: "Add any notes" },
    { name: "table", label: "Table", placeholder: "Add any notes" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
        {/* Table Dropdown */}
        {/* Other Fields */}
        {fields.map(({ name, label, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            //@ts-ignore
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  {name === "notes" ? (
                    <Textarea
                      className="textarea-class"
                      placeholder={placeholder}
                      {...field}
                    />
                  ) : name === "table" ? (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue {...field} defaultValue={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {tableOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.table_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input placeholder={placeholder} {...field} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Footer Button */}
        <Footer
          text="Save Information"
          variant="full"
          onClick={() => form.handleSubmit(onSubmit)()}
        />
      </form>
    </Form>
  );
};
