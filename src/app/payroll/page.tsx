"use client";

import { DollarSign } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function PayrollPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Payroll Management"
            description="Automated payroll processing with tax calculations and compliance"
            icon={<DollarSign className="w-6 h-6 text-white" />}
            features={[
              "Automated Processing",
              "Tax Calculations",
              "Payslip Generation",
              "Bank Integration",
              "Statutory Compliance",
              "Multi-currency",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
