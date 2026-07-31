// Supabase Database Type Definitions
// These types match the Drizzle schema and Supabase tables

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          name: string;
          tagline: string | null;
          logo_url: string | null;
          favicon_url: string | null;
          primary_color: string;
          secondary_color: string;
          accent_color: string;
          address: string | null;
          email: string | null;
          phone: string | null;
          website: string | null;
          working_hours_start: string | null;
          working_hours_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          tagline?: string | null;
          logo_url?: string | null;
          favicon_url?: string | null;
          primary_color?: string;
          secondary_color?: string;
          accent_color?: string;
          address?: string | null;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          working_hours_start?: string | null;
          working_hours_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          tagline?: string | null;
          logo_url?: string | null;
          favicon_url?: string | null;
          primary_color?: string;
          secondary_color?: string;
          accent_color?: string;
          address?: string | null;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          working_hours_start?: string | null;
          working_hours_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          employee_id: string;
          email: string;
          password_hash: string;
          full_name: string;
          avatar_url: string | null;
          role: string;
          is_active: boolean;
          remember_me_token: string | null;
          last_login_at: string | null;
          last_login_ip: string | null;
          session_expiry: string | null;
          two_factor_enabled: boolean;
          face_recognition_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          email: string;
          password_hash: string;
          full_name: string;
          avatar_url?: string | null;
          role?: string;
          is_active?: boolean;
          remember_me_token?: string | null;
          last_login_at?: string | null;
          last_login_ip?: string | null;
          session_expiry?: string | null;
          two_factor_enabled?: boolean;
          face_recognition_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          email?: string;
          password_hash?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: string;
          is_active?: boolean;
          remember_me_token?: string | null;
          last_login_at?: string | null;
          last_login_ip?: string | null;
          session_expiry?: string | null;
          two_factor_enabled?: boolean;
          face_recognition_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      employees: {
        Row: {
          id: string;
          user_id: string;
          employee_code: string;
          first_name: string;
          last_name: string;
          photo_url: string | null;
          department: string;
          designation: string;
          salary: string | null;
          email: string;
          phone: string | null;
          emergency_contact: string | null;
          emergency_phone: string | null;
          date_of_birth: string | null;
          gender: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          country: string;
          postal_code: string | null;
          joining_date: string;
          reporting_manager_id: string | null;
          status: string;
          bank_account_number: string | null;
          bank_ifsc: string | null;
          bank_name: string | null;
          pan_number: string | null;
          aadhar_number: string | null;
          pf_number: string | null;
          uan_number: string | null;
          biometric_id: string | null;
          qr_code: string | null;
          skills: Json;
          social_links: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          employee_code: string;
          first_name: string;
          last_name: string;
          photo_url?: string | null;
          department: string;
          designation: string;
          salary?: string | null;
          email: string;
          phone?: string | null;
          emergency_contact?: string | null;
          emergency_phone?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string;
          postal_code?: string | null;
          joining_date: string;
          reporting_manager_id?: string | null;
          status?: string;
          bank_account_number?: string | null;
          bank_ifsc?: string | null;
          bank_name?: string | null;
          pan_number?: string | null;
          aadhar_number?: string | null;
          pf_number?: string | null;
          uan_number?: string | null;
          biometric_id?: string | null;
          qr_code?: string | null;
          skills?: Json;
          social_links?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          employee_code?: string;
          first_name?: string;
          last_name?: string;
          photo_url?: string | null;
          department?: string;
          designation?: string;
          salary?: string | null;
          email?: string;
          phone?: string | null;
          emergency_contact?: string | null;
          emergency_phone?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string;
          postal_code?: string | null;
          joining_date?: string;
          reporting_manager_id?: string | null;
          status?: string;
          bank_account_number?: string | null;
          bank_ifsc?: string | null;
          bank_name?: string | null;
          pan_number?: string | null;
          aadhar_number?: string | null;
          pf_number?: string | null;
          uan_number?: string | null;
          biometric_id?: string | null;
          qr_code?: string | null;
          skills?: Json;
          social_links?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          employee_id: string;
          date: string;
          check_in: string | null;
          check_out: string | null;
          status: string;
          method: string;
          working_hours: string | null;
          break_hours: string | null;
          late_minutes: number | null;
          overtime_minutes: number | null;
          check_in_location: string | null;
          check_out_location: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          date: string;
          check_in?: string | null;
          check_out?: string | null;
          status?: string;
          method?: string;
          working_hours?: string | null;
          break_hours?: string | null;
          late_minutes?: number | null;
          overtime_minutes?: number | null;
          check_in_location?: string | null;
          check_out_location?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          date?: string;
          check_in?: string | null;
          check_out?: string | null;
          status?: string;
          method?: string;
          working_hours?: string | null;
          break_hours?: string | null;
          late_minutes?: number | null;
          overtime_minutes?: number | null;
          check_in_location?: string | null;
          check_out_location?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          code: string;
          description: string | null;
          type: string;
          stage: string;
          poster_url: string | null;
          cover_url: string | null;
          director: string | null;
          producer: string | null;
          budget: string | null;
          spent: string | null;
          start_date: string | null;
          end_date: string | null;
          release_date: string | null;
          progress: number | null;
          status: string | null;
          genre: string | null;
          language: string | null;
          cast: Json;
          crew: Json;
          tags: Json;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          description?: string | null;
          type: string;
          stage?: string;
          poster_url?: string | null;
          cover_url?: string | null;
          director?: string | null;
          producer?: string | null;
          budget?: string | null;
          spent?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          release_date?: string | null;
          progress?: number | null;
          status?: string | null;
          genre?: string | null;
          language?: string | null;
          cast?: Json;
          crew?: Json;
          tags?: Json;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          description?: string | null;
          type?: string;
          stage?: string;
          poster_url?: string | null;
          cover_url?: string | null;
          director?: string | null;
          producer?: string | null;
          budget?: string | null;
          spent?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          release_date?: string | null;
          progress?: number | null;
          status?: string | null;
          genre?: string | null;
          language?: string | null;
          cast?: Json;
          crew?: Json;
          tags?: Json;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      assets: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          type: string;
          project_id: string | null;
          file_url: string;
          thumbnail_url: string | null;
          preview_url: string | null;
          file_size: number | null;
          mime_type: string | null;
          width: number | null;
          height: number | null;
          duration: number | null;
          version: number | null;
          current_version: boolean | null;
          approval_status: string;
          approved_by: string | null;
          approved_at: string | null;
          tags: Json;
          categories: Json;
          metadata: Json;
          uploaded_by: string | null;
          downloads: number | null;
          views: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          type: string;
          project_id?: string | null;
          file_url: string;
          thumbnail_url?: string | null;
          preview_url?: string | null;
          file_size?: number | null;
          mime_type?: string | null;
          width?: number | null;
          height?: number | null;
          duration?: number | null;
          version?: number | null;
          current_version?: boolean | null;
          approval_status?: string;
          approved_by?: string | null;
          approved_at?: string | null;
          tags?: Json;
          categories?: Json;
          metadata?: Json;
          uploaded_by?: string | null;
          downloads?: number | null;
          views?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          type?: string;
          project_id?: string | null;
          file_url?: string;
          thumbnail_url?: string | null;
          preview_url?: string | null;
          file_size?: number | null;
          mime_type?: string | null;
          width?: number | null;
          height?: number | null;
          duration?: number | null;
          version?: number | null;
          current_version?: boolean | null;
          approval_status?: string;
          approved_by?: string | null;
          approved_at?: string | null;
          tags?: Json;
          categories?: Json;
          metadata?: Json;
          uploaded_by?: string | null;
          downloads?: number | null;
          views?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          assignee_id: string | null;
          creator_id: string | null;
          project_id: string | null;
          status: string;
          priority: string;
          due_date: string | null;
          completed_at: string | null;
          estimated_hours: string | null;
          actual_hours: string | null;
          tags: Json;
          progress: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          assignee_id?: string | null;
          creator_id?: string | null;
          project_id?: string | null;
          status?: string;
          priority?: string;
          due_date?: string | null;
          completed_at?: string | null;
          estimated_hours?: string | null;
          actual_hours?: string | null;
          tags?: Json;
          progress?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          assignee_id?: string | null;
          creator_id?: string | null;
          project_id?: string | null;
          status?: string;
          priority?: string;
          due_date?: string | null;
          completed_at?: string | null;
          estimated_hours?: string | null;
          actual_hours?: string | null;
          tags?: Json;
          progress?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      leaves: {
        Row: {
          id: string;
          employee_id: string;
          leave_type_id: string | null;
          type: string;
          start_date: string;
          end_date: string;
          total_days: string;
          reason: string | null;
          status: string;
          approved_by: string | null;
          approved_at: string | null;
          rejection_reason: string | null;
          attachment_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          leave_type_id?: string | null;
          type: string;
          start_date: string;
          end_date: string;
          total_days: string;
          reason?: string | null;
          status?: string;
          approved_by?: string | null;
          approved_at?: string | null;
          rejection_reason?: string | null;
          attachment_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          leave_type_id?: string | null;
          type?: string;
          start_date?: string;
          end_date?: string;
          total_days?: string;
          reason?: string | null;
          status?: string;
          approved_by?: string | null;
          approved_at?: string | null;
          rejection_reason?: string | null;
          attachment_url?: string | null;
          created_at?: string;
        };
      };
      expenses: {
        Row: {
          id: string;
          employee_id: string;
          title: string;
          description: string | null;
          category: string;
          amount: string;
          currency: string;
          expense_date: string;
          receipt_url: string | null;
          status: string;
          approved_by: string | null;
          approved_at: string | null;
          project_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          title: string;
          description?: string | null;
          category: string;
          amount: string;
          currency?: string;
          expense_date: string;
          receipt_url?: string | null;
          status?: string;
          approved_by?: string | null;
          approved_at?: string | null;
          project_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          amount?: string;
          currency?: string;
          expense_date?: string;
          receipt_url?: string | null;
          status?: string;
          approved_by?: string | null;
          approved_at?: string | null;
          project_id?: string | null;
          created_at?: string;
        };
      };
      notices: {
        Row: {
          id: string;
          title: string;
          content: string;
          type: string;
          priority: string | null;
          is_pinned: boolean | null;
          expires_at: string | null;
          published_by: string | null;
          published_at: string | null;
          attachments: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          type?: string;
          priority?: string | null;
          is_pinned?: boolean | null;
          expires_at?: string | null;
          published_by?: string | null;
          published_at?: string | null;
          attachments?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          type?: string;
          priority?: string | null;
          is_pinned?: boolean | null;
          expires_at?: string | null;
          published_by?: string | null;
          published_at?: string | null;
          attachments?: Json;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          link: string | null;
          is_read: boolean;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          link?: string | null;
          is_read?: boolean;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          link?: string | null;
          is_read?: boolean;
          icon?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role:
        | "super_admin"
        | "admin"
        | "hr"
        | "manager"
        | "team_lead"
        | "employee"
        | "intern"
        | "freelancer";
      employee_status: "active" | "inactive" | "terminated" | "probation";
      attendance_status:
        | "present"
        | "absent"
        | "late"
        | "half_day"
        | "leave"
        | "holiday"
        | "wfh"
        | "early_exit";
      leave_type:
        | "casual"
        | "sick"
        | "earned"
        | "maternity"
        | "paternity"
        | "unpaid"
        | "comp_off";
      leave_status: "pending" | "approved" | "rejected" | "cancelled";
      task_status: "todo" | "in_progress" | "review" | "done" | "blocked";
      task_priority: "low" | "medium" | "high" | "urgent";
      expense_status: "pending" | "approved" | "rejected" | "paid";
      project_stage:
        | "pre_production"
        | "production"
        | "post_production"
        | "released"
        | "archived";
      project_type: "movie" | "web_series" | "commercial" | "music_video";
      asset_type:
        | "poster"
        | "trailer"
        | "video"
        | "photo"
        | "audio"
        | "script"
        | "storyboard"
        | "press_kit"
        | "brand_asset";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
