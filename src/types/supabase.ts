export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          id: string
          id_client: string | null
          name: string | null
          sequence: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          id_client?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          id_client?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_id_client_fkey"
            columns: ["id_client"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      client: {
        Row: {
          client_email: string | null
          client_name: string | null
          created_at: string
          id: string
        }
        Insert: {
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      menu_item: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          id_client: string | null
          menu_image: string | null
          name: string | null
          price: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          id_client?: string | null
          menu_image?: string | null
          name?: string | null
          price?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          id_client?: string | null
          menu_image?: string | null
          name?: string | null
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_item_id_client_fkey"
            columns: ["id_client"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          closed_at: string | null
          created_at: string
          customer_name: string | null
          id: string
          id_client: string | null
          id_table: string | null
          notes: string | null
          order_date: string | null
          order_status: string | null
          phone_number: string | null
          total_price: number | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string
          customer_name?: string | null
          id?: string
          id_client?: string | null
          id_table?: string | null
          notes?: string | null
          order_date?: string | null
          order_status?: string | null
          phone_number?: string | null
          total_price?: number | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string
          customer_name?: string | null
          id?: string
          id_client?: string | null
          id_table?: string | null
          notes?: string | null
          order_date?: string | null
          order_status?: string | null
          phone_number?: string | null
          total_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_id_client_fkey"
            columns: ["id_client"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_id_table_fkey"
            columns: ["id_table"]
            isOneToOne: false
            referencedRelation: "table"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item: {
        Row: {
          created_at: string
          customization: string | null
          id: string
          id_client: string | null
          item_id: string | null
          order_id: string | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          customization?: string | null
          id?: string
          id_client?: string | null
          item_id?: string | null
          order_id?: string | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          customization?: string | null
          id?: string
          id_client?: string | null
          item_id?: string | null
          order_id?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_id_client_fkey"
            columns: ["id_client"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_item_id_fkey1"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "menu_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
        ]
      }
      payment: {
        Row: {
          amount_paid: number | null
          created_at: string
          id: string
          id_client: string | null
          order_id: string | null
          payment_method: string | null
          payment_status: string | null
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string
          id?: string
          id_client?: string | null
          order_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
        }
        Update: {
          amount_paid?: number | null
          created_at?: string
          id?: string
          id_client?: string | null
          order_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_id_client_fkey"
            columns: ["id_client"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
        ]
      }
      table: {
        Row: {
          created_at: string
          id: string
          id_client: string | null
          table_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          id_client?: string | null
          table_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          id_client?: string | null
          table_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "table_id_client_fkey"
            columns: ["id_client"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile: {
        Row: {
          created_at: string
          id: string
          id_client: string | null
          id_user: string | null
          role: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          id_client?: string | null
          id_user?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          id_client?: string | null
          id_user?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_id_client_fkey"
            columns: ["id_client"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
