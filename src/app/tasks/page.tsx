"use client";

import { CheckSquare } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function TasksPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Task Management"
            description="Agile task tracking with Kanban boards, Gantt charts, and team collaboration"
            icon={<CheckSquare className="w-6 h-6 text-white" />}
            features={[
              "Kanban Boards",
              "Gantt Charts",
              "Time Tracking",
              "Team Assignments",
              "Priority Management",
              "Progress Reports",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
