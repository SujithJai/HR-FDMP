"use client";

import { Receipt } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function ExpensesPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Expense Management"
            description="Track, approve, and reimburse employee expenses with automated workflows"
            icon={<Receipt className="w-6 h-6 text-white" />}
            features={[
              "Receipt Scanning",
              "Approval Workflows",
              "Budget Tracking",
              "Multi-currency",
              "Tax Compliance",
              "Integration",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
