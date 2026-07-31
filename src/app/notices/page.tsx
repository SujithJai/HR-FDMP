"use client";

import { Megaphone } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function NoticesPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Notice Board"
            description="Company-wide announcements, policies, and important updates"
            icon={<Megaphone className="w-6 h-6 text-white" />}
            features={[
              "Announcements",
              "Policy Updates",
              "Event Notices",
              "Pinned Posts",
              "Read Receipts",
              "Rich Content",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
