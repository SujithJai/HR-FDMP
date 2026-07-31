"use client";

import { useState } from "react";
import { FolderOpen, Download, Plus, X, FileText, Lock } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";

interface DocItem {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadedDate: string;
}

const INITIAL_DOCS: DocItem[] = [
  { id: "DOC-101", name: "Four_Dee_Employee_Handbook_2026.pdf", category: "HR Policies", size: "2.4 MB", uploadedDate: "Jan 10, 2026" },
  { id: "DOC-102", name: "Project_Kaal_Master_Script_v4.pdf", category: "Production", size: "8.1 MB", uploadedDate: "Jul 15, 2026" },
  { id: "DOC-103", name: "Standard_NDA_Cast_and_Crew_Template.docx", category: "Legal & Contracts", size: "450 KB", uploadedDate: "Mar 02, 2026" },
  { id: "DOC-104", name: "Health_and_Safety_Set_Guidelines.pdf", category: "Compliance", size: "1.2 MB", uploadedDate: "Feb 20, 2026" },
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocItem[]>(INITIAL_DOCS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "Production" });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newDoc: DocItem = {
      id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name.endsWith(".pdf") ? formData.name : `${formData.name}.pdf`,
      category: formData.category,
      size: "3.5 MB",
      uploadedDate: "Today",
    };

    setDocs([newDoc, ...docs]);
    setIsModalOpen(false);
    setFormData({ name: "", category: "Production" });
  };

  return (
    <ModulePage
      title="Document Vault"
      subtitle="Centralized document repository for NDA contracts, scripts, and HR policies"
      icon={<FolderOpen className="w-6 h-6 text-white" />}
      actionLabel="Upload Document"
      onAction={() => setIsModalOpen(true)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {docs.map((doc) => (
          <div key={doc.id} className="card-3d rounded-[22px] p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                {doc.category}
              </span>
              <h4 className="font-semibold text-sm text-slate-900 mt-2 truncate">{doc.name}</h4>
              <p className="text-xs text-slate-400 mt-1">{doc.size} • Uploaded {doc.uploadedDate}</p>
            </div>
            <button
              onClick={() => alert(`Downloading ${doc.name}...`)}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-brand-500 hover:text-white text-slate-700 font-semibold text-xs rounded-xl transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download File
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900">Upload to Vault</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Document Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="e.g. Call_Sheet_Day19.pdf"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                >
                  <option value="Production">Production</option>
                  <option value="HR Policies">HR Policies</option>
                  <option value="Legal & Contracts">Legal & Contracts</option>
                  <option value="Compliance">Compliance</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">Upload Document</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
