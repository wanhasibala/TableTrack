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
          sequence?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          id_client?: string | null
          name?: string | null
          sequence?: number | null
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
            foreignKeyName: "menu_item_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
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
          menu_item: string | null
          order_id: string | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          customization?: string | null
          id?: string
          id_client?: string | null
          menu_item?: string | null
          order_id?: string | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          customization?: string | null
          id?: string
          id_client?: string | null
          menu_item?: string | null
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
            columns: ["menu_item"]
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
          payment_method_id: string | null
          payment_status: string | null
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string
          id?: string
          id_client?: string | null
          order_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
        }
        Update: {
          amount_paid?: number | null
          created_at?: string
          id?: string
          id_client?: string | null
          order_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
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
          {
            foreignKeyName: "payment_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_method"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_method: {
        Row: {
          created_at: string
          fee_percentage: string | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string | null
          sort_order: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          fee_percentage?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string | null
          sort_order?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          fee_percentage?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string | null
          sort_order?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
