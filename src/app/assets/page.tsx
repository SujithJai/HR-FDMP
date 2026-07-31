"use client";

import { useState } from "react";
import { FilmIcon, Search, Grid3x3, List, Download, Eye, Filter } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { formatNumber, getStatusColor, formatStatus } from "@/lib/utils";

const assets = [
  { id: 1, name: "Midnight in Mumbai - Official Poster", type: "poster", project: "Midnight in Mumbai", size: "2.5 MB", version: 1, status: "approved", downloads: 150, views: 1200, thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400" },
  { id: 2, name: "Midnight in Mumbai - Teaser Trailer", type: "trailer", project: "Midnight in Mumbai", size: "150 MB", version: 3, status: "approved", downloads: 5000, views: 25000, thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400" },
  { id: 3, name: "Tales of Tomorrow - Script EP1", type: "script", project: "Tales of Tomorrow", size: "850 KB", version: 12, status: "approved", downloads: 45, views: 180, thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400" },
  { id: 4, name: "Royal Elegance - Final Cut", type: "video", project: "Royal Elegance", size: "85 MB", version: 1, status: "approved", downloads: 250, views: 5000, thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400" },
  { id: 5, name: "Character Stills - Scene 5", type: "photo", project: "Midnight in Mumbai", size: "12 MB", version: 2, status: "pending", downloads: 30, views: 450, thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400" },
  { id: 6, name: "Behind the Scenes - Day 1", type: "video", project: "Tales of Tomorrow", size: "200 MB", version: 1, status: "draft", downloads: 10, views: 80, thumbnail: "https://images.unsplash.com/photo-1579966220743-a38bdf45d6ad?w=400" },
];

const categories = ["All", "Poster", "Trailer", "Video", "Photo", "Audio", "Script", "Storyboard", "Press Kit"];

export default function AssetsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <ModulePage
      title="Digital Asset Management"
      subtitle="Organize, preview and distribute media assets"
      icon={<FilmIcon className="w-6 h-6 text-white" />}
      actionLabel="Upload Asset"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Assets", value: 2456 },
          { label: "Storage Used", value: "2.4 TB" },
          { label: "Downloads", value: "15.2K" },
          { label: "Pending Approval", value: 18 },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-3xl font-bold gradient-text mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card-3d rounded-[22px] p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-brand-500 to-cyan-400 text-white shadow-lg"
                    : "bg-white/70 text-slate-600 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 lg:ml-auto">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-brand-100 text-brand-600" : "text-slate-500 hover:bg-slate-100"}`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-brand-100 text-brand-600" : "text-slate-500 hover:bg-slate-100"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div key={asset.id} className="card-3d rounded-[22px] overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={asset.thumbnail}
                  alt={asset.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/90 ${getStatusColor(asset.status)}`}>
                    {formatStatus(asset.status)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm bg-black/70 text-white">
                    v{asset.version}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg backdrop-blur-sm bg-white/90 hover:bg-white text-slate-700 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg backdrop-blur-sm bg-white/90 hover:bg-white text-slate-700 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-1 truncate">{asset.name}</h4>
                <p className="text-xs text-slate-500 mb-3">{asset.project}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="uppercase font-bold">{asset.type}</span>
                  <span>{asset.size}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">{formatNumber(asset.views)} views</span>
                  <span className="text-slate-500">{formatNumber(asset.downloads)} downloads</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-3d rounded-[22px] overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Asset</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Project</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Version</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Stats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={asset.thumbnail} alt={asset.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{asset.name}</div>
                        <div className="text-xs text-slate-500">{asset.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm uppercase font-bold text-slate-600">{asset.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{asset.project}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">v{asset.version}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(asset.status)}`}>
                      {formatStatus(asset.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {formatNumber(asset.views)} views · {formatNumber(asset.downloads)} downloads
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ModulePage>
  );
}
