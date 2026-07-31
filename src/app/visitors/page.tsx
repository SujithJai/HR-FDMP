"use client";

import { UserPlus } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function VisitorsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Visitor Management"
            description="Modern visitor check-in with ID verification and badge printing"
            icon={<UserPlus className="w-6 h-6 text-white" />}
            features={[
              "Pre-registration",
              "ID Verification",
              "Badge Printing",
              "Host Notifications",
              "Check-in/out Tracking",
              "Analytics",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
