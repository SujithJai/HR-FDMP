"use client";

import { Settings } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="System Settings"
            description="Configure system preferences, integrations, and advanced options"
            icon={<Settings className="w-6 h-6 text-white" />}
            features={[
              "General Settings",
              "Integrations",
              "User Management",
              "Role Permissions",
              "Backup & Restore",
              "API Access",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
