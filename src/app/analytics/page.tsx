"use client";

import { BarChart3 } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Advanced Analytics"
            description="Real-time business intelligence with AI-powered insights across your organization"
            icon={<BarChart3 className="w-6 h-6 text-white" />}
            features={[
              "Real-time Dashboards",
              "Custom Reports",
              "Trend Analysis",
              "Predictive Analytics",
              "Data Visualization",
              "Export to PDF/Excel",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
