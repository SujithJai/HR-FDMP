"use client";

import { Bell } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Notifications Center"
            description="Centralized notification management with smart filtering and preferences"
            icon={<Bell className="w-6 h-6 text-white" />}
            features={[
              "Real-time Alerts",
              "Email Notifications",
              "Push Notifications",
              "Smart Filtering",
              "Custom Preferences",
              "Read/Unread Tracking",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
