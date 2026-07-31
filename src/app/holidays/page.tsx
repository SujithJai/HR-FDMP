"use client";

import { CalendarDays } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function HolidaysPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Holiday Calendar"
            description="Manage company holidays, optional leaves, and festival calendar"
            icon={<CalendarDays className="w-6 h-6 text-white" />}
            features={[
              "Public Holidays",
              "Optional Leaves",
              "Festival Calendar",
              "Year Planning",
              "Notifications",
              "Multi-location",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
