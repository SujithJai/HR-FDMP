"use client";

import { useState } from "react";
import { CheckSquare, Plus, X, Clock, AlertCircle, CheckCircle2, User } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { getStatusColor, formatStatus } from "@/lib/utils";

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
  { id: "TSK-001", title: "Finalize Sound Mixing for Act 3 Scene 4", assignee: "Meera Nair", avatar: "https://i.pravatar.cc/150?img=16", project: "Project Kaal", dueDate: "Tomorrow", priority: "urgent", status: "in_progress" },
  { id: "TSK-002", title: "Review Cyber City EP1 Color Grading", assignee: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=8", project: "Cyber City", dueDate: "Aug 5, 2026", priority: "high", status: "in_progress" },
  { id: "TSK-003", title: "Render 3D VFX Explosion Pass v2", assignee: "Ananya Rao", avatar: "https://i.pravatar.cc/150?img=9", project: "Project Kaal", dueDate: "Aug 8, 2026", priority: "medium", status: "todo" },
  { id: "TSK-004", title: "Draft Call Sheet for Day 18 Shoot", assignee: "Rohan Mehta", avatar: "https://i.pravatar.cc/150?img=13", project: "Cyber City", dueDate: "Yesterday", priority: "low", status: "completed" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    assignee: "Sujai",
    project: "Project Kaal",
    priority: "medium" as const,
    dueDate: "2026-08-10",
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newTask: TaskItem = {
      id: `TSK-00${tasks.length + 1}`,
      title: formData.title,
      assignee: formData.assignee,
      avatar: "https://i.pravatar.cc/150?img=12",
      project: formData.project,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: "todo",
    };

    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
    setFormData({ title: "", assignee: "Sujai", project: "Project Kaal", priority: "medium", dueDate: "2026-08-10" });
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
      subtitle="Organize production tasks, assign crew members, and track deliverables"
      icon={<CheckSquare className="w-6 h-6 text-white" />}
      actionLabel="Create Task"
      onAction={() => setIsModalOpen(true)}
    >
      {/* Board Columns */}
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
                        <img src={task.avatar} alt={task.assignee} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-slate-600 font-medium">{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>

                    {/* Quick Move controls */}
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

                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-400 border border-dashed rounded-2xl">
                    No tasks in this column
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-500" /> Create Production Task
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
                  placeholder="e.g. Color Grading Pass 2"
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
                    placeholder="Team Member"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Project</label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Project Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
