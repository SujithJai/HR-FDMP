"use client";

import { FolderOpen } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Document Vault"
            description="Secure document storage with version control and access management"
            icon={<FolderOpen className="w-6 h-6 text-white" />}
            features={[
              "Secure Storage",
              "Version Control",
              "Access Control",
              "Document Sharing",
              "Search & Filter",
              "Compliance",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
