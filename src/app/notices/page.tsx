"use client";

import { useState } from "react";
import { Megaphone, Plus, X, Bell, Pin } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";

interface NoticeItem {
  id: string;
  title: string;
  postedBy: string;
  date: string;
  category: "Important" | "General" | "Policy";
  content: string;
}

const INITIAL_NOTICES: NoticeItem[] = [
  { id: "NTC-01", title: "Project Kaal Teaser Launch Event & Press Meet", postedBy: "Sujai (Director)", date: "Aug 01, 2026", category: "Important", content: "All department heads are requested to attend the teaser final cut review in Audi 2 today at 04:00 PM." },
  { id: "NTC-02", title: "Revised Production Studio Entry Timings", postedBy: "Priya Sharma (HR)", date: "Jul 28, 2026", category: "Policy", content: "New biometric facial scanners are active at Main Gate. Please ensure daily clock-in before 09:30 AM." },
  { id: "NTC-03", title: "Quarterly VFX & Post-Production Workshop", postedBy: "Ananya Rao", date: "Jul 20, 2026", category: "General", content: "Hands-on session on AI-accelerated rendering tools taking place this Friday in Post Suite 4." },
];

export default function NoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "Important" as const, content: "" });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const newNtc: NoticeItem = {
      id: `NTC-0${notices.length + 1}`,
      title: formData.title,
      postedBy: "Sujai (Director)",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      category: formData.category,
      content: formData.content,
    };

    setNotices([newNtc, ...notices]);
    setIsModalOpen(false);
    setFormData({ title: "", category: "Important", content: "" });
  };

  return (
    <ModulePage
      title="Notice Board"
      subtitle="Official company announcements, studio updates, and department circulars"
      icon={<Megaphone className="w-6 h-6 text-white" />}
      actionLabel="Post Notice"
      onAction={() => setIsModalOpen(true)}
    >
      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="card-3d rounded-[22px] p-6 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pin className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-100 text-brand-700">
                  {n.category}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{n.date}</span>
            </div>

            <h3 className="font-display font-bold text-xl text-slate-900">{n.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{n.content}</p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Posted by: <strong className="text-slate-700">{n.postedBy}</strong></span>
              <span>Ref: {n.id}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900">Post Announcement</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handlePost} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Notice Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="Announcement Title"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                >
                  <option value="Important">Important</option>
                  <option value="Policy">Policy</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Notice Description</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="Type official announcement text..."
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">Publish Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
