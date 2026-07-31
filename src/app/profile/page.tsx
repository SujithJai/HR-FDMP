"use client";

import { User } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="My Profile"
            description="Manage your personal information, preferences, and security settings"
            icon={<User className="w-6 h-6 text-white" />}
            features={[
              "Personal Info",
              "Security Settings",
              "Two-Factor Auth",
              "Activity Log",
              "Preferences",
              "Account Settings",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
