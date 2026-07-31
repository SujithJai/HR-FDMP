"use client";

import { useState } from "react";
import { CheckSquare, Plus, X, Clock, AlertCircle, CheckCircle2, User, FileSpreadsheet } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";

interface TaskItem {
  id: string;
  title: string;
  assignee: string;
  avatar: string;
  project: string;
  dueDate: string;
  priority: "urgent" | "high" | "medium" | "low";
  status: "todo" | "in_progress" | "completed";
}

const INITIAL_TASKS: TaskItem[] = [
  { id: "TSK-001", title: "Digital Marketing Campaign Launch for Project Kaal", assignee: "Surjith Thangavel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", project: "Digital Marketing & Branding", dueDate: "Tomorrow", priority: "urgent", status: "in_progress" },
  { id: "TSK-002", title: "Review Cyber City Social Media Poster Design", assignee: "Surjith Thangavel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", project: "Cyber City", dueDate: "Aug 5, 2026", priority: "high", status: "in_progress" },
  { id: "TSK-003", title: "Finalize Branding Guidelines & Press Assets", assignee: "Surjith Thangavel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", project: "Branding", dueDate: "Aug 8, 2026", priority: "medium", status: "todo" },
  { id: "TSK-004", title: "Publish Studio Teaser Trailer Announcement", assignee: "Surjith Thangavel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", project: "Digital Marketing", dueDate: "Yesterday", priority: "low", status: "completed" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    assignee: "Surjith Thangavel",
    project: "Digital Marketing & Branding",
    priority: "high" as const,
    dueDate: "2026-08-10",
  });

  const handleExportCSV = () => {
    const headers = ["ID,Title,Assignee,Project,Due Date,Priority,Status"];
    const rows = tasks.map(t => `${t.id},"${t.title}","${t.assignee}",${t.project},${t.dueDate},${t.priority},${t.status}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Surjith_Thangavel_Task_Board_GoogleSheet_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newTask: TaskItem = {
      id: `TSK-00${tasks.length + 1}`,
      title: formData.title,
      assignee: formData.assignee,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      project: formData.project,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: "todo",
    };

    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
    setFormData({ title: "", assignee: "Surjith Thangavel", project: "Digital Marketing & Branding", priority: "high", dueDate: "2026-08-10" });
  };

  const handleMoveStatus = (id: string, nextStatus: "todo" | "in_progress" | "completed") => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status: nextStatus } : t)));
  };

  const priorityColors = {
    urgent: "bg-red-100 text-red-700 border-red-200",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <ModulePage
      title="Task & Work Board"
      subtitle="Track digital marketing tasks, campaign deliverables, and branding milestones"
      icon={<CheckSquare className="w-6 h-6 text-white" />}
      actionLabel="Create Task"
      onAction={() => setIsModalOpen(true)}
    >
      <div className="flex items-center justify-between bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
        <div>
          <h4 className="font-display font-bold text-slate-900">Task Deliverables: Surjith Thangavel</h4>
          <p className="text-xs text-slate-500">Media Manager ( Digital Marketing & Branding )</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn-premium px-4 py-2 text-xs font-semibold rounded-xl inline-flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" /> Download Google Sheet / CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "To Do", key: "todo" as const, color: "bg-slate-100 text-slate-700" },
          { title: "In Progress", key: "in_progress" as const, color: "bg-brand-100 text-brand-700" },
          { title: "Completed", key: "completed" as const, color: "bg-emerald-100 text-emerald-700" },
        ].map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.key);
          return (
            <div key={column.key} className="bg-slate-50/70 rounded-3xl p-4 border border-slate-200/60 space-y-4">
              <div className="flex items-center justify-between px-2 pt-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-slate-900">{column.title}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${column.color}`}>
                    {columnTasks.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div key={task.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{task.id}</span>
                    </div>

                    <h4 className="font-semibold text-sm text-slate-900 mb-2">{task.title}</h4>
                    <p className="text-xs text-slate-500 mb-3">{task.project}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <img src={task.avatar} alt={task.assignee} className="w-6 h-6 rounded-full object-cover ring-2 ring-brand-100" />
                        <span className="text-slate-600 font-medium">{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-slate-50">
                      {column.key !== "todo" && (
                        <button
                          onClick={() => handleMoveStatus(task.id, "todo")}
                          className="text-[10px] font-semibold text-slate-500 hover:text-slate-900 px-2 py-1 bg-slate-100 rounded-lg"
                        >
                          ← To Do
                        </button>
                      )}
                      {column.key !== "in_progress" && (
                        <button
                          onClick={() => handleMoveStatus(task.id, "in_progress")}
                          className="text-[10px] font-semibold text-brand-600 hover:text-brand-700 px-2 py-1 bg-brand-50 rounded-lg"
                        >
                          In Progress
                        </button>
                      )}
                      {column.key !== "completed" && (
                        <button
                          onClick={() => handleMoveStatus(task.id, "completed")}
                          className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 px-2 py-1 bg-emerald-50 rounded-lg"
                        >
                          Complete ✓
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-500" /> Create Task
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Task Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="e.g. Media Campaign Strategy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Assignee</label>
                  <input
                    type="text"
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Project</label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
