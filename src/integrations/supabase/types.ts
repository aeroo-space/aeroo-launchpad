export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      enrollments: {
        Row: {
          captain_age: number | null
          captain_full_name: string | null
          captain_grade: string | null
          captain_iin: string | null
          captain_phone: string | null
          city: string | null
          competition_id: string
          consent: boolean
          created_at: string
          email: string | null
          id: string
          mentor_city: string | null
          mentor_full_name: string | null
          mentor_iin: string | null
          mentor_phone: string | null
          mentor_school: string | null
          mentor_telegram: string | null
          participant1_city: string | null
          participant1_full_name: string | null
          participant1_grade: string | null
          participant1_iin: string | null
          participant1_phone: string | null
          participant1_school: string | null
          participant2_city: string | null
          participant2_full_name: string | null
          participant2_grade: string | null
          participant2_iin: string | null
          participant2_phone: string | null
          participant2_school: string | null
          participant3_city: string | null
          participant3_full_name: string | null
          participant3_grade: string | null
          participant3_iin: string | null
          participant3_phone: string | null
          participant3_school: string | null
          source: string | null
          status: string
          study_place: string | null
          team_name: string | null
          telegram: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          captain_age?: number | null
          captain_full_name?: string | null
          captain_grade?: string | null
          captain_iin?: string | null
          captain_phone?: string | null
          city?: string | null
          competition_id: string
          consent?: boolean
          created_at?: string
          email?: string | null
          id?: string
          mentor_city?: string | null
          mentor_full_name?: string | null
          mentor_iin?: string | null
          mentor_phone?: string | null
          mentor_school?: string | null
          mentor_telegram?: string | null
          participant1_city?: string | null
          participant1_full_name?: string | null
          participant1_grade?: string | null
          participant1_iin?: string | null
          participant1_phone?: string | null
          participant1_school?: string | null
          participant2_city?: string | null
          participant2_full_name?: string | null
          participant2_grade?: string | null
          participant2_iin?: string | null
          participant2_phone?: string | null
          participant2_school?: string | null
          participant3_city?: string | null
          participant3_full_name?: string | null
          participant3_grade?: string | null
          participant3_iin?: string | null
          participant3_phone?: string | null
          participant3_school?: string | null
          source?: string | null
          status?: string
          study_place?: string | null
          team_name?: string | null
          telegram?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          captain_age?: number | null
          captain_full_name?: string | null
          captain_grade?: string | null
          captain_iin?: string | null
          captain_phone?: string | null
          city?: string | null
          competition_id?: string
          consent?: boolean
          created_at?: string
          email?: string | null
          id?: string
          mentor_city?: string | null
          mentor_full_name?: string | null
          mentor_iin?: string | null
          mentor_phone?: string | null
          mentor_school?: string | null
          mentor_telegram?: string | null
          participant1_city?: string | null
          participant1_full_name?: string | null
          participant1_grade?: string | null
          participant1_iin?: string | null
          participant1_phone?: string | null
          participant1_school?: string | null
          participant2_city?: string | null
          participant2_full_name?: string | null
          participant2_grade?: string | null
          participant2_iin?: string | null
          participant2_phone?: string | null
          participant2_school?: string | null
          participant3_city?: string | null
          participant3_full_name?: string | null
          participant3_grade?: string | null
          participant3_iin?: string | null
          participant3_phone?: string | null
          participant3_school?: string | null
          source?: string | null
          status?: string
          study_place?: string | null
          team_name?: string | null
          telegram?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          iin: string | null
          phone: string | null
          profile_completed: boolean
          school: string | null
          telegram: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          iin?: string | null
          phone?: string | null
          profile_completed?: boolean
          school?: string | null
          telegram?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          iin?: string | null
          phone?: string | null
          profile_completed?: boolean
          school?: string | null
          telegram?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
