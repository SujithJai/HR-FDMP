"use client";

import { FileText } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function DailyReportsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Daily Work Reports"
            description="Track daily progress, blockers, and productivity across your team"
            icon={<FileText className="w-6 h-6 text-white" />}
            features={[
              "Daily Submissions",
              "Task Tracking",
              "Blocker Alerts",
              "Productivity Score",
              "Manager Reviews",
              "Export Reports",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
