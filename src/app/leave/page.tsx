"use client";

import { Calendar } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function LeavePage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Leave Management"
            description="Comprehensive leave tracking with approval workflows and balance management"
            icon={<Calendar className="w-6 h-6 text-white" />}
            features={[
              "Multiple Leave Types",
              "Approval Workflows",
              "Balance Tracking",
              "Calendar View",
              "Conflict Detection",
              "Mobile Requests",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
