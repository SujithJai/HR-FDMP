"use client";

import { Building2 } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PlaceholderModule } from "@/components/PlaceholderModule";

export default function BrandingPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6">
          <PlaceholderModule
            title="Company Branding"
            description="Customize your workspace with company logo, colors, and branding"
            icon={<Building2 className="w-6 h-6 text-white" />}
            features={[
              "Logo Upload",
              "Color Themes",
              "Custom Fonts",
              "Email Templates",
              "PDF Branding",
              "White-labeling",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
